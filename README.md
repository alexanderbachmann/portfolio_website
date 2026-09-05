# Portfolio website

Personal portfolio and blog, built with Next.js 16 (App Router) and deployed on Vercel.

## Develop

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev
```

`.env.local` is git-ignored. Vercel stores the database and Blob variables as Sensitive, so they cannot be pulled with the CLI: copy `DATABASE_URL` from Vercel > Storage > the Neon database > Quickstart, `BLOB_READ_WRITE_TOKEN` from the Blob store's Quickstart, and use the same `AUTH_SECRET` / `ADMIN_PASSWORD` you set in Vercel > Settings > Environment Variables.

## Blog database

Posts live in Neon Postgres (connected through the Vercel Marketplace) and images in Vercel Blob.

```bash
npm run db:migrate        # create or update the schema (idempotent)
npm run db:seed-legacy    # manual, one-off: re-import the original MDX post
```

`npm run build` runs the migration before `next build`, so each Vercel deployment keeps the database schema current on its own. It does not seed any post: builds never create, restore, or publish content. Posts are yours to add and delete from `/admin`.

## Writing posts

Sign in at `/admin/login` with `ADMIN_PASSWORD`, then use `/admin` to create, edit, preview, publish, and delete posts. The editor is Notion-style: type `/` for headings, lists, checklists, quotes, code blocks, tables, and images.

## Conventions

See `CLAUDE.md` for the stack notes, the design rules, and the writing rules (no em or en dashes in user-facing text; contact goes through LinkedIn only).
