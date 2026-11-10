# Cloudflare deploy + domain (handoff — Roman Urdu)

Yeh guide **wo shaks** ke liye hai jo site **apne Cloudflare account** par live karega. Tum (site owner) abhi domain attach **nahi** kar rahe — sirf code GitHub par ready hai.

**Zaroori domain naam (bilkul yahi):** `cheats-dayz.com` (beech mein **hyphen** `-`).  
`cheatsdayz.com` alag domain hai — SEO aur redirects us par kaam nahi karenge.

**Worker naam (change mat karna):** `cheatsdayz-com`

---

## Tumhein kya chahiye

| Cheez | Detail |
|--------|--------|
| Source | GitHub: https://github.com/abdullahsrozirotiii/cheats-dayz-.com (ya **Code → Download ZIP**) |
| Node.js | **22+** (repo mein `.node-version` = 22) |
| Cloudflare account | Jis par domain **khareedna / add** karna hai |
| GitHub access (agar Actions se deploy) | Repo → **Settings → Secrets** |

---

## Part A — Pehle deploy (domain ke baghair bhi chal sakta hai)

Domain abhi na ho to bhi worker live ho jata hai `*.workers.dev` par (testing). Production ke liye Part B zaroori hai.

### Option 1 — GitHub Actions (recommended)

1. Cloudflare → **My Profile → API Tokens → Create Token**
   - Template: **Edit Cloudflare Workers**
   - Account resources: apna account select karo
   - Token save karo (sirf ek dafa dikhega)

2. Cloudflare → **Workers & Pages** → right side se **Account ID** copy karo (32-character hex)

3. GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**
   - `CLOUDFLARE_API_TOKEN` = woh token
   - `CLOUDFLARE_ACCOUNT_ID` = woh Account ID

4. **Actions** tab → workflow **Deploy to Cloudflare Workers** → **Run workflow** (branch `main`)  
   Ya `main` par koi bhi push — deploy khud chalega.

5. Success ke baad: **Workers & Pages** → worker **`cheatsdayz-com`** → URL `https://cheatsdayz-com.<account-subdomain>.workers.dev` se site check karo.

`INDEXNOW_KEY` secret **optional** hai — na ho to build phir bhi pass hoti hai.

### Option 2 — Local / ZIP se deploy

```bash
npm ci
npm run verify:deploy    # quick checks
npx wrangler login
npm run deploy
```

PowerShell (Windows):

```powershell
npm ci
npm run verify:deploy
npx wrangler login
npm run deploy
```

---

## Part B — Domain buy + attach (1st go live on real URL)

**Order matter karta hai:** pehle Part A (worker deploy), phir domain.

1. **Same Cloudflare account** par domain lo:
   - **Registrar → Register Domains** → `cheats-dayz.com` khareedo  
   - Ya agar domain kahin aur hai to **Add a site** karke Cloudflare nameservers par lao.

2. Zone active hone do (DNS / SSL ready — usually 5–15 min).

3. **Workers & Pages** → **`cheatsdayz-com`** → **Settings** → **Domains & Routes** (ya **Custom Domains**):
   - Add: `cheats-dayz.com`
   - Add: `www.cheats-dayz.com`  
   Worker code **www** ko automatically apex `cheats-dayz.com` par redirect karta hai.

4. **SSL/TLS** (domain zone):
   - Encryption mode: **Full (strict)**
   - **Always Use HTTPS**: ON

5. Browser mein kholo: `https://cheats-dayz.com/`  
   Home page, products, `/go/*` links check karo.

**Note:** `wrangler.toml` mein `[[routes]]` blocks **commented** hain taake domain zone na hone par deploy fail na ho. Dashboard se domain attach karna **recommended** hai; advanced users zone ke baad routes uncomment karke dubara deploy kar sakte hain.

---

## Part C — Checklist (sab green = live)

- [ ] GitHub Action **Deploy to Cloudflare Workers** green / successful  
- [ ] Worker `cheatsdayz-com` dashboard par dikh raha hai  
- [ ] `cheats-dayz.com` zone isi Cloudflare account par hai  
- [ ] Custom domains: apex + www worker se attached  
- [ ] `https://cheats-dayz.com` load hota hai (SSL lock icon)  
- [ ] `http://www.cheats-dayz.com` → `https://cheats-dayz.com` redirect  

---

## Agar error aaye

| Error | Fix |
|--------|-----|
| `CLOUDFLARE_API_TOKEN` missing | Part A step 3 — dono secrets add karo |
| `npm ci` fail | Node **22** use karo; `npm ci` ( `npm install` nahi) |
| Custom domain attach fail | Domain **isi account** par ho; spelling `cheats-dayz.com` |
| Purana worker / wrong account | `wrangler whoami` — sahi account login |
| Actions red cross, code OK | Sirf secrets missing thi — Part A |

---

## Owner (abdullahsrozirotiii) ke liye

Tum ab sirf GitHub par code rakho. Jab OS deploy + domain kar le, site unke Cloudflare par live hogi. Tumhein unke account ka token **mat** mangna — woh khud GitHub secrets ya `wrangler login` se karenge.

English technical summary: see [README.md](../README.md) and [DEPLOY-CHECKLIST.md](./DEPLOY-CHECKLIST.md).
