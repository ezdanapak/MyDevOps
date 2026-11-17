#!/usr/bin/env python3
"""Generate PWA icons from docs/assets/logo.png (never overwrites the source).

Needs Pillow (system python3). Output: docs/assets/images/icons/
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "docs" / "assets" / "logo.png"
OUT = ROOT / "docs" / "assets" / "images" / "icons"

# The mark is centred near (770, 480) in the 1536x1024 logo, about 630x600 px.
CENTER = (770, 480)
CROPS = {"any": 800, "maskable": 960}  # maskable keeps the mark inside the 80% safe zone


def crop(img, side):
    half = side // 2
    left = min(max(CENTER[0] - half, 0), img.width - side)
    top = min(max(CENTER[1] - half, 0), img.height - side)
    return img.crop((left, top, left + side, top + side))


def main():
    img = Image.open(SRC).convert("RGBA")
    OUT.mkdir(parents=True, exist_ok=True)
    for purpose, side in CROPS.items():
        square = crop(img, side)
        for size in (192, 512):
            name = f"icon-{size}.png" if purpose == "any" else f"icon-maskable-{size}.png"
            square.resize((size, size), Image.LANCZOS).save(OUT / name, optimize=True)
            print("wrote", OUT / name)


if __name__ == "__main__":
    main()
