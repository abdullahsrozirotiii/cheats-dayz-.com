# Deploy checklist (no GitHub secrets)

This repo does **not** use GitHub Actions to deploy to Cloudflare. There are **no** required repository secrets for deploy.

## GitHub CI (automatic)

Workflow **CI** (`.github/workflows/ci.yml`):

- `npm ci` → `npm run verify:deploy` → `npm run build`
- Confirms the project builds; does **not** upload to Cloudflare.

## Production deploy (pick one)

### A — Cloudflare Workers Builds (best for ops / minimal steps)

1. Cloudflare dashboard → **Workers & Pages** → connect GitHub repo `cheats-dayz-.com`, branch `main`.
2. Build: `npm run build` · Deploy: `npx wrangler deploy` · Node **22**.
3. Redeploy anytime from the dashboard (no GitHub tokens).

### B — Local / ZIP

```bash
npm ci && npm run verify:deploy && npx wrangler login && npm run deploy
```

## Custom domain

After the worker exists on the **same** Cloudflare account:

1. Zone **`cheats-dayz.com`**
2. Worker **`cheatsdayz-com`** → **Domains & Routes** → apex + `www`
3. SSL **Full (strict)** + **Always Use HTTPS**

## Optional

- `INDEXNOW_KEY` — only in Cloudflare build env vars or local `.dev.vars` if you want IndexNow pings (build succeeds without it).

## SEO audits

Run third-party audits on **`https://cheats-dayz.com/.../`** (trailing slash), not `*.workers.dev`. Preview hosts send `X-Robots-Tag: noindex` and use production canonical URLs by design.
