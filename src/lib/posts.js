import 'server-only';
import { cache } from 'react';
import readingTime from 'reading-time';
import { getSql } from '@/lib/db';

export const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const COLS = `id, slug, title, description, tags, cover_url, content_json,
  content_html, status, published_at, created_at, updated_at`;

export function htmlToText(html = '') {
  return String(html)
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const toIso = (value) => (value ? new Date(value).toISOString() : null);

function toPost(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description ?? '',
    tags: row.tags ?? [],
    coverUrl: row.cover_url ?? null,
    status: row.status,
    publishedAt: toIso(row.published_at),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
    readingTime: readingTime(htmlToText(row.content_html)).text,
    contentHtml: row.content_html ?? '',
    contentJson: Array.isArray(row.content_json) ? row.content_json : [],
  };
}

/* ---------------- public (published posts only) ---------------- */

export const getAllPosts = cache(async () => {
  const rows = await getSql().query(
    `SELECT ${COLS} FROM posts WHERE status = 'published'
     ORDER BY published_at DESC NULLS LAST`
  );
  return rows.map(toPost);
});

export const getPost = cache(async (slug) => {
  if (typeof slug !== 'string' || !SLUG_RE.test(slug)) return null;
  const rows = await getSql().query(
    `SELECT ${COLS} FROM posts WHERE slug = $1 AND status = 'published' LIMIT 1`,
    [slug]
  );
  return rows[0] ? toPost(rows[0]) : null;
});

export function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/* ---------------- admin (callers must have passed requireOwner) ---------------- */

export async function getAllPostsForAdmin() {
  const rows = await getSql().query(
    `SELECT ${COLS} FROM posts ORDER BY updated_at DESC`
  );
  return rows.map(toPost);
}

export async function getPostById(id) {
  if (typeof id !== 'string' || !UUID_RE.test(id)) return null;
  const rows = await getSql().query(
    `SELECT ${COLS} FROM posts WHERE id = $1::uuid LIMIT 1`,
    [id]
  );
  return rows[0] ? toPost(rows[0]) : null;
}

export async function savePost({
  id = null,
  slug,
  title,
  description = '',
  tags = [],
  coverUrl = null,
  publishedAt = null,
  contentJson = [],
  contentHtml = '',
}) {
  const sql = getSql();
  const json = JSON.stringify(contentJson);
  const params = [
    slug,
    title,
    description,
    tags,
    coverUrl,
    json,
    contentHtml,
    publishedAt,
  ];

  const rows = id
    ? await sql.query(
        `UPDATE posts SET slug = $1, title = $2, description = $3,
           tags = $4::text[], cover_url = $5, content_json = $6::jsonb,
           content_html = $7,
           published_at = COALESCE($8::timestamptz, published_at),
           updated_at = now()
         WHERE id = $9::uuid RETURNING ${COLS}`,
        [...params, id]
      )
    : await sql.query(
        `INSERT INTO posts (slug, title, description, tags, cover_url,
           content_json, content_html, published_at)
         VALUES ($1, $2, $3, $4::text[], $5, $6::jsonb, $7, $8::timestamptz)
         RETURNING ${COLS}`,
        params
      );

  return rows[0] ? toPost(rows[0]) : null;
}

export async function publishPost(id) {
  const rows = await getSql().query(
    `UPDATE posts SET status = 'published',
       published_at = COALESCE(published_at, now()), updated_at = now()
     WHERE id = $1::uuid RETURNING ${COLS}`,
    [id]
  );
  return rows[0] ? toPost(rows[0]) : null;
}

export async function unpublishPost(id) {
  const rows = await getSql().query(
    `UPDATE posts SET status = 'draft', updated_at = now()
     WHERE id = $1::uuid RETURNING ${COLS}`,
    [id]
  );
  return rows[0] ? toPost(rows[0]) : null;
}

export async function deletePost(id) {
  const rows = await getSql().query(
    `DELETE FROM posts WHERE id = $1::uuid RETURNING slug`,
    [id]
  );
  return rows[0]?.slug ?? null;
}
