# cheatsdayz.com

Static [Astro](https://astro.build) site for DayZ cheats — deployed on **Cloudflare Workers** (static assets + edge worker).

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:4321/`.

## Production build

```bash
npm run build
npm run preview   # Astro preview
# or
npm start         # Node static server with redirects (local parity)
```

## Deploy to Cloudflare Workers

1. Install dependencies and log in:

   ```bash
   npm install
   npx wrangler login
   ```

2. Build and deploy (uploads `dist/` + `worker/index.ts`):

   ```bash
   npm run deploy
   ```

3. **Custom domain** (`cheatsdayz.com`):
   - Add the domain zone in the Cloudflare dashboard (or use an existing zone).
   - In **Workers & Pages** → your worker `cheatsdayz-com` → **Settings** → **Domains & Routes**, add:
     - `cheatsdayz.com`
     - `www.cheatsdayz.com` (worker redirects www → apex)
   - Or uncomment the `[[routes]]` blocks in `wrangler.toml` and deploy again.

4. **Recommended dashboard settings** (SSL/TLS):
   - **Full (strict)** encryption
   - **Always Use HTTPS** on

### What gets deployed

| Piece | Purpose |
|--------|---------|
| `dist/` | Astro static HTML, assets, sitemaps |
| `dist/_redirects` | 301/302 rules (SEO slugs, `/go/*` checkout, legacy URLs) |
| `dist/_headers` | Cache + security headers |
| `worker/index.ts` | `www` → `cheatsdayz.com` redirect, then `ASSETS.fetch()` |

### Preview on Workers locally

```bash
npm run cf:preview
```

Uses Wrangler dev with the same `wrangler.toml` as production.

### Optional env

- `INDEXNOW_KEY` — set in CI or `.dev.vars` locally if you want IndexNow pings on build (`scripts/indexnow.mjs`).
