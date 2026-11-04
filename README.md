# Chauhan Properties — Lucknow

A bilingual (English / हिन्दी) **static** property website for **Mukesh Singh Chauhan**,
Chauhan Complex, Kudrat Vihar Colony, **Sarojini Nagar, Lucknow 226008**.

Land and property in **Amausi · Gauri · Miranpur Pinwat · Aurawan · Piparsand** —
146 properties handled, 9 published here, the rest shared on a call.

| | |
|---|---|
| **Phone / WhatsApp** | +91 79051 42519 |
| **Email** | chauhanproperties.lko@gmail.com |
| **👉 Deploy now** | **[DEPLOY-STEPS.md](./DEPLOY-STEPS.md)** — 14 tick-box steps for `chauhan.qd.je` |
| **GitHub account** | Hosted on `chauhan-complex`, not `brodante` — see **[PUSH-TO-CHAUHAN-COMPLEX.md](./PUSH-TO-CHAUHAN-COMPLEX.md)** |
| **Hosting** | GitHub Pages via GitHub Actions — detail & troubleshooting in [DEPLOYMENT.md](./DEPLOYMENT.md) |
| **Content** | one file: [`src/data/site.ts`](./src/data/site.ts) |

---

## No database, no admin panel, no server

Everything a visitor sees is generated into plain HTML at build time and served by GitHub Pages —
the same architecture as `kanji-widget-app`. That means:

- **free forever** hosting, no cold starts, no uptime worries;
- nothing to patch, no login to protect, no database to back up;
- content changes are made **in the code** (one TypeScript file) and published by `git push`.

Visitors can **call**, **WhatsApp**, or **email** — the contact and "sell your property" forms
compose the message for them and hand it to WhatsApp or their email app, so enquiries reach the owner
directly with nothing stored anywhere.

## What the site has

- Home page: hero over a hand-drawn SVG survey map of the five villages, 3-tap search, live rate card
  (min–max ₹/sq.ft and parcel count per village), services, process, FAQ, contact block.
- **Listings page** — filters (deal type, property type, village, keyword, sort) run in the browser,
  grid or list view, shareable `?locality=…` URLs.
- **Listing page** — rate card with the per sq.ft price, photo/video gallery (with a bilingual
  "photographs on request" placeholder until photos are added), highlights, embedded Google Map,
  similar parcels, Call / WhatsApp / email.
- **Sell / rent out** page with a paper checklist, and a **Contact** page with a live open/closed
  indicator in Indian time, the exact office pin and directions.
- **हिन्दी toggle** — both languages are rendered into the HTML and CSS shows the active one, so the
  switch is instant, there is no flash, and Google can read both. Prices become
  `₹3,500 प्रति वर्ग फुट`, villages become `मीरानपुर पिनवट`, area units become `बीघा / वर्ग फुट`.
- `sitemap.xml`, `robots.txt`, `RealEstateAgent` + `RealEstateListing` JSON-LD, custom 404,
  `prefers-reduced-motion` support, no stock photography anywhere.

## Tech

Next.js (App Router) · React 19 · TypeScript · Tailwind CSS v4 — exported to static HTML with
`output: 'export'`. No icon library (hand-drawn inline SVG), no UI kit, no database, no CMS.

## Where the content lives

**`src/data/site.ts`** is the only file you need for day-to-day changes.

```ts
SITE = { businessName, ownerName, phone, whatsapp, email, officeAddress,
         officeMapUrl, hours / hoursHi, aboutShort(Hi), aboutLong(Hi), portfolioTotal: 146 }

PARCELS = [                                  // ← the nine published land parcels
  { village: "Miranpur Pinwat", villageHi: "मीरानपुर पिनवट", rate: 3500, featured: true, listed: "2026-01-12" },
  { village: "Amausi",          villageHi: "अमौसी",         rate: 2500, featured: true, listed: "2026-01-04" },
  …
]
```

- **Change a rate** → edit the `rate` number. The title, slug, description, highlights, rate card and
  sitemap all regenerate from it, in both languages.
- **Add a parcel** → add one line to `PARCELS`.
- **Add a house, shop, flat or rental** → use `makeListing({...})` in the `EXTRA` array (the file has
  a commented example). Set `priceBasis: "per_sqft"` only for land rates; leave it `"total"` for a
  whole-property price, and `purpose: "rent"` or `"lease"` for rentals.
- **Office details, phone, address, about text** → edit `SITE`.

Other text lives in `src/lib/content.ts` (English) and `src/lib/content-hi.ts` (Hindi); interface
strings are in `src/lib/i18n.ts`.

### Photos and videos

Put images in `public/photos/` and reference them as `/photos/amausi-1000-1.jpg` inside a listing's
`images: [...]` array — the first one is the card cover. Videos: paste a YouTube link (unlisted is
fine) or a direct `.mp4` URL into `videoUrl`. Until then the site shows the branded
"Photographs on request / फ़ोटो माँगने पर भेजी जाती हैं" placeholder.

### Maps

Open the spot in Google Maps → *Share* → *Copy link* → paste into `mapUrl`. The embedded map is built
from the coordinates in that link, so the pin lands exactly where the property is.

## Running it locally

```bash
npm install
npm run dev            # http://localhost:3000 — full site with hot reload
```

Build the exact folder that goes to GitHub Pages:

```bash
rm -rf src/app/api && EXPORT_STATIC=1 npm run build   # writes ./out
npx serve out                                          # preview the static site
```

(`src/app/api/health` exists only so a Node preview of the same code can be smoke-tested; the Pages
workflow deletes it because Pages has no server.)

## Deployment

Full step-by-step — GitHub repo, Pages, the Actions workflow, the free DigitalPlat domain and the
Cloudflare DNS records — is in **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

Short version:

```bash
git init && git add . && git commit -m "Chauhan Properties website" && git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/chauhan-properties.git
git push -u origin main
```

The domain is already wired in: `public/CNAME` contains **`chauhan.qd.je`** and
`sitemap.xml` / `robots.txt` / share cards default to `https://chauhan.qd.je`, so there are
**no environment variables to set**. In the repo you only need:
**Settings → Pages → Source: `GitHub Actions`**, then add the four GitHub Pages `A` records
(`185.199.108.153`–`185.199.111.153`) plus a `www` CNAME in Cloudflare, with the clouds left grey.
`.github/workflows/deploy.yml` builds `./out` and publishes it on every push.
