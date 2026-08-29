/* Idempotent schema migrations for the blog database.
   Usage: node --env-file=.env.local scripts/migrate.mjs */
import { neon } from '@neondatabase/serverless';
import { databaseUrl } from '../src/lib/env.js';

const url = databaseUrl();
if (!url) {
  console.error('DATABASE_URL is not set. Run: vercel env pull .env.local');
  process.exit(1);
}
const sql = neon(url);

const migrations = [
  {
    version: 1,
    statements: [
      `CREATE TABLE IF NOT EXISTS posts (
        id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        slug         text NOT NULL UNIQUE
                     CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' AND length(slug) <= 120),
        title        text NOT NULL CHECK (length(title) BETWEEN 1 AND 200),
        description  text NOT NULL DEFAULT '',
        tags         text[] NOT NULL DEFAULT '{}',
        cover_url    text,
        content_json jsonb NOT NULL DEFAULT '[]'::jsonb,
        content_html text NOT NULL DEFAULT '',
        status       text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
        published_at timestamptz,
        created_at   timestamptz NOT NULL DEFAULT now(),
        updated_at   timestamptz NOT NULL DEFAULT now()
      )`,
      `CREATE INDEX IF NOT EXISTS posts_published_idx
        ON posts (published_at DESC) WHERE status = 'published'`,
      `CREATE INDEX IF NOT EXISTS posts_updated_idx ON posts (updated_at DESC)`,
    ],
  },
];

await sql.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
  version    integer PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
)`);

const applied = new Set(
  (await sql.query('SELECT version FROM schema_migrations')).map(
    (row) => row.version
  )
);

for (const migration of migrations) {
  if (applied.has(migration.version)) {
    console.log(`skip    migration ${migration.version} (already applied)`);
    continue;
  }
  for (const statement of migration.statements) {
    await sql.query(statement);
  }
  await sql.query('INSERT INTO schema_migrations (version) VALUES ($1)', [
    migration.version,
  ]);
  console.log(`applied migration ${migration.version}`);
}

console.log('done');
