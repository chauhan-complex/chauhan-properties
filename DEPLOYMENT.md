# Deploying to `chauhan.qd.je`

The domain is already registered with DigitalPlat, and the project is already wired for it:

| Where | What is set |
|---|---|
| `public/CNAME` | `chauhan.qd.je` → copied into the build so Pages serves that domain |
| `src/app/sitemap.ts`, `robots.ts`, `layout.tsx` | default site URL `https://chauhan.qd.je` |
| `.github/workflows/deploy.yml` | builds `./out` and publishes it to GitHub Pages on every push |
| `public/.nojekyll` | stops Pages from hiding the `/_next` assets folder |

So there are **no environment variables to set**. You need three things: a GitHub repository, Pages
switched on with "GitHub Actions" as the source, and the DNS records in Cloudflare.

```
edit src/data/site.ts → git push → Actions builds ./out → Pages serves it at chauhan.qd.je
```

---

## 1 · Put the project on GitHub

The folder you have right now **is** the repository — you do not need to create or rename any folder.
Push it as a repo named `chauhan-properties` (the repo name does not appear anywhere on the site,
because the custom domain hides `github.io/…`; pick any name you like).

```bash
cd chauhan-properties        # the project folder, the one holding package.json

git init
git add .
git commit -m "Chauhan Properties website"
git branch -M main
```

Before pushing, confirm your secrets are not going up:

```bash
git status --short | grep '\.env'      # must print nothing
```

Then on **github.com** → **+** (top right) → **New repository**:

- Repository name: `chauhan-properties`
- **Public** (Pages on a private repo needs a paid plan)
- Do **not** tick "Add a README", ".gitignore" or "license" — you already have them

Click **Create repository**, and run the two commands GitHub shows:

```bash
git remote add origin https://github.com/chauhan-complex/chauhan-properties.git
git push -u origin main
```

Open the **Actions** tab. `Build and deploy to GitHub Pages` runs automatically. The first run ends
with a failure at the *Publish* step until you do step 2 — that is expected, not a bug.

---

## 2 · Switch GitHub Pages on

Repository → **Settings** → **Pages** (left sidebar):

- **Build and deployment → Source:** select **`GitHub Actions`**
  *(not "Deploy from a branch" — that is the old way and it will not pick up the build)*
- Leave "Custom domain" alone for now; the `CNAME` file sets it during the first successful deploy.

Then re-run the build: **Actions** tab → *Build and deploy to GitHub Pages* → **Run workflow**.
When it goes green, your site is live at `https://chauhan-complex.github.io/chauhan-properties/` and
Settings → Pages will show `chauhan.qd.je` as the custom domain.

---

## 3 · Point `chauhan.qd.je` at GitHub Pages

DigitalPlat does not run DNS — exactly like your `kanji.qd.je`, the domain is delegated to
**Cloudflare**, and the records live there.

**3a · If you have not added the domain to Cloudflare yet**

1. dash.cloudflare.com → sign up / sign in → **Add a site** → type `chauhan.qd.je` → **Free plan**.
2. Cloudflare shows two nameservers, e.g. `lara.ns.cloudflare.com` and `rick.ns.cloudflare.com`.
3. dash.domain.digitalplat.org → your domain → **Nameservers / Custom nameservers** → paste those
   two → save.
4. Wait for Cloudflare's "your site is active" email (15 min – 24 h). Check with:
   ```bash
   dig NS chauhan.qd.je +short
   ```
   It must print the two `ns.cloudflare.com` names before you continue.

**3b · Add the DNS records** (Cloudflare → `chauhan.qd.je` → **DNS → Records → Add record**)

| Type | Name | Content | Proxy status | TTL |
|---|---|---|---|---|
| `A` | `@` | `185.199.108.153` | **DNS only** (grey cloud) | Auto |
| `A` | `@` | `185.199.109.153` | **DNS only** | Auto |
| `A` | `@` | `185.199.110.153` | **DNS only** | Auto |
| `A` | `@` | `185.199.111.153` | **DNS only** | Auto |
| `CNAME` | `www` | `chauhan-complex.github.io` | **DNS only** | Auto |

Four `A` records with the same name `@` is correct — that is how GitHub Pages does IPv4.

> **Keep every cloud grey.** Orange (proxied) traffic goes through Cloudflare and usually breaks the
> GitHub Pages certificate. If you ever want the proxy on, first set
> **SSL/TLS → Overview → Full (strict)**.

**3c · Wait for the certificate**

Open `https://chauhan.qd.je`. GitHub issues the TLS certificate automatically — it can take
**5 to 30 minutes** after DNS resolves. Until then you may see `certificate pending`; refresh later.
Repository → Settings → Pages should eventually show **`chauhan.qd.je`** with a green tick and
"Enforce HTTPS" available (switch it on).

---

## 4 · Check it worked

```
https://chauhan.qd.je/                                          home, rate card, search
https://chauhan.qd.je/properties/                               all nine parcels + filters
https://chauhan.qd.je/properties/miranpur-pinwat-land-3500-per-sqft/
https://chauhan.qd.je/contact/                                  map pin on Chauhan Complex
https://chauhan.qd.je/sitemap.xml                               must list chauhan.qd.je URLs
https://chauhan.qd.je/robots.txt
```

Then on a **phone**: tap the Call button, tap WhatsApp, switch to हिन्दी and check the hero cycles
through अमौसी · गौरी · मीरानपुर पिनवट · औरावां · पिपरसंड.

---

## 5 · Google (free, ~20 minutes, worth doing)

1. **Search Console** — search.google.com/search-console → *Add property* → **URL prefix** →
   `https://chauhan.qd.je` → verify with the DNS `TXT` record in Cloudflare →
   **Sitemaps** → enter `sitemap.xml` → Submit. All nine parcels are already listed in it.
2. **Google Business Profile** — business.google.com → *Chauhan Properties, Chauhan Complex, Kudrat
   Vihar Colony, Sarojini Nagar, Lucknow 226008* → category **Real estate agent** →
   +91 79051 42519 → chauhanproperties.lko@gmail.com → drop the pin on the exact spot → add photos
   of the office. For a local dealer this brings more calls than the website itself.

---

## 6 · Updating the site later

**Rates, new parcels, phone, address, Hindi text** — edit one file:

1. On github.com open `src/data/site.ts` → press the **pencil** icon.
2. Change a `rate`, or copy a `PARCELS` line and edit `village` / `villageHi` / `rate` / `listed`.
3. **Commit changes** → main. GitHub Actions rebuilds and republishes in about two minutes.

Locally that is just:

```bash
git add src/data/site.ts && git commit -m "Amausi 1500 -> 1600" && git push
```

**Photos** — put files in `public/photos/`, push, then reference them in the listing:
`images: ["/photos/amausi-1000-1.jpg"]`. First entry is the card cover.
**Videos** — paste a YouTube link (unlisted is fine) into `videoUrl`.
**Houses, shops, flats, rentals** — use `makeListing({...})` in the `EXTRA` array; the file has a
commented example. Leave `priceBasis: "total"` unless you are quoting a per sq.ft land rate.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Workflow fails at *Publish to GitHub Pages* | Pages source is not **GitHub Actions** (step 2). |
| Site loads but has no styling | `public/.nojekyll` missing, so Pages hides `/_next`. It is in the repo — check it survived the commit. |
| `chauhan-complex.github.io/chauhan-properties` works but CSS/JS 404 | You are serving from a sub-path. Set the repo variable `NEXT_PUBLIC_BASE_PATH=/chauhan-properties` (only needed *without* a custom domain). |
| `chauhan.qd.je` → "There isn't a GitHub Pages site here" | The four `A` records are missing, or the workflow has not succeeded yet, or `out/CNAME` did not ship (the build log prints `out/CNAME -> chauhan.qd.je`). |
| `ERR_NAME_NOT_RESOLVED` | Cloudflare nameservers not saved in DigitalPlat, or still propagating — check `dig NS chauhan.qd.je +short`. |
| Certificate stuck on *pending* | Normal for up to 30 min. If longer, re-save the domain in Settings → Pages and confirm the clouds are grey. |
| Redirect loop / invalid certificate | A record is orange (proxied). Set it to **DNS only**, or set SSL/TLS to *Full (strict)*. |
| `www.chauhan.qd.je` does not work | The `www` CNAME points at `chauhan-complex.github.io` — it must be the `username.github.io` host, not the repo path. |
| New listing not appearing | Confirm the commit landed on `main` and the Actions run is green, then hard-refresh (Ctrl/Cmd + Shift + R). |
| Build fails on typecheck | The log names the file and line — usually a missing comma in `src/data/site.ts`. |
| Hindi shows English words somewhere | Both languages live in the HTML and CSS hides one; a missing `i18n-hi` pair means that string was added in English only — mirror it in `src/lib/content-hi.ts` or `src/lib/i18n.ts`. |

---

## What this setup costs

| Item | Cost |
|---|---|
| GitHub repository + Actions + Pages | Free |
| Cloudflare DNS | Free |
| DigitalPlat `chauhan.qd.je` | Free (renew it yearly from the dashboard) |
| **Total** | **₹0** |

There is no server, no database and no admin login to maintain. If you later want a `.in` or `.com`
domain (~₹700–1,200/year), add it in Settings → Pages and in Cloudflare the same way, then redirect
`chauhan.qd.je` to it.
