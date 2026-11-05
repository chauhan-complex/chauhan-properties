# Chauhan Complex photos go here

The Chauhan Complex listing (`complex` category — shops, offices, flats and godown space, offered on
rent) already has its front elevation: `exterior-front.jpg`, pulled from your Google Drive and
compressed. Add more shots the same way and they will appear in the gallery.

**To add more photos:**

1. Save them here with simple lowercase names, e.g.
   ```
   exterior-front.jpg        the building from Kanpur Road side
   exterior-signboard.jpg    the Chauhan Complex board
   shop-1.jpg                a shop unit, shutter open
   shop-2.jpg
   office-1.jpg              an office room
   godown-1.jpg              the storage/godown space
   flats-1.jpg               a flat interior
   stairs-corridor.jpg
   ```
   Compress each one first — 1800 px wide, JPEG quality ~78, under 350 KB. <https://squoosh.app>
   does this in the browser, free.
2. Commit and push this folder.
3. Open `src/data/site.ts`, find `chauhan-complex-shops-offices-flats-godown`, and add the paths to
   its `images:` array (the first entry is the cover):
   ```ts
   images: [
     "/photos/chauhan-complex/exterior-front.jpg",
     "/photos/chauhan-complex/exterior-signboard.jpg",
     "/photos/chauhan-complex/shop-1.jpg",
     "/photos/chauhan-complex/shop-2.jpg",
     "/photos/chauhan-complex/office-1.jpg",
     "/photos/chauhan-complex/godown-1.jpg",
     "/photos/chauhan-complex/flats-1.jpg",
     "/photos/chauhan-complex/stairs-corridor.jpg",
   ],
   ```
   The first entry becomes the cover photo on every card.
4. Commit and push. GitHub Actions republishes in about two minutes.

Captions are generated from the filenames, so `shop-1.jpg` reads "Shop 1" and `exterior-front.jpg`
reads "Exterior Front". If you want a floor label, name it `1-shop-1.jpg` (Ground floor · Shop 1)
or `2-office-1.jpg` (First floor · Office 1).

If you shoot a short walkthrough of the complex for the shops/godown space, upload it to YouTube as
**Unlisted** and paste the link into `videoUrl:` on the same entry — it becomes a "Watch the video
tour" button at the top of the gallery, exactly like the Amausi house.
