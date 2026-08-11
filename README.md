# Jaxongirman admin

Responsive Vite/React operations console for authorized Jaxongirman administrators. It includes production metrics, user credit and block controls, presentation diagnostics, AI provider usage, database-driven pricing/settings, and immutable audit history.

The client uses only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Admin access and mutations are checked server-side by Supabase RLS and edge functions — this repo holds no privileged credential.

## Setup

```bash
npm install
cp .env.example .env   # then fill in the two values
npm run dev            # http://localhost:3000
```

`VITE_*` values are inlined at build time, so changing `.env` requires a restart or rebuild.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server on port 3000 |
| `npm run build` | `tsc -b` then a production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run typecheck` | Types only, no build |
| `npm run lint` | ESLint |

## Deployment (Vercel)

The repo deploys as-is: `vercel.json` pins the Vite framework preset, the `dist` output directory, and the SPA rewrite that the history-based router in [src/lib/router.tsx](src/lib/router.tsx) needs for deep links such as `/users`.

Set both variables in **Project → Settings → Environment Variables** for Production, Preview, and Development, then redeploy. A build without them fails deliberately — see [src/lib/env-guard.ts](src/lib/env-guard.ts).

Add the deployment origin to **Supabase → Authentication → URL Configuration → Redirect URLs**, otherwise login redirects are rejected.

## Repository layout

This is a standalone extract of the `admin` workspace from the Jaxongirman monorepo. The shared `@jaxongirman/types` package is vendored at [packages/types/](packages/types/) and linked through npm workspaces, so the app builds without the rest of the monorepo. Regenerate the database types from the monorepo with `npm run supabase:types` and copy `packages/types/src/database.generated.ts` across when the schema changes.
