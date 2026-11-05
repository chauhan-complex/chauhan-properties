# Adding photos and video — the Amausi house, and every listing after it

Short answer: **video → YouTube (Unlisted)**, **photos → this repository's `public/photos/` folder,
compressed first**. Naming: **`floor-sequence-what.jpg`**, e.g. `1-2-kitchen.jpg`.

The site is already wired for all of it — multiple videos per listing, and captions that are
generated automatically from your filenames.

---

## 1 · Video: use YouTube, Unlisted

**Why YouTube and not Drive or the repo:**

| Option | Verdict |
|---|---|
| **YouTube, Unlisted** | ✅ Free, streams properly on a phone on mobile data, adaptive quality, no bandwidth cost to you, no repo bloat. Already supported by the gallery. |
| Google Drive | ❌ Drive is not a video host. Its preview links break when embedded on other sites, large files throw a "can't scan for viruses" warning, they don't stream smoothly on mobile, and it counts against your storage quota. |
| Video file in the repo | ❌ A building tour is 50–300 MB. GitHub repos are meant to stay under ~1 GB, Pages sites are capped at 1 GB, and Git keeps every version forever — one re-upload doubles the size. Also slow for you to push. |
| Vimeo free | ❌ The free tier now caps uploads hard. |

**How to upload it correctly:**

1. youtube.com → camera icon → **Upload video**.
2. Pick the highest-quality file you have. If your phone shot 4K, upload the 4K — YouTube gives
   4K uploads a much higher bitrate, and a walkthrough is all about detail.
3. **Title** (this shows in the player, so make it useful):
   `Semi-Furnished Two-Storey House at Amausi, Lucknow — Full Tour | Chauhan Properties`
4. **Description** — paste this, it costs nothing and helps:
   ```
   Two-storey semi-furnished house at Amausi, Sarojini Nagar, Lucknow. ₹45 lakh.

   Call / WhatsApp: +91 79051 42519
   Website: https://chauhan.qd.je
   Chauhan Properties, Chauhan Complex, Kudrat Vihar Colony, Sarojini Nagar, Lucknow 226008
   ```
5. Next screen → **Visibility: Unlisted**. Not *Public* (it would show up in YouTube search and
   suggest other agents' videos next to yours), not *Private* (private videos cannot be embedded —
   visitors would see an error).
6. In **Show more**: untick *Allow comments* (spam magnet), untick *Add video to playlist* unless you
   want your own playlist for organising.
7. Wait for processing to finish in **all** resolutions — if you copy the link while it is still
   "Processing: SD", the HD version may not appear for an hour.

**What to give me / paste into the site:** any of these forms work —
`https://youtu.be/AbCdEf12345`, `https://www.youtube.com/watch?v=AbCdEf12345`, or the Shorts link.

**How the video is surfaced (so nobody has to hunt for it):** the video tile sits **first** in the
thumbnail strip and carries a `VIDEO` label, there is a permanent **"▶ Watch the video tour"** button
in the top-left corner of the gallery (it swaps to "Back to photos" once you are watching), and the
listing's sticky sidebar has a full-width **"Watch the full video tour"** button that opens YouTube
directly. So the tour is discoverable before anyone scrolls a single photo.

**More than one video?** The gallery supports it. Put several links in `videoUrl`, separated by a
newline:

```ts
videoUrl: `https://youtu.be/AbCdEf12345
https://youtu.be/XyZ98765432`,
```

Each becomes its own tile at the end of the photo strip, labelled "Video tour" / "Video 2".
Suggestion: one full tour (2–4 min) plus, if you have it, a short 20-second exterior clip.

> A **playlist** link is not needed and won't embed as a tour — playlists are only for your own
> organising. Upload each video separately and give me the individual links.

---

## 2 · Photos: put them in `public/photos/`, compressed first

**Important:** this site is static and does **not** resize images (`images.unoptimized: true` in
`next.config.ts`), because GitHub Pages has no image server. Whatever file size you commit is exactly
what a visitor on mobile data downloads. So compress before committing — this is the single biggest
thing you can do for how fast the site feels.

**Targets**

| | Value |
|---|---|
| Long edge | 1600–2000 px |
| Format | JPEG (or WebP) |
| Quality | ~75–80% |
| Size per photo | **under 350 KB**, ideally ~200 KB |
| Orientation | **Landscape** — the gallery crops to 4:3 and the card to 4:3, so portrait shots lose their tops and bottoms |

A 12 MP phone photo straight from the camera is 3–6 MB. Twenty of those would add 80 MB to the
repository and make the listing take several seconds to load on 4G.

**Easiest way to compress:** <https://squoosh.app> — free, made by Google, runs entirely in your
browser (nothing is uploaded). Drag a photo in → right panel choose **WebP** or **MozJPEG** →
quality ~78 → resize to 1800 px wide → drag the result out. You can do several at once with the
`Squoosh CLI` if you get comfortable with it.

On Windows you can also use the built-in **Photos** app → ⋯ → *Resize image*.

**Why not Google Drive for images:** Drive's shared links (`lh3.googleusercontent.com/d/…`) do serve an
image today, but they are Google's *rendered* copy, not your file — no compression control, the whole
folder must stay public, if you ever change a sharing setting or move a file every photo on the site
breaks at once, and Google starts returning "quota exceeded" errors once a page gets real traffic.
For a public business site the photos belong in the repository. (The Amausi house photos were pulled
out of your Drive folder on 2026-11-05 and committed here, already renamed and compressed.)

**Then:**

1. Copy the files into `public/photos/`.
2. Commit and push (or upload them through github.com: *Add file → Upload files*, typing
   `public/photos/` into the filename box if you do them one at a time).
3. Reference them in the listing with a leading slash:

```ts
images: [
  "/photos/amausi-house/1-1-front.jpg",
  "/photos/amausi-house/1-2-living.jpg",
  "/photos/amausi-house/2-1-bedroom.jpg",
],
```

**The first image is the cover** shown on the card everywhere on the site — so make it the best
exterior/front shot, not a bathroom.

Putting photos in a subfolder per property (`/photos/amausi-house/…`) keeps things tidy once you have
several listings.

---

## 3 · Naming — your idea, slightly improved

Your proposal (`1_room` = ground floor room, `2_kitchen` = first-floor kitchen) is the right
instinct, but it has one problem: **the leading number also decides the order** the photos appear
in. If floor comes first, every ground-floor photo groups together, which is good, but within a floor
they sort alphabetically — so `bathroom` comes before `living`, which is not how anyone walks
through a house.

So use **three parts**: `floor - sequence - what`

```
1-1-front.jpg        ground floor · shot 1 · the front elevation
1-2-parking.jpg      ground floor · shot 2 · parking / gate
1-3-living.jpg       ground floor · shot 3 · living room
1-4-kitchen.jpg      ground floor · shot 4 · kitchen
1-5-stairs.jpg       ground floor · shot 5 · staircase
2-1-bedroom.jpg      first floor · shot 1 · bedroom
2-2-bedroom.jpg      first floor · shot 2 · second bedroom
2-3-balcony.jpg      first floor · shot 3 · balcony
t-1-terrace.jpg       terrace  (t = terrace)
```

- **floor:** `1` = ground, `2` = first floor, `3` = second floor, `t` = terrace, `o` = outside
- **sequence:** the order within that floor, so the gallery reads like a walk through the house
- **what:** the room, in lowercase with hyphens

**The site reads these filenames automatically.** `1-4-kitchen.jpg` becomes the caption
**"Ground floor · Kitchen"** shown on the photo and on hover over each thumbnail, and the same text
is used as the `alt` attribute — which is what Google Image Search reads and what a screen reader
speaks. In Hindi the floor label switches automatically (**ग्राउंड फ्लोर · Kitchen**); the room word
stays English unless you tell me the Hindi names you want.

If a filename doesn't follow the pattern, nothing breaks — the site just uses the filename itself as
the caption, so `front-elevation.jpg` → "Front Elevation".

---

## 4 · The Amausi house (already done — this is the reference example)

Its 24 photos were pulled from your Google Drive folder, renamed and compressed into
`public/photos/amausi-house/`, and the full-building tour (`Amausi 45L 2storey`, YouTube
`RksLCHpM5TE`) is wired in. The live array in `src/data/site.ts` is ordered as a walk-through:

```
exterior-front.jpg      exterior-front-wide.jpg   staircase-1.jpg
corridor-1.jpg          corridor-2.jpg            kitchen-1.jpg … kitchen-4.jpg
room-1.jpg … room-8.jpg bathroom-1.jpg … bathroom-4.jpg
staircase-2.jpg         rooftop-tank-room.jpg     rooftop-open.jpg
```

Note on naming: your Drive filenames (`1_kitchen`, `2_bedroom`…) encode the floor, but the
Drive folder does not expose a reliable name→file pairing, so those were **not** trustworthy. The
photos here are named by what each one actually shows (I checked every image), and I did **not**
assert which floor a room is on — that would have been a guess. Captions therefore read
"Kitchen 1", "Bathroom 3", "Rooftop Open" rather than "Ground floor · Kitchen".

If you want floor labels back and you know them, rename a file to the floor convention —
`1-kitchen-1.jpg` becomes "Ground floor · Kitchen 1", `2-bedroom-1.jpg` becomes "First floor ·
Bedroom 1" — and the caption updates automatically. Or just tell me the floors and I'll rename them.

For any *future* listing where you supply photos already organised on your machine, use the
floor-sequence-what convention from the start (`1-1-front.jpg`, `2-3-balcony.jpg`, `t-1-terrace.jpg`)
and it will caption correctly with floors.

Also worth updating in the same entry, once photos exist:

- remove the highlight `"Photographs and video being added shortly"` / `"फोटो और वीडियो जल्द जोड़े जा रहे हैं"`
- remove the description paragraph that says photos are coming
- if you know them, fill in `bedrooms`, `bathrooms` and `areaValue` + `areaUnit`
  (e.g. `areaValue: "110", areaUnit: "sqmt"`) — they appear as facts on the listing and as chips on
  the card
- `address` if you want a more precise one than "Amausi, Sarojini Nagar, Lucknow"

Then commit to `main`. GitHub Actions rebuilds in about two minutes.

---

## 5 · Before you commit, check

```
[ ] every photo is under ~350 KB and roughly 1800 px wide
[ ] every photo is landscape (portrait ones will be cropped top and bottom)
[ ] the first image in the array is the best exterior shot — it becomes the cover
[ ] filenames follow floor-sequence-what, lowercase with hyphens, no spaces
[ ] filenames are lowercase ASCII — no Hindi characters, no "&", no "#"
[ ] the YouTube video is Unlisted, not Private, and finished processing in HD
[ ] the video title and description carry the phone number and website
[ ] git status shows only public/photos/… and src/data/site.ts — no huge files
```

---

## 6 · Practical limits worth knowing

| Limit | Value | What it means for you |
|---|---|---|
| GitHub Pages site size | 1 GB | ~2,500 compressed photos. Not a real constraint. |
| GitHub Pages bandwidth | 100 GB/month (soft) | A listing with 12 photos ≈ 3 MB per full view → thousands of visits a month are fine. |
| Individual file | 100 MB hard limit | Only matters if you try to commit a video — which is why video goes on YouTube. |
| YouTube unlisted | Free, no length limit that matters | A 4K tour is fine. |

If the site ever gets heavy traffic, the easy upgrade is to move photos to Cloudflare Images or
Bunny CDN and just change the paths — the code already accepts any image URL, local or remote.
