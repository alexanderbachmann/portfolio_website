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
- Janio reaches the admin from the quiet "Sign in" link in the footer; once signed in it becomes "Write", the navbar gains a "Write" link, `/blog` gains an owner bar, and each post gains an "Edit" link. Those owner affordances are decided in the browser from the non-httpOnly `jmb_owner` hint cookie (`useOwner()` in `src/components/admin/OwnerOnly.jsx`), never from `cookies()`, so public pages stay static. The hint is cosmetic: access is always re-checked server-side.
- Cookies are host-only by design, so a session created on a deployment-specific `*.vercel.app` build URL does not exist on the canonical site. Always sign in on `site.url`.
- `proxy.js` slides the session forward when it is more than a day old, and answers unauthenticated non-GET requests with 401 rather than a redirect, so an expired session surfaces as a save error instead of an unresolvable Server Action. It duplicates the cookie names, TTL, and the 32-character `AUTH_SECRET` check from `src/lib/auth.js`; keep the two in sync.
- Env vars: `DATABASE_URL` and `BLOB_READ_WRITE_TOKEN` are injected by Vercel (possibly under a custom prefix such as `neonjaniodb_DATABASE_URL`; `src/lib/env.js` resolves both); `AUTH_SECRET` and `ADMIN_PASSWORD` are set manually in Vercel. Vercel marks these Sensitive, so `vercel env pull` cannot fetch their values: for local work, paste them into `.env.local` by hand (names in `.env.example`).
- `npm run build` runs the migration before `next build`, so every Vercel deployment keeps the schema current on its own. The migration is idempotent and never writes post content.
- **No script may create or restore posts during a build.** `npm run db:seed-legacy` was a one-off MDX import; Janio has since deleted that post on purpose, and re-seeding it would republish content he removed. Never add a seed step back to `build`, and only run the seed by hand if he asks for that post back.

## Git workflow (standing instruction from Janio)

- After finishing a requested change, ship it **without asking**: commit, push, and get it to production. Janio does not want to be prompted for commits, pushes, pull requests, or merges.
- Before pushing: `npm run lint` and `npm run build` must pass, and `git status` must show no secret files (`.env.local`, `.vercel/`).
- Work directly on `main` (pushing `main` deploys production on Vercel). If work happens on a feature branch instead, open a pull request with `gh pr create` and merge it with `gh pr merge --merge` in the same session once the checks pass.
- After pushing, confirm the Vercel deployment is Ready (`vercel ls portfolio-website`) and spot-check the live site; include the production URL in the recap.

## Hygiene

- Do not commit `.next/`, `.vercel/`, or any `.env*` file except `.env.example`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
