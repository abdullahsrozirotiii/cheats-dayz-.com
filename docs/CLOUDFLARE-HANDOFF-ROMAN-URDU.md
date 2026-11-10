# Cloudflare deploy + domain (handoff — Roman Urdu)

**GitHub Secrets ki zaroorat nahi.** Na repo owner ko, na OS ko `CLOUDFLARE_API_TOKEN` GitHub par daalna padta.

**Zaroori domain:** `cheats-dayz.com` (hyphen ke sath).  
**Worker naam (change mat karna):** `cheatsdayz-com`

Repo: https://github.com/abdullahsrozirotiii/cheats-dayz-.com

---

## OS ke liye sirf 3 kaam (recommended)

### 1) Repo Cloudflare se connect karo (ek dafa)

1. OS ke **Cloudflare account** mein login.
2. **Workers & Pages** → **Create** → **Worker** → **Connect to Git** (ya **Import a repository**).
3. GitHub authorize karo → repo **`cheats-dayz-.com`** select → branch **`main`**.
4. Build settings (agar dashboard pooche):

   | Setting | Value |
   |--------|--------|
   | Node.js | **22** (ya `.node-version` auto) |
   | Install | `npm ci` |
   | Build | `npm run build` |
   | Deploy | `npx wrangler deploy` |

5. **Save and Deploy** — pehli build khatam hone do.

6. Test: `https://cheatsdayz-com.<account>.workers.dev` (workers.dev sirf test; SEO production domain par hai).

**Baad mein updates:** GitHub par `main` push hone par Cloudflare khud deploy kar sakta hai, **ya** dashboard se **Retry deployment** / **Deploy** dabao.  
(Site owner baad mein yahi “manual refresh” bhi kar sakta hai.)

---

### 2) Domain khareedo + worker se attach karo

1. **Same Cloudflare account** par **Registrar** se `cheats-dayz.com` khareedo (ya zone add karo).
2. Zone ready hone do (kuch minute).
3. **Workers & Pages** → worker **`cheatsdayz-com`** → **Settings** → **Domains & Routes**:
   - `cheats-dayz.com`
   - `www.cheats-dayz.com` (code www → apex redirect karta hai)
4. Zone par **SSL/TLS → Full (strict)** aur **Always Use HTTPS** ON.
5. Check: `https://cheats-dayz.com/`

`wrangler.toml` mein routes **commented** rakho jab tak zone na ho; dashboard attach **recommended** hai.

---

### 3) Done

OS ko GitHub Secrets, API token GitHub par, ya zip se wrangler — **kuch extra nahi** chahiye agar step 1 dashboard connect se ho gaya.

---

## Plan B — agar Git connect na ho (sirf clone/ZIP)

Bina GitHub Actions, bina repo secrets:

```powershell
git clone https://github.com/abdullahsrozirotiii/cheats-dayz-.com.git
cd cheats-dayz-.com
npm ci
npm run verify:deploy
npx wrangler login
npm run deploy
```

Phir wahi **Part 2** — domain + Domains & Routes.

---

## Owner (abdullahsrozirotiii) ke liye

- GitHub par **koi Cloudflare secret mat rakho** — purana deploy workflow hata diya gaya.
- GitHub **CI** sirf `npm run build` check karti hai (green = code theek).
- Live site / refresh = **Cloudflare dashboard** (jis account ne Git connect kiya).

---

## Checklist

- [ ] Cloudflare Workers Builds se repo connected, deploy successful
- [ ] Worker `cheatsdayz-com` visible
- [ ] Domain `cheats-dayz.com` + www attached
- [ ] `https://cheats-dayz.com` opens with SSL

English: [DEPLOY-CHECKLIST.md](./DEPLOY-CHECKLIST.md) · [README.md](../README.md)
