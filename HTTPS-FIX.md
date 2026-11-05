# "Enforce HTTPS is unavailable" on `chauhan.qd.je` — diagnosis and fix

---

## ✅ STATUS — FIX 1 worked, certificate is now being issued

After re-saving the custom domain, GitHub's message changed from an **error**
(`"your domain is not properly configured to support HTTPS"`) to **progress**:

```
DNS check successful
TLS certificate is being provisioned. This may take up to 15 minutes to complete.
  1 of 3  Certificate Requested: Detected a change to DNS settings.
          Requesting a new certificate.
Enforce HTTPS — Not yet available … Please allow 24 hours for this process to complete.
```

That confirms the diagnosis: nothing was misconfigured, GitHub simply had not started issuance until
the domain was saved through the settings screen.

**What to do now: nothing.** The three stages are *Requested → Issued → Deployed*.

- **Do not** keep deleting and re-adding the domain — each change restarts the queue at stage 1.
- **Do not** touch the DNS records.
- Re-check the box in a few hours. When all three stages are green, **Enforce HTTPS** becomes
  clickable — tick it and you are finished.
- Meanwhile `http://chauhan.qd.je` serves the whole site normally (verified: HTTP 200 on every page).
- The padlock appears only once the certificate finishes; until then browsers show "Not secure",
  which is cosmetic at this stage.

Re-verified from outside at the time of writing: the site still presents the shared `CN = *.github.io`
certificate and no `chauhan.qd.je` certificate exists in the public logs yet — i.e. stage 1 of 3,
exactly as GitHub reports.

**About the "Visibility / GitHub Enterprise" text on that page:** that is GitHub's standard help copy
listing which paid plans allow Pages on *private* repositories. It is not an error and not a bill.
Your repository is public, which is the free tier — leave it public.

If the box is still grey after 24 hours, go to **FIX 3** (Cloudflare, instant HTTPS).

---


## What I checked from outside, and what I found

| Check | Result | Verdict |
|---|---|---|
| `A` records for `chauhan.qd.je` | `185.199.108.153`, `.109`, `.110`, `.111` | ✅ exactly GitHub Pages' four IPs |
| `AAAA` (IPv6) records | none | ✅ nothing conflicting |
| `CAA` records on `chauhan.qd.je` and `qd.je` | none | ✅ no issuer restriction blocking Let's Encrypt |
| `www.chauhan.qd.je` | `CNAME → chauhan-complex.github.io` | ✅ correct, resolves to the same four IPs |
| Nameservers | `dns1.digitalplat.org`, `dns2.digitalplat.org` | ✅ DigitalPlat's own DNS (you did not need Cloudflare — that is fine) |
| Is the site being served? | `HTTP/1.1 200 OK`, `Server: GitHub.com`, `X-GitHub-Request-Id` present | ✅ GitHub Pages is serving every page |
| Content | brand, phone, "146", rate card `₹1,200 – ₹3,500`, 425 Hindi blocks, 0 stock photos, correct listing titles | ✅ all correct |
| **TLS certificate presented** | `subject: CN = *.github.io`, issuer Let's Encrypt | ❌ **this is the whole problem** |
| Certificate logs for `chauhan.qd.je` | no certificate has ever been issued | ❌ GitHub has not obtained one yet |
| `kanji.qd.je` for comparison | `subject: CN = kanji.qd.je`, Let's Encrypt, issued **Sep 30** | ✅ same DNS shape as yours, and it got a cert |

**Conclusion:** your DNS is identical in shape to the working `kanji.qd.je`, and GitHub Pages is
serving the site correctly. The only thing missing is that GitHub has not yet obtained a
Let's Encrypt certificate *for your hostname*, so it falls back to the shared `*.github.io`
certificate — which is why the browser warns and why the **Enforce HTTPS** box stays grey.

That is a GitHub-side provisioning step, not something in your repository or your DNS.

---

## FIX 1 — Re-save the custom domain (2 minutes, try this first)

This is the most common cause when DNS is already perfect: the domain arrived through the
`public/CNAME` file in the repo, and GitHub does not always start certificate issuance until the
domain is saved through the settings screen.

1. Repo → **Settings** → **Pages**.
2. In **Custom domain**, delete `chauhan.qd.je` → **Save**.
   (GitHub may show a warning and the site may briefly 404 — that is expected.)
3. Wait about a minute.
4. Type `chauhan.qd.je` back in → **Save**.
5. Watch the message under the box. You want:
   **"Custom domain is already pointed to this repository."**
6. Wait **30–60 minutes**, reload the page, and check whether **Enforce HTTPS** became clickable.
7. If it did → tick it. Done.

Pushing any commit also nudges this along (each deploy re-reads the `CNAME` file), so if you have a
content change pending, do it now.

## FIX 2 — Wait out the provisioning window (24–48 h)

GitHub documents certificate issuance as taking up to 24 hours, and for free shared top-level
domains it often takes longer. There is a real possibility of a second factor here:

> Let's Encrypt allows **50 certificates per week per registered domain**. For `qd.je` that limit is
> shared by *every* DigitalPlat user on that TLD. When I queried the public certificate logs, I found
> **zero** certificates issued for any `*.qd.je` name in the previous seven days — which is consistent
> with that weekly limit being exhausted. I could not fully confirm it because the log service went
> unavailable mid-check, so treat it as likely rather than proven.

If this is the cause, the certificate appears on its own once the weekly window rolls over, and
FIX 1 will succeed at that point. `kanji.qd.je` got its certificate on **Sep 30**, before the current
window.

**While you wait, the site is fully usable** — `http://chauhan.qd.je` serves every page correctly.
The only downsides are the browser's "Not secure" label and that you should hold off on Google
Search Console until HTTPS works.

## FIX 3 — Instant HTTPS via Cloudflare (recommended if FIX 1 and 2 fail)

This removes Let's Encrypt and GitHub from the equation entirely: Cloudflare issues its **own**
certificate for `chauhan.qd.je`, usually within minutes, and it is free.

1. <https://dash.cloudflare.com> → sign up → **Add a site** → `chauhan.qd.je` → **Free** plan.
2. Cloudflare shows two nameservers, e.g. `lara.ns.cloudflare.com`, `rick.ns.cloudflare.com`.
3. <https://dash.domain.digitalplat.org> → your domain → **Nameservers** → replace
   `dns1/dns2.digitalplat.org` with the two Cloudflare ones → save.
   Wait for Cloudflare's "your site is active" email (15 min – 24 h).
4. Cloudflare → **DNS → Records** — recreate the records, but this time with the
   **orange cloud ON (Proxied)**:

   | Type | Name | Content | Proxy |
   |---|---|---|---|
   | `A` | `@` | `185.199.108.153` | 🟠 Proxied |
   | `A` | `@` | `185.199.109.153` | 🟠 Proxied |
   | `A` | `@` | `185.199.110.153` | 🟠 Proxied |
   | `A` | `@` | `185.199.111.153` | 🟠 Proxied |
   | `CNAME` | `www` | `chauhan-complex.github.io` | 🟠 Proxied |

5. Cloudflare → **SSL/TLS → Overview** → set the mode to **Flexible**
   (Cloudflare talks to GitHub over plain HTTP, so GitHub's missing certificate no longer matters).
6. Cloudflare → **SSL/TLS → Edge Certificates** → turn **Always Use HTTPS** ON.
7. Open `https://chauhan.qd.je` — valid padlock within minutes.

Notes:
- GitHub's **Enforce HTTPS** box will stay grey forever in this setup. That is fine — Cloudflare is
  doing the redirect now. Ignore it.
- If GitHub's own certificate ever arrives, switch the Cloudflare mode from **Flexible** to **Full**.
- Keep the repository's `public/CNAME` file exactly as it is (`chauhan.qd.je`).

## FIX 4 — Different free TLD (last resort)

If `qd.je` turns out to be permanently rate-limited, register a second free name on DigitalPlat
under a different extension — `.dpdns.org`, `.us.kg` or `.xx.kg` — then:

1. Change `public/CNAME` to the new name, commit, push.
2. Repo → Settings → Pages → Custom domain → enter the new name.
3. Set the same four `A` records for it.

Everything else in the project is domain-agnostic apart from `public/CNAME` and the default URL in
`src/app/sitemap.ts`, `src/app/robots.ts` and `src/app/layout.tsx` (search for `chauhan.qd.je`).

---

## Details that would let me narrow it down

If FIX 1 does not work, tell me:

1. Repo → **Settings → Pages**: what exactly does the Custom domain box say?
   (`Custom domain is already pointed to this repository` / a yellow warning / `DNS check in progress`)
2. How many **hours** since you first added the custom domain?
3. Is the repository **Public**? (Settings → General → Danger Zone shows "Change visibility".)
4. **Actions** tab: is the latest run green, and does the build log contain the line
   `out/CNAME -> chauhan.qd.je`?
5. Does `http://brodante.github.io/…` — sorry, `http://chauhan-complex.github.io/chauhan-properties/` —
   load? (It should, and confirms Pages itself is healthy.)

---

## Priority

Not urgent. The website works, every page loads, and the content is correct. HTTPS matters for the
browser's trust indicator and for Google, so aim to have it settled within a few days — start with
FIX 1 today, and if the box is still grey tomorrow, do FIX 3 and stop thinking about it.
