/* One-off: move the original MDX post into the database as BlockNote
   blocks + HTML, rewriting its em dashes on the way (site writing rule).
   Usage: node --env-file=.env.local scripts/seed-legacy-post.mjs [--force] */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { neon } from '@neondatabase/serverless';
import { ServerBlockNoteEditor } from '@blocknote/server-util';
import { databaseUrl } from '../src/lib/env.js';

const SOURCE = path.join(
  process.cwd(),
  'scripts',
  'legacy',
  'data-without-ownership-is-just-noise.mdx'
);
const SLUG = 'data-without-ownership-is-just-noise';
const PUBLISHED_AT = '2026-08-29T12:00:00Z';
const force = process.argv.includes('--force');
const dryRun = process.argv.includes('--dry-run');

const url = databaseUrl();
if (!url && !dryRun) {
  console.error('DATABASE_URL is not set. Run: vercel env pull .env.local');
  process.exit(1);
}

/* Exact rewrites first, then a generic fallback for any dash left over. */
const REWRITES = [
  ['stall — and how', 'stall, and how'],
  ['worked with — from central banks to tech giants — has', 'worked with, from central banks to tech giants, has'],
  ['as exhaust — something', 'as exhaust: something'],
  ['includes trust — documented', 'includes trust: documented'],
  ['not a job title — it is', 'not a job title. It is'],
  ['it failed — no matter', 'it failed, no matter'],
  ['about decisions — which is', 'about decisions, which is'],
];

function removeDashes(text) {
  let out = text;
  for (const [from, to] of REWRITES) out = out.split(from).join(to);
  out = out.replace(/\s+[—–]\s+/g, ', ').replace(/[—–]/g, ', ');
  return out;
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error('No frontmatter found');
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('[')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    } else {
      data[key] = value.replace(/^['"]|['"]$/g, '');
    }
  }
  return { data, body: match[2] };
}

const raw = readFileSync(SOURCE, 'utf8');
const { data, body } = parseFrontmatter(raw);

const title = removeDashes(data.title ?? SLUG);
const description = removeDashes(data.description ?? '');
const markdown = removeDashes(
  body.replace(/<Callout[^>]*>([\s\S]*?)<\/Callout>/g, (_, inner) =>
    inner
      .trim()
      .split('\n')
      .map((l) => `> ${l}`)
      .join('\n')
  )
);

for (const [label, text] of [
  ['title', title],
  ['description', description],
  ['body', markdown],
]) {
  if (/[—–]/.test(text)) {
    console.error(`A dash survived in the ${label}; fix REWRITES first.`);
    process.exit(1);
  }
}

const editor = ServerBlockNoteEditor.create();
const blocks = await editor.tryParseMarkdownToBlocks(markdown);
const html = await editor.blocksToHTMLLossy(blocks);

if (dryRun) {
  console.log(`dry run: "${title}" -> ${blocks.length} blocks, ${html.length} chars of HTML`);
  console.log(`description: ${description}`);
  console.log('\n--- HTML ---\n' + html);
  process.exit(0);
}

const sql = neon(url);
const conflict = force
  ? `DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description,
       tags = EXCLUDED.tags, content_json = EXCLUDED.content_json,
       content_html = EXCLUDED.content_html, updated_at = now()`
  : 'DO NOTHING';

const rows = await sql.query(
  `INSERT INTO posts (slug, title, description, tags, content_json, content_html, status, published_at)
   VALUES ($1, $2, $3, $4::text[], $5::jsonb, $6, 'published', $7::timestamptz)
   ON CONFLICT (slug) ${conflict}
   RETURNING id, slug, status`,
  [
    SLUG,
    title,
    description,
    data.tags ?? [],
    JSON.stringify(blocks),
    html,
    PUBLISHED_AT,
  ]
);

if (rows.length === 0) {
  console.log(`"${SLUG}" already exists; nothing changed (use --force to overwrite).`);
} else {
  console.log(`seeded "${rows[0].slug}" (${rows[0].status}) as ${rows[0].id}`);
  console.log(`${blocks.length} blocks, ${html.length} chars of HTML`);
}
console.log('\n--- HTML preview ---\n' + html.slice(0, 1200) + (html.length > 1200 ? '\n...' : ''));
