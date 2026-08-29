'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  clearLoginFailures,
  createSession,
  destroySession,
  loginLockRemainingMs,
  recordLoginFailure,
  requireOwner,
  verifyPassword,
} from '@/lib/auth';
import {
  SLUG_RE,
  getPostById,
  savePost as dbSavePost,
  publishPost as dbPublishPost,
  unpublishPost as dbUnpublishPost,
  deletePost as dbDeletePost,
} from '@/lib/posts';
import { sanitizeHtml } from '@/lib/render-post-html';
import { slugify } from '@/lib/slugify';

/* ---------------- auth ---------------- */

/* Vercel sets x-forwarded-for; the fallback only groups unknown clients. */
async function clientKey() {
  const headerList = await headers();
  const forwarded = headerList.get('x-forwarded-for');
  return (
    forwarded?.split(',')[0]?.trim() ||
    headerList.get('x-real-ip') ||
    'unknown'
  );
}

export async function login(prevState, formData) {
  const key = await clientKey();

  const lockedFor = loginLockRemainingMs(key);
  if (lockedFor > 0) {
    const minutes = Math.max(1, Math.ceil(lockedFor / 60000));
    const unit = minutes === 1 ? 'minute' : 'minutes';
    return { error: `Too many attempts. Try again in ${minutes} ${unit}.` };
  }

  const ok = await verifyPassword(formData.get('password'));
  if (!ok) {
    recordLoginFailure(key);
    return { error: 'Wrong password.' };
  }

  clearLoginFailures(key);

  try {
    await createSession();
  } catch (err) {
    /* Almost always a missing or too short AUTH_SECRET on the server.
       Without this the page would throw with nothing on screen. */
    console.error('createSession failed', err);
    return {
      error: 'Sign in is misconfigured on the server. Check AUTH_SECRET.',
    };
  }

  const next = String(formData.get('next') ?? '/admin');
  const safeNext =
    next.startsWith('/admin') && !next.startsWith('/admin/login')
      ? next
      : '/admin';
  redirect(safeNext);
}

export async function logout() {
  await destroySession();
  redirect('/admin/login');
}

/* ---------------- helpers ---------------- */

/* Every action re-checks the session itself; proxy.js is only a first gate. */
async function denyUnlessOwner() {
  try {
    await requireOwner();
    return null;
  } catch {
    return { ok: false, error: 'Unauthorized' };
  }
}

function revalidateBlog(slugs = []) {
  revalidatePath('/blog');
  revalidatePath('/rss.xml');
  revalidatePath('/sitemap.xml');
  for (const slug of new Set(slugs.filter(Boolean))) {
    revalidatePath(`/blog/${slug}`);
  }
}

function cleanUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

function cleanDate(value) {
  if (typeof value !== 'string' || !value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function summary(post) {
  return {
    ok: true,
    id: post.id,
    slug: post.slug,
    status: post.status,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
  };
}

/* ---------------- posts ---------------- */

export async function savePost(input) {
  const denied = await denyUnlessOwner();
  if (denied) return denied;

  const title = String(input?.title ?? '').trim();
  if (!title || title.length > 200) {
    return { ok: false, error: 'Title must be between 1 and 200 characters.' };
  }

  const slug = slugify(String(input?.slug || title));
  if (!SLUG_RE.test(slug) || slug.length > 120) {
    return {
      ok: false,
      error: 'Slug can only contain lowercase letters, numbers, and hyphens.',
    };
  }

  const description = String(input?.description ?? '').trim().slice(0, 500);
  const tags = Array.isArray(input?.tags)
    ? [...new Set(input.tags.map((t) => String(t).trim()).filter(Boolean))]
        .slice(0, 10)
    : [];
  const coverUrl = cleanUrl(input?.coverUrl);
  const publishedAt = cleanDate(input?.publishedAt);
  const contentJson = Array.isArray(input?.contentJson) ? input.contentJson : [];
  const contentHtml = await sanitizeHtml(String(input?.contentHtml ?? ''));

  const previous = input?.id ? await getPostById(input.id) : null;
  if (input?.id && !previous) return { ok: false, error: 'Post not found.' };

  try {
    const post = await dbSavePost({
      id: previous?.id ?? null,
      slug,
      title,
      description,
      tags,
      coverUrl,
      publishedAt,
      contentJson,
      contentHtml,
    });
    revalidateBlog([previous?.slug, post.slug]);
    return summary(post);
  } catch (err) {
    if (err?.code === '23505') {
      return { ok: false, error: 'Another post already uses that slug.' };
    }
    console.error('savePost failed', err);
    return { ok: false, error: 'Could not save the post.' };
  }
}

export async function publishPost(id) {
  const denied = await denyUnlessOwner();
  if (denied) return denied;

  const post = await dbPublishPost(String(id ?? ''));
  if (!post) return { ok: false, error: 'Post not found.' };
  revalidateBlog([post.slug]);
  return summary(post);
}

export async function unpublishPost(id) {
  const denied = await denyUnlessOwner();
  if (denied) return denied;

  const post = await dbUnpublishPost(String(id ?? ''));
  if (!post) return { ok: false, error: 'Post not found.' };
  revalidateBlog([post.slug]);
  return summary(post);
}

export async function deletePost(id) {
  const denied = await denyUnlessOwner();
  if (denied) return denied;

  const slug = await dbDeletePost(String(id ?? ''));
  if (!slug) return { ok: false, error: 'Post not found.' };
  revalidateBlog([slug]);
  return { ok: true };
}
