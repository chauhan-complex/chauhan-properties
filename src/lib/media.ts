/**
 * Media helpers.
 *
 * Naming convention for property photos (see MEDIA-GUIDE.md):
 *
 *   <floor>-<sequence>-<what>.jpg
 *
 *   1-1-front.jpg      ground floor, first shot, the front
 *   1-2-living.jpg     ground floor, living room
 *   2-1-bedroom.jpg    first floor, bedroom
 *   3-1-terrace.jpg    terrace
 *
 * The floor number becomes a readable label, the rest becomes the caption, and
 * the order in `images` decides the gallery order — so the numbers also make the
 * files sort into a natural walking tour.
 */

const FLOOR_EN: Record<string, string> = {
  "0": "Basement",
  "1": "Ground floor",
  "2": "First floor",
  "3": "Second floor",
  "4": "Third floor",
  t: "Terrace",
  r: "Roof",
  o: "Outside",
};

const FLOOR_HI: Record<string, string> = {
  "0": "तहखाना",
  "1": "ग्राउंड फ्लोर",
  "2": "पहली मंज़िल",
  "3": "दूसरी मंज़िल",
  "4": "तीसरी मंज़िल",
  t: "छत",
  r: "छत",
  o: "बाहर",
};

function titleCase(value: string) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** "public/photos/1-2-living.jpg" → { floor: "Ground floor", caption: "Living" } */
export function captionFromFilename(
  src: string,
  lang: "en" | "hi" = "en",
): { floor: string; caption: string; full: string } {
  const base = decodeURIComponent((src || "").split("?")[0].split("#")[0])
    .split("/")
    .pop() ?? "";
  const stem = base.replace(/\.[a-z0-9]+$/i, "");
  const match = stem.match(/^([0-9trTo])(?:-|_)(\d+)?(?:-|_)?(.*)$/i);

  if (!match) {
    const caption = titleCase(stem.replace(/[-_]+/g, " "));
    return { floor: "", caption, full: caption };
  }

  const floors = lang === "hi" ? FLOOR_HI : FLOOR_EN;
  const floor = floors[match[1].toLowerCase()] ?? "";
  const caption = titleCase((match[3] || stem).replace(/[-_]+/g, " "));
  const full = floor && caption ? `${floor} · ${caption}` : caption || floor;
  return { floor, caption, full };
}

/** One `videoUrl` string may hold several links, separated by a newline or comma. */
export function videoList(videoUrl: string | null | undefined): string[] {
  if (!videoUrl) return [];
  return videoUrl
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}
