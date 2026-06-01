# In-Sync Website

The In-Sync CRM marketing website — `https://in-sync.co.in` (blog, demo
requests, partnership/onboarding flows, support widget).

## Tech Stack

- **Frontend:** Vite + React + TypeScript + Tailwind CSS + shadcn-ui
- **Backend:** Supabase (PostgreSQL + Edge Functions + Auth + Storage)
- **Hosting:** Cloudflare Pages (`website-sync` → `in-sync.co.in`)

## Local Development

```sh
npm install
npm run dev          # http://localhost:8080
npm run build        # outputs to dist/
npm run lint
```

`.env` (gitignored) holds local/admin values. The committed `.env.production`
holds only the **public** `VITE_*` keys used by the production build:

```env
VITE_SUPABASE_URL=https://<ref>.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...        # publishable anon key, safe in bundle
VITE_SUPABASE_PROJECT_ID=<ref>
```

Only values prefixed `VITE_` are inlined into the browser bundle. Anything that
grants write access (service role key, `sbp_` token, Cloudflare API token) must
NOT be prefixed `VITE_` and must stay out of `.env.production`.

## Deploy — `git push origin main` (the only deploy path)

Everything ships from a single `git push origin main`. No manual `wrangler` or
`supabase` CLI steps:

| Workflow | Fires when you change | What it does |
| --- | --- | --- |
| `pages-deploy.yml` | anything except `supabase/**`, `agent-backend/**`, `*.md` | build + deploy frontend to Cloudflare Pages `website-sync` |
| `supabase-deploy.yml` | `supabase/**` | `supabase db push`, then deploy **only the changed** edge functions |

Required GitHub Actions secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`,
`SUPABASE_ACCESS_TOKEN`, `SUPABASE_DB_PASSWORD`, `VITE_SUPABASE_PROJECT_ID`.

## Custom Domain

Production: `https://in-sync.co.in` (and `www`) — proxied CNAMEs on the
`in-sync.co.in` Cloudflare zone pointing at `website-sync.pages.dev`.

## Notes

- The Supabase project was migrated into the main In-Sync org on 2026-06-01
  (cloned off the original Lovable-provisioned account).
- `agent-backend/` is a legacy Node service for the support widget; it is not
  part of the Cloudflare Pages deploy.
