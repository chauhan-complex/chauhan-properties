#!/usr/bin/env python3
"""
Rename + compress property photos into the convention this website understands.

    <floor>-<sequence>-<what>.jpg

    1-1-front.jpg     ground floor, first shot, the front
    2-3-kitchen.jpg   first floor, third shot, kitchen
    t-1-rooftop.jpg   terrace / roof
    o-1-gate.jpg      outside

The floor digit becomes a caption label automatically (1 = Ground floor,
2 = First floor, 3 = Second floor, t = Terrace, o = Outside), so a file named
2-3-kitchen.jpg shows the caption "First floor · Kitchen 3".

It converts your usual Drive/phone naming (1_kitchen.JPG, front_2.JPG,
2_bedroom-sideview.JPG) into that form, adds a sequence number per floor, and
optionally resizes + recompresses so the site stays fast.

Usage
-----
    python tools/rename-photos.py SOURCE_FOLDER
    python tools/rename-photos.py SOURCE_FOLDER -o public/photos/amausi-house
    python tools/rename-photos.py SOURCE_FOLDER --resize 1800 --quality 78
    python tools/rename-photos.py SOURCE_FOLDER --dry-run      # preview only

Requires nothing but Python 3.8+. If Pillow is installed (`pip install pillow`)
it also resizes and recompresses; without Pillow it only renames.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp"}

# Leading floor codes we accept in the source name: 1_, 2_, 3_, t_, o_
FLOOR_RE = re.compile(r"^([0-9tTo])[\s_\-]+(.+)$", re.IGNORECASE)


def clean_stem(stem: str) -> str:
    """1_kitchen_widepicture -> kitchen-widepicture ; front_2 -> front-2"""
    stem = stem.strip().replace("+", "-")
    stem = re.sub(r"[\s_]+", "-", stem)
    stem = re.sub(r"-{2,}", "-", stem).strip("-")
    return stem.lower()


def split_floor(name: str) -> tuple[str, str]:
    """Return (floor_code, rest). Defaults to floor 'o' (outside) when absent."""
    stem = Path(name).stem
    m = FLOOR_RE.match(stem)
    if m:
        return m.group(1).lower(), clean_stem(m.group(2))
    return "o", clean_stem(stem)


def plan(files: list[Path]) -> list[tuple[Path, str]]:
    """Assign a per-floor sequence number so the gallery reads in order."""
    counters: dict[str, int] = {}
    out: list[tuple[Path, str]] = []
    for path in sorted(files, key=lambda p: p.name.lower()):
        floor, rest = split_floor(path.name)
        counters[floor] = counters.get(floor, 0) + 1
        out.append((path, f"{floor}-{counters[floor]}-{rest}.jpg"))
    return out


def process(src: Path, dst: Path, resize: int, quality: int) -> int:
    """Copy, and if Pillow is available resize + recompress. Returns bytes written."""
    try:
        from PIL import Image
    except ImportError:
        dst.write_bytes(src.read_bytes())
        return dst.stat().st_size

    with Image.open(src) as im:
        im = im.convert("RGB")  # drops EXIF orientation problems, flattens PNG
        if max(im.size) > resize:
            im.thumbnail((resize, resize), Image.LANCZOS)
        im.save(dst, "JPEG", quality=quality, optimize=True, progressive=True)
    return dst.stat().st_size


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("source", help="folder holding the photos to convert")
    ap.add_argument("-o", "--out", default=None, help="output folder (default: <source>/renamed)")
    ap.add_argument("--resize", type=int, default=1800, help="longest edge in px (default 1800)")
    ap.add_argument("--quality", type=int, default=78, help="JPEG quality (default 78)")
    ap.add_argument("--dry-run", action="store_true", help="print the plan and change nothing")
    args = ap.parse_args()

    source = Path(args.source).expanduser()
    if not source.is_dir():
        print(f"error: {source} is not a folder", file=sys.stderr)
        return 2

    files = [p for p in source.iterdir() if p.suffix.lower() in IMAGE_SUFFIXES]
    if not files:
        print(f"error: no images found in {source}", file=sys.stderr)
        return 2

    try:
        import PIL  # noqa: F401
        have_pil = True
    except ImportError:
        have_pil = False

    out_dir = Path(args.out).expanduser() if args.out else source / "renamed"
    mapping = plan(files)

    print(f"source : {source}  ({len(files)} images)")
    print(f"output : {out_dir}")
    print(f"resize : {args.resize}px  quality {args.quality}  "
          f"({'Pillow found — will compress' if have_pil else 'Pillow NOT installed — copy only'})")
    if not have_pil:
        print("         install it with:  pip install pillow")
    print()

    total_in = sum(p.stat().st_size for p, _ in mapping)
    total_out = 0
    for src, new_name in mapping:
        dst = out_dir / new_name
        if args.dry_run:
            print(f"  {src.name:<40} ->  {new_name}")
            total_out += src.stat().st_size
            continue
        out_dir.mkdir(parents=True, exist_ok=True)
        total_out += process(src, dst, args.resize, args.quality)
        print(f"  {src.name:<40} ->  {new_name:<34} {dst.stat().st_size/1024:6.0f} KB")

    print()
    print(f"  {total_in/1024/1024:5.1f} MB in  ->  {total_out/1024/1024:5.1f} MB out")
    if args.dry_run:
        print("  dry run — nothing written")
    else:
        print(f"  written to {out_dir}")
        print("\nNext: commit the folder, then list the files in src/data/site.ts, e.g.")
        for _, new_name in mapping[:3]:
            print(f'      "/photos/<property>/{new_name}",')
        print("      ...")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
