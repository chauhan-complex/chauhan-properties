# Deploy `chauhan.qd.je` — every step, in order

Tick the boxes as you go. **Nothing needs configuring inside the code** — the domain, the CNAME file,
the sitemap URLs and the build workflow are already set up in this project. You are doing three
things only: creating a GitHub repo, switching Pages on, and adding five DNS records.

```
[ ] STEP 1   Install Git (one time only)
[ ] STEP 2   Open the project folder in a terminal
[ ] STEP 3   Make the first commit
[ ] STEP 4   Create an empty repository on github.com
[ ] STEP 5   Connect the folder to it and push
[ ] STEP 6   Watch the first Actions run fail (this is normal)
[ ] STEP 7   Settings → Pages → Source: GitHub Actions
[ ] STEP 8   Re-run the workflow → site is live on github.io
[ ] STEP 9   Cloudflare + DigitalPlat nameservers
[ ] STEP 10  Add the five DNS records
[ ] STEP 11  Open chauhan.qd.je and wait for the certificate
[ ] STEP 12  Verify the pages
[ ] STEP 13  Google Search Console + Business Profile
[ ] STEP 14  Learn the one-file update routine
```

**Already done for you in this project**

| File | What it does |
|---|---|
| `public/CNAME` | contains `chauhan.qd.je` → GitHub Pages serves your domain |
| `public/.nojekyll` | stops Pages from hiding the `/_next` CSS/JS folder |
| `.github/workflows/deploy.yml` | builds `./out` and publishes it on every push |
| `src/app/sitemap.ts`, `robots.ts`, `layout.tsx` | default to `https://chauhan.qd.je` |
| `.gitignore` | keeps `.env` (secrets) out of GitHub |

---

## STEP 1 — Install Git (one time only)

**Windows:** download from <https://git-scm.com/download/win>, run it, accept every default.
**Mac:** open Terminal and run `xcode-select --install` (or `brew install git`).

Check it worked:

```bash
git --version
```

Expected: something like `git version 2.45.1.windows.1`.

This project is hosted on the **`chauhan-complex`** account, not `brodante`. Commit identity and
login are two different things — see **`PUSH-TO-CHAUHAN-COMPLEX.md`** before STEP 5. For now, leave
your global config alone and set the identity for this repository only (STEP 3):

```bash
# inside the project folder — applies to this repo only, brodante stays your global default
git config user.name "chauhan-complex"
git config user.email "chauhan-complex@users.noreply.github.com"
```

---

## STEP 2 — Open the project folder in a terminal

The project folder is the one that contains `package.json`, `README.md` and the `src` folder.
**You do not need to create, rename or copy any folder** — this folder *is* the repository.

**Windows:** open that folder in File Explorer → click the address bar → type `cmd` → Enter.
**Mac:** right-click the folder → *New Terminal at Folder*.
**VS Code:** open the folder → menu *Terminal → New Terminal*.

Confirm you are in the right place:

```bash
ls            # Mac/Linux       (Windows: dir)
```

You should see `package.json`, `src`, `public`, `README.md`, `DEPLOYMENT.md`, `.github`.

---

## STEP 3 — Make the first commit

```bash
git init
git add .
git commit -m "Chauhan Properties website"
git branch -M main
```

**Now the safety check.** This must print **nothing**:

```bash
git status --short | grep ".env"
```

If it prints `.env`, stop — that file holds secrets. Run `git rm --cached .env` and commit again.

Expected output of the commit: `~90 files changed, ... insertions(+)`.

---

## STEP 4 — Create an empty repository on github.com

1. Sign in at <https://github.com>.
2. Click the **+** in the top-right corner → **New repository**.
3. Fill in exactly this:
   - **Repository name:** `chauhan-properties`
   - **Description:** `Property dealer website — Chauhan Properties, Sarojini Nagar, Lucknow`
   - **Visibility:** **Public**  ← Pages on a private repo needs a paid plan
   - **IMPORTANT — do NOT tick** "Add a README file", ".gitignore", or "license".
     You already have all three; ticking them makes the next step fail.
4. Click **Create repository**.

GitHub now shows a page titled *"…or push an existing repository from the command line"* with two
commands. Those are STEP 5.

---

## STEP 5 — Connect the folder and push

This repository lives on the **`chauhan-complex`** account while your PC's git login is `brodante`,
so put the account name inside the remote URL — that is what makes git ask for the right credentials:

```bash
git config --global credential.useHttpPath true     # one time: separate logins per repository
git remote add origin https://chauhan-complex@github.com/chauhan-complex/chauhan-properties.git
git branch -M main
git push -u origin main
```

When it asks for a password, **paste a Personal Access Token for the `chauhan-complex` account** —
your GitHub password will be rejected. Create it while signed in as that account:
**Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
(classic)**, scope `repo`, then copy the `ghp_…` string.

> Full details, plus an SSH-key method and a no-terminal GitHub Desktop method:
> **`PUSH-TO-CHAUHAN-COMPLEX.md`**.
>
> Simpler alternative: keep the repo on `chauhan-complex` and add `brodante` as a collaborator
> (repo → Settings → Collaborators → Add people). Then your existing login works unchanged.

Expected output ends with:

```
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

Refresh the repository page — you should see all your files, with `README.md` rendered below them.

---

## STEP 6 — Watch the first Actions run (it will fail — normal)

Repository → **Actions** tab (top menu).

You will see **Build and deploy to GitHub Pages** with a yellow circle, then a red ✗.
Click it → click the failed job → the error will mention Pages not being enabled.
**That is expected**, because STEP 7 has not been done yet. Nothing is broken.

---

## STEP 7 — Turn GitHub Pages on

Repository → **Settings** (top-right of the repo menu) → left sidebar → **Pages**.

Under **Build and deployment**:

- **Source:** select **`GitHub Actions`** from the dropdown.
  ⚠️ Do **not** choose "Deploy from a branch" — that is the old method and it will not find the build.
- Leave **Custom domain** empty. The `CNAME` file fills it in during the first successful deploy.

---

## STEP 8 — Re-run the workflow

**Actions** tab → *Build and deploy to GitHub Pages* (left list) → **Run workflow** button →
select `main` → **Run workflow**.

Wait ~2 minutes. Both jobs (`build`, then `deploy`) should turn green ✓.

Click the **build** job and scroll the log — you should see these lines, which confirm the export:

```
Pages generated:
  ./out/index.html
  ./out/properties/index.html
  ./out/properties/amausi-land-1000-per-sqft/index.html
  … (17 html files)
out/CNAME -> chauhan.qd.je
Total size: 6.6M
```

Your site is now live at **`https://chauhan-complex.github.io/chauhan-properties/`**. Open it and check it
looks right before doing DNS.

Repository → **Settings → Pages** will now show **Custom domain: `chauhan.qd.je`**.

---

## STEP 9 — Cloudflare + DigitalPlat nameservers

DigitalPlat does not run DNS. Exactly like your `kanji.qd.je`, the domain is delegated to Cloudflare
and the records live there. **Skip to STEP 10 if `dig NS chauhan.qd.je +short` already prints two
`ns.cloudflare.com` names.**

1. <https://dash.cloudflare.com> → sign up or sign in → **Add a site**.
2. Type `chauhan.qd.je` → Continue → choose the **Free** plan.
   ⚠️ Add it as its **own** site. Do not add records under `kanji.qd.je`.
3. Cloudflare scans records, then shows **two nameservers**, e.g.
   `lara.ns.cloudflare.com` and `rick.ns.cloudflare.com`. Keep that page open.
4. <https://dash.domain.digitalplat.org> → sign in → your domain `chauhan.qd.je` →
   **Nameservers** (or *Custom nameservers*) → delete what is there → paste the two Cloudflare
   names → **Save**.
5. Wait for Cloudflare's email *"Your site is active"* — usually 15 minutes, occasionally up to 24 h.
   Check progress any time:
   ```bash
   dig NS chauhan.qd.je +short
   ```
   Continue only when it prints the two Cloudflare names.

*(No `dig` on Windows? Use <https://dnschecker.org> and query NS for `chauhan.qd.je`.)*

---

## STEP 10 — Add the five DNS records

Cloudflare → click `chauhan.qd.je` → left sidebar **DNS** → **Records** → **Add record**.
Add these five, one at a time:

| # | Type | Name | Content | Proxy status | TTL |
|---|---|---|---|---|---|
| 1 | `A` | `@` | `185.199.108.153` | **DNS only** (grey cloud) | Auto |
| 2 | `A` | `@` | `185.199.109.153` | **DNS only** (grey cloud) | Auto |
| 3 | `A` | `@` | `185.199.110.153` | **DNS only** (grey cloud) | Auto |
| 4 | `A` | `@` | `185.199.111.153` | **DNS only** (grey cloud) | Auto |
| 5 | `CNAME` | `www` | `chauhan-complex.github.io` | **DNS only** (grey cloud) | Auto |

Notes:
- Four `A` records all named `@` is **correct** — that is how GitHub Pages does IPv4.
- The `www` target is `chauhan-complex.github.io` — your **username**, *not* the repo path.
- **Every cloud must stay grey.** Orange (proxied) breaks the GitHub Pages certificate and causes
  redirect loops. If you ever want Cloudflare's proxy, first set **SSL/TLS → Overview → Full (strict)**.
- Delete any record Cloudflare auto-created for `@` or `www` that points somewhere else.

---

## STEP 11 — Open your domain and wait for the certificate

Open **`https://chauhan.qd.je`**.

GitHub issues the TLS certificate automatically. It takes **5 to 30 minutes** after DNS resolves, so
you may first see *"certificate is not yet valid"* or a browser warning — close it and try again in
ten minutes. Do not change any settings during this wait.

When it loads over HTTPS:

Repository → **Settings → Pages** → tick **Enforce HTTPS** (it becomes clickable once the
certificate exists).

---

## STEP 12 — Verify

Open each of these:

```
https://chauhan.qd.je/
https://chauhan.qd.je/properties/
https://chauhan.qd.je/properties/miranpur-pinwat-land-3500-per-sqft/
https://chauhan.qd.je/properties/amausi-land-1000-per-sqft/
https://chauhan.qd.je/sell/
https://chauhan.qd.je/about/
https://chauhan.qd.je/contact/          ← map pin must sit on Chauhan Complex
https://chauhan.qd.je/sitemap.xml       ← every URL must start with https://chauhan.qd.je
https://chauhan.qd.je/robots.txt
```

Then **on a phone** (this is what your customers will do):

```
[ ] the Call button dials +91 79051 42519
[ ] the WhatsApp button opens a chat with the message already written
[ ] the contact form fills a WhatsApp message / email with the visitor's details
[ ] pressing हिं switches the whole page to Hindi, and the hero cycles
    अमौसी · गौरी · मीरानपुर पिनवट · औरावां · पिपरसंड
[ ] the map on /contact/ shows Chauhan Complex, not the middle of a field
```

---

## STEP 13 — Google (free, ~20 minutes, brings the most calls)

**Search Console**
1. <https://search.google.com/search-console> → **Add property**.
2. Choose **URL prefix** → `https://chauhan.qd.je`.
3. Verify with the **DNS TXT record** method: copy the value Google gives you → Cloudflare → DNS →
   Add record → Type `TXT`, Name `@`, Content *the value* → Save → back in Google click **Verify**.
4. Left sidebar → **Sitemaps** → type `sitemap.xml` → **Submit**. All nine parcels are already in it.

**Google Business Profile**
1. <https://business.google.com> → add your business.
2. Name **Chauhan Properties**, category **Real estate agent**.
3. Address: Chauhan Complex, Kudrat Vihar Colony, Sarojini Nagar, Lucknow 226008 — then drag the map
   pin onto the exact spot (it should match the pin on your contact page).
4. Phone **+91 79051 42519**, email **chauhanproperties.lko@gmail.com**,
   website **https://chauhan.qd.je**.
5. Hours: Mon–Sat 10:00–20:00, Sunday by appointment.
6. Add photos of the office and the complex. Ask your first few happy clients for a review.

---

## STEP 14 — Updating the site later

There is no admin panel and no database — content lives in **one file**.

**From a browser (easiest):**
1. github.com → your repo → open `src/data/site.ts`.
2. Click the **pencil** icon (top-right of the file).
3. Edit, for example:
   - a rate → change `rate: 1500` to `rate: 1600`
   - the phone or address → edit the `SITE` block at the top
   - add a parcel → copy one `PARCELS` line and change `village`, `villageHi`, `rate`, `listed`
4. Click **Commit changes** → commit directly to `main`.
5. GitHub Actions rebuilds and republishes in about **two minutes**. Nothing else to do.

**From your computer:**
```bash
git add src/data/site.ts
git commit -m "Amausi 1500 -> 1600"
git push
```

**Photos:** put files in `public/photos/`, push, then reference them in the listing:
```ts
images: ["/photos/amausi-1000-1.jpg", "/photos/amausi-1000-2.jpg"],
```
The first one becomes the card cover. Keep each file under ~2 MB, landscape orientation.

**Videos:** paste a YouTube link (unlisted is fine) into `videoUrl`.

**Houses, shops, flats, rentals:** use the commented `makeListing({...})` example in the `EXTRA`
array of the same file. Keep `priceBasis: "total"` unless you are quoting a per sq.ft land rate.

---

## If something goes wrong

| Symptom | Fix |
|---|---|
| Workflow fails at *Publish to GitHub Pages* | Pages source is not **GitHub Actions** — redo STEP 7. |
| Site loads with no styling | `public/.nojekyll` did not get committed — `git add public/.nojekyll && git commit -m fix && git push`. |
| `chauhan-complex.github.io/chauhan-properties` has no CSS/JS | You are on the sub-path URL without a custom domain. Once `chauhan.qd.je` works this goes away. |
| `chauhan.qd.je` → *"There isn't a GitHub Pages site here"* | The four `A` records are missing, or the workflow has not gone green yet, or `out/CNAME` did not ship (the build log prints `out/CNAME -> chauhan.qd.je`). |
| `ERR_NAME_NOT_RESOLVED` | Nameservers not saved in DigitalPlat, or still propagating — check STEP 9.5. |
| Certificate stuck on *pending* over 30 min | Re-save the domain in Settings → Pages; confirm all clouds are grey. |
| Redirect loop / invalid certificate | A record is orange (proxied) → set to **DNS only**, or set SSL/TLS to **Full (strict)**. |
| `www.chauhan.qd.je` fails | The `www` CNAME must point at `chauhan-complex.github.io`, not the repo path. |
| `git push` says *rejected / fetch first* | `git pull --rebase origin main` then `git push`. |
| Build fails on typecheck | The Actions log names the file and line — usually a missing comma in `src/data/site.ts`. |
| Annotation: *"Dependencies lock file is not found"* | `package-lock.json` never got committed. The workflow now falls back to `npm install`, so the build still succeeds. To fix it properly (faster, reproducible builds): `npm install --package-lock-only` then `git add package-lock.json && git commit -m "Add npm lock file" && git push`. |
| Annotation: *"Node.js 20 is deprecated"* | Informational only. The workflow now uses `actions/checkout@v7` and `actions/setup-node@v7`, which run on Node 24. |
| Annotation: *"ubuntu-latest will migrate to Ubuntu 26"* | Informational notice from GitHub about their runners. Nothing to do — it does not affect the build. |
| A new listing does not appear | Confirm the commit is on `main` and the run is green, then hard-refresh (Ctrl/Cmd + Shift + R). |
| Hindi shows an English phrase somewhere | That string was added in English only — mirror it in `src/lib/content-hi.ts` or `src/lib/i18n.ts`. |

More detail, plus what was removed to make the site static, is in **`DEPLOYMENT.md`**.
Project overview, content guide and folder map are in **`README.md`**.

---

## All commands in one block

```bash
# one time
git --version || echo "install git first"
git config --global credential.useHttpPath true      # keeps the two accounts' logins separate

# in the project folder
git init
git add .
git commit -m "Chauhan Properties website"
git branch -M main
git status --short | grep ".env"          # must print nothing
git remote add origin https://github.com/chauhan-complex/chauhan-properties.git
git push -u origin main

# after that, every change is just
git add . && git commit -m "update" && git push
```

Cost of this whole setup: **₹0** — GitHub, Actions, Pages, Cloudflare DNS and the DigitalPlat domain
are all free. There is no server, no database and no login to maintain.

---

# Appendix · Windows PowerShell version (copy-paste)

## The error `src refspec main does not match any`

It means **there is no commit yet**. `git branch -M main` on an empty repository only renames an
*unborn* branch — there is nothing to push. The two missing commands are `git add .` and
`git commit`. Nothing is broken; just run them.

## Before committing: check the hidden files survived the download

Windows downloads and some zip tools drop files that start with a dot. Two of them matter, so check
first — in the project folder (`C:\Users\admin\Downloads\chauhan-properties`):

```powershell
Get-ChildItem -Force .gitignore | Select-Object Name
Get-ChildItem -Force public\.nojekyll, public\CNAME | Select-Object Name
```

You should see `.gitignore`, `.nojekyll` and `CNAME`. **If any is missing**, recreate it:

```powershell
# .gitignore — keeps node_modules and secrets out of GitHub
@'
node_modules/
.next/
out/
build/
.env
.env.*
!.env.example
.vercel
.turbo
*.tsbuildinfo
npm-debug.log*
.DS_Store
Thumbs.db
.idea/
.vscode/*
'@ | Set-Content -Encoding utf8 .gitignore

# public\.nojekyll — without it GitHub Pages hides the /_next folder and the site loads unstyled
New-Item -ItemType File -Force public\.nojekyll | Out-Null

# public\CNAME — your domain, shipped with every build
"chauhan.qd.je" | Set-Content -Encoding ascii -NoNewline public\CNAME
```

## The full sequence

```powershell
cd C:\Users\admin\Downloads\chauhan-properties

git init
git config --global credential.useHttpPath true
git config user.name "chauhan-complex"
git config user.email "mukeshchauhan2654@gmail.com"
git remote add origin https://chauhan-complex@github.com/chauhan-complex/chauhan-properties.git

# --- the part that was missing ---
git add .
git status --short | Measure-Object -Line                       # expect roughly 90-120 lines
git status --short | Select-String -Pattern "\.env|node_modules" # must print NOTHING
git commit -m "Chauhan Properties website"

git branch -M main
git push -u origin main
```

**Reading the checks:**

- `Measure-Object -Line` around **90–120** is right. If it reports **thousands**, `.gitignore` is
  missing and git is about to upload `node_modules` — stop, create the `.gitignore` block above, then
  `git rm -r --cached . ; git add .` and check again.
- The `Select-String` line must print nothing. If it prints `.env`, run `git rm --cached .env` and
  commit again — that file holds secrets.
- Warnings like `LF will be replaced by CRLF` are normal on Windows and harmless.

## The push prompt

Because the remote URL contains `chauhan-complex@`, Git Credential Manager will ask you to sign in to
**that** account:

- If a **browser window** opens → sign in as `chauhan-complex` → **Authorize**.
- If it asks for a **password in a dialog** → paste a **Personal Access Token** created on the
  `chauhan-complex` account (Settings → Developer settings → Personal access tokens → Tokens
  (classic) → Generate new token, scope `repo`). A normal password is rejected.
- If it signs you in as `brodante` anyway → clear the stored credential and retry:
  ```powershell
  cmdkey /list | Select-String github        # see what is stored
  cmdkey /delete:LegacyGeneric:target=git:https://chauhan-complex@github.com
  git push -u origin main
  ```

Success looks like:

```
Enumerating objects: 120, done.
...
To https://github.com/chauhan-complex/chauhan-properties.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

## Then continue at STEP 6

Refresh the repository page → **Actions** tab → the first run fails until you set
**Settings → Pages → Source: `GitHub Actions`** (STEP 7), then **Actions → Run workflow** (STEP 8).
