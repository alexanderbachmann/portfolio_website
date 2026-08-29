# Portfolio website

Personal portfolio and blog for Janio Martinez Bachmann. Deployed on Vercel (Hobby). The GitHub repo is public: never commit secrets.

## Stack

- Next.js 16 App Router, React 19, **JavaScript only** (`.js` / `.jsx`, no TypeScript). `app/` lives at the repo root; shared code is in `src/` (alias `@/*` maps to `./src/*`).
- Styling is hand-written CSS with design tokens in `app/globals.css` (`@theme`). Tailwind v4 is installed but its utility classes are not used in JSX; keep it that way.
- Orange discipline (see the header comment in `app/globals.css`): one orange primary action per viewport; orange only for the active nav indicator, link hover, one highlighted word or metric per section, and focus rings. Never orange on borders at rest, icons at rest, headings, body text, or card backgrounds.
- Fonts come from `next/font` and are exposed as `--font-sans`, `--font-display`, `--font-mono`.

## Commands

- `npm run dev`, `npm run build`, `npm run lint`
- `npm run db:migrate` (Neon Postgres, reads `.env.local`), `npm run db:seed-legacy`, `npm run db:migrate:prod`

## Writing rules (apply to ALL user-facing text)

- **No em dashes (—) and no en dashes (–), anywhere**: JSX text, `src/data/*.js`, metadata titles and descriptions, RSS, Open Graph alt text, blog content. Never use the `&mdash;` or `&ndash;` entities either.
- Use a comma, colon, or period instead. Use a middle dot (·) for inline separators and a pipe (|) in page titles.
- Plain hyphens are fine inside compound words (cross-functional) and in period ranges written as `2019 - 2021`.
- Never put a personal email address on the site. The only contact channel is LinkedIn (`site.linkedin` in `src/data/site.js`), and "Get in touch" buttons open it in a new tab.

## Content locations

- Site copy, tagline, hero metrics, nav links, social URLs: `src/data/site.js` (single source of truth; components read from it, do not hardcode copies).
- Experience, projects, accomplishments, skills, bio cards: `src/data/*.js`.
- The SQL terminal query lives in `src/data/bio-metrics.js` **and** is hand-highlighted in `src/components/bio-grid/cards/SqlQuery.jsx`; change both together. Keep personal details (home city, email) out of it.

## Blog CMS

- Posts live in Neon Postgres (`posts` table), images in Vercel Blob. Canonical content is BlockNote JSON (`content_json`); `content_html` is derived from it and sanitized on save.
- Public blog routes are ISR (`export const revalidate = 3600`) and are revalidated by every save, publish, unpublish, and delete. Never call `cookies()` from public routes; it would make them dynamic.
- The owner-only admin lives at `/admin` (login at `/admin/login`). Gate: `proxy.js` at the repo root plus `requireOwner()` inside every server action and route handler. A page-level check never covers Server Functions.
- Env vars: `DATABASE_URL` and `BLOB_READ_WRITE_TOKEN` are injected by Vercel (possibly under a custom prefix such as `neonjaniodb_DATABASE_URL`; `src/lib/env.js` resolves both); `AUTH_SECRET` and `ADMIN_PASSWORD` are set manually in Vercel. Vercel marks these Sensitive, so `vercel env pull` cannot fetch their values: for local work, paste them into `.env.local` by hand (names in `.env.example`).
- `npm run build` runs the migration and the legacy-post seed before `next build`, so every Vercel deployment sets up the database itself. Both scripts are idempotent.

## Hygiene

- Do not commit `.next/`, `.vercel/`, or any `.env*` file except `.env.example`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
