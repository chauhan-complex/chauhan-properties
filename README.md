# Chauhan Properties — chauhan.qd.je

The website of **Mukesh Singh Chauhan**, Chauhan Complex, Kudrat Vihar Colony,
**Sarojini Nagar, Lucknow 226008** — land and property in **Amausi, Gauri, Miranpur Pinwat,
Aurawan and Piparsand**.

📞 **+91 79051 42519** (call and WhatsApp) · ✉️ **chauhanproperties.lko@gmail.com**
🌐 **https://chauhan.qd.je** · English and हिन्दी, switchable from the header

146 properties in his own name, 12 published here. Every listing is his own property — buyers deal
with the owner directly, with no broker in between.

---

## What visitors can do

| Page | What it offers |
|---|---|
| `/` | The five areas with live per sq.ft rates and what each sits near, a 3-tap property search, services, how a deal moves, common questions |
| `/properties/` | All published listings, filterable by deal type, property type, area and keyword |
| `/properties/<listing>/` | Photos, walkthrough video, the exact map pin, rate, landmarks nearby, and Call / WhatsApp |
| `/sell/` | A form for owners who want their property sold or rented out — it composes a WhatsApp message or email |
| `/about/` | Who he is, how the desk works, the areas covered |
| `/contact/` | Office map with the exact pin, opening hours with a live open/closed indicator, and a message form |

Every Call and WhatsApp button on the site goes to +91 79051 42519. The enquiry forms do not store
anything — they hand the visitor's details to WhatsApp or their own email app, so enquiries reach
him directly.

Currently listed: nine land parcels, the farmhouse plot at Aurawan, the two-storey semi-furnished
house at Amausi (24 site photos plus a full-building tour), and Chauhan Complex itself — shops,
offices, flats and godown space on rent.

---

## Updating the website

Everything is in **one file: `src/data/site.ts`**.

1. Open it on github.com and press the **pencil** icon.
2. Change a rate, add a parcel, or edit the phone number / address / about text.
3. **Commit changes** to `main`.

GitHub Actions rebuilds and republishes the site in about two minutes. There is no database, no admin
login and nothing to restart.

| To change | Edit |
|---|---|
| A rate, or add a land parcel | the `PARCELS` list — one line per plot |
| The five areas and their rates | `AREAS` |
| Landmarks near an area | `near` / `nearHi` in `AREAS` |
| Phone, WhatsApp, email, address, hours | `SITE` |
| "146 properties in hand" | `portfolioTotal` in `SITE` |
| The About text | `aboutLong` / `aboutLongHi` in `SITE` |
| A house, shop, flat or rental | `makeListing({...})` in `EXTRA` — there is a worked example |
| Photos | add a Drive file ID to `DRIVE_IDS`, then its name and captions to `HOUSE_PHOTOS` |
| A video | paste a YouTube (Unlisted) link into `videoUrl` |

Interface wording lives in `src/lib/i18n.ts` (both languages side by side), the longer editorial text
in `src/lib/content.ts` (English) and `src/lib/content-hi.ts` (Hindi).

`MEDIA-GUIDE.md` explains photos and video in detail. `tools/rename-photos.py` renames and compresses
a folder of phone photos if you ever prefer to host them here instead of on Drive.

---

## Publishing

`git push` to `main` is the whole deployment. GitHub Actions builds a static copy and GitHub Pages
serves it at `chauhan.qd.je`; the `CNAME` file and the domain's DNS records are already in place.

`DEPLOY-STEPS.md` has the full setup from scratch, `DEPLOYMENT.md` has the DNS detail and
troubleshooting, and `HTTPS-FIX.md` covers the certificate wait.

---

## Built with

Next.js (App Router) exported to static HTML · React 19 · TypeScript · Tailwind CSS v4. No database,
no CMS, no icon library — every icon is hand-drawn SVG and the area map is generated SVG. Both
languages ship in the HTML and CSS shows the active one, so switching is instant and Google can read
either version.

Photographs are served from a public Google Drive folder, so updating a photo never needs a code
change or a large file in the repository. **That folder must stay shared as "Anyone with the link"** —
restricting it breaks every image on the site.
