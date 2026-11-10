# Deploy checklist (operations / handoff)

One-page verification for **cheats-dayz.com** on Cloudflare Workers.

## Pre-flight (any machine)

```bash
npm ci
npm run verify:deploy
npm run build
```

All three must exit `0` before CI or `wrangler deploy`.

## GitHub Actions secrets

| Secret | Required |
|--------|----------|
| `CLOUDFLARE_API_TOKEN` | Yes — template **Edit Cloudflare Workers** |
| `CLOUDFLARE_ACCOUNT_ID` | Yes — Workers & Pages sidebar |
| `INDEXNOW_KEY` | No — build skips IndexNow if unset |

## After deploy (before custom domain)

- Worker name: **`cheatsdayz-com`**
- Preview URL: `https://cheatsdayz-com.<subdomain>.workers.dev` (served with `X-Robots-Tag: noindex`)

## Custom domain (production)

1. Zone **`cheats-dayz.com`** on the **same** Cloudflare account as the worker.
2. Attach in dashboard: **Workers & Pages → cheatsdayz-com → Domains & Routes**
   - `cheats-dayz.com`
   - `www.cheats-dayz.com`
3. Zone SSL: **Full (strict)** + **Always Use HTTPS**.

Do **not** uncomment `[[routes]]` in `wrangler.toml` until the zone exists on that account (otherwise `wrangler deploy` may fail).

## Canonical / SEO (already in repo)

- `src/config/site.ts` → `cheats-dayz.com`
- `astro.config.mjs` → `site: https://cheats-dayz.com`
- `worker/index.ts` → apex redirect + HTTPS

No code changes needed when attaching the domain via dashboard.
