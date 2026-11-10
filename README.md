# cheats-dayz.com

Static [Astro](https://astro.build) site for DayZ cheats — deployed on **Cloudflare Workers** (static assets + edge worker).

**Handoff (deploy + domain on someone else’s Cloudflare account):** [docs/CLOUDFLARE-HANDOFF-ROMAN-URDU.md](docs/CLOUDFLARE-HANDOFF-ROMAN-URDU.md) · [docs/DEPLOY-CHECKLIST.md](docs/DEPLOY-CHECKLIST.md)

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
   npm ci
   npm run verify:deploy
   npx wrangler login
   ```

2. Build and deploy (uploads `dist/` + `worker/index.ts`):

   ```bash
   npm run deploy
   ```

### Deploy from GitHub (push → Cloudflare)

In **GitHub** → repo **Settings** → **Secrets and variables** → **Actions**, add:

| Secret | Where to get it |
|--------|------------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → **My Profile** → **API Tokens** → **Create Token** → template **Edit Cloudflare Workers** (or custom: Account Workers Scripts Edit + Workers R2 Storage / Account read) |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → **Workers & Pages** → right sidebar **Account ID** (32-character hex) |

| `INDEXNOW_KEY` (optional) | Only if you use IndexNow pings on build |

Without **`CLOUDFLARE_API_TOKEN`** and **`CLOUDFLARE_ACCOUNT_ID`**, the **Deploy to Cloudflare Workers** workflow fails at “Require Cloudflare secrets” (expected until ops adds secrets).

Every push to **`main`** runs `.github/workflows/cloudflare-deploy.yml` (build + `wrangler deploy` to worker **`cheatsdayz-com`**). Custom domain is attached **after** deploy — see handoff doc; do not require domain for the first deploy.

If you use **Cloudflare Workers Builds** (repo connected in the dashboard), set **Node.js version** to **22** (or rely on `.node-version`). The repo includes a synced `package-lock.json` so `npm ci` succeeds on Cloudflare.

### Git commits (abdullahsrozirotiii only)

Do not change global git config. Commit with:

```bash
git -c user.name=abdullahsrozirotiii -c user.email=353450645+abdullahsrozirotiii@users.noreply.github.com commit -m "your message"
```

On Windows PowerShell you can use:

```powershell
.\scripts\commit.ps1 "your message"
```

### Custom domain (`cheats-dayz.com`)
   - Add the domain zone in the Cloudflare dashboard (or use an existing zone).
   - In **Workers & Pages** → your worker `cheatsdayz-com` → **Settings** → **Domains & Routes**, add:
     - `cheats-dayz.com`
     - `www.cheats-dayz.com` (worker redirects www → apex)
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
| `worker/index.ts` | `www` → `cheats-dayz.com` redirect, then `ASSETS.fetch()` |

### Preview on Workers locally

```bash
npm run cf:preview
```

Uses Wrangler dev with the same `wrangler.toml` as production.

### Optional env

- `INDEXNOW_KEY` — set in CI or `.dev.vars` locally if you want IndexNow pings on build (`scripts/indexnow.mjs`).
