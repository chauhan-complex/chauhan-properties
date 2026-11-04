# Put property photos here

Files in this folder are served from the website root.

1. Save your photos here with simple names, for example:
   ```
   amausi-1000-1.jpg
   amausi-1000-2.jpg
   miranpur-pinwat-3500-1.jpg
   office-front.jpg
   ```
2. `git add . && git commit -m "add photos" && git push` — Vercel rebuilds in about a minute.
3. In **Admin → Listings → edit → Image links**, type one path per line:
   ```
   /photos/amausi-1000-1.jpg
   /photos/amausi-1000-2.jpg
   ```
   The first line becomes the cover photo on the card.

**Tips**
- Landscape photos look best (roughly 4:3 or 16:10).
- Keep each file under ~2 MB — the site resizes them automatically, but big uploads slow the push.
- For videos, paste a YouTube link (unlisted is fine) into the *Video link* box instead; large `.mp4`
  files bloat the repository.
- Until a listing has photos it shows the branded "Photographs on request / फ़ोटो माँगने पर भेजी जाती हैं"
  placeholder, which is intentional — never borrow a photo from the internet.

This README file is only here so the folder exists in Git. You can leave it in place.
