#!/usr/bin/env python3
"""
Generates PNG launch images for all modern iPhone screen sizes.
Uses only Python standard library - no external dependencies needed.
These images are the most universally compatible way to prevent
letterboxing in sideloaded/unsigned iOS apps.
"""
import struct
import zlib
import json
import os

# Dark background color: #0D1529 (matches the app's dark theme)
R, G, B = 13, 21, 41


def make_png(width, height, r, g, b):
    """Create a minimal valid PNG with a solid color. Pure Python, no deps."""

    def chunk(tag, data):
        buf = tag + data
        return struct.pack('>I', len(data)) + buf + struct.pack('>I', zlib.crc32(buf) & 0xffffffff)

    # PNG signature
    out = b'\x89PNG\r\n\x1a\n'
    # IHDR: width, height, 8-bit depth, RGB color type=2
    out += chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0))
    # IDAT: raw scanlines, each prefixed with filter byte 0 (None)
    raw = b''.join(b'\x00' + bytes([r, g, b]) * width for _ in range(height))
    out += chunk(b'IDAT', zlib.compress(raw, 1))
    # IEND
    out += chunk(b'IEND', b'')
    return out


# Define all iPhone screen sizes needed for full-screen rendering
# Format: (filename, width, height, scale, subtype description)
IMAGES = [
    # iPhone SE / 8 / 7 / 6s
    ("launch-750x1334.png",  750,  1334, "2x", "667h"),
    # iPhone 8 Plus / 7 Plus / 6s Plus
    ("launch-1242x2208.png", 1242, 2208, "3x", "736h"),
    # iPhone X / XS / 11 Pro / 12 mini / 13 mini
    ("launch-1125x2436.png", 1125, 2436, "3x", "2436h"),
    # iPhone XR / 11
    ("launch-828x1792.png",  828,  1792, "2x", "1792h"),
    # iPhone XS Max / 11 Pro Max
    ("launch-1242x2688.png", 1242, 2688, "3x", "2688h"),
    # iPhone 12 / 12 Pro / 13 / 13 Pro / 14
    ("launch-1170x2532.png", 1170, 2532, "3x", "2532h"),
    # iPhone 12 Pro Max / 13 Pro Max / 14 Plus
    ("launch-1284x2778.png", 1284, 2778, "3x", "2778h"),
    # iPhone 14 Pro
    ("launch-1179x2556.png", 1179, 2556, "3x", "2556h"),
    # iPhone 14 Pro Max / 15 Plus / 16 Plus
    ("launch-1290x2796.png", 1290, 2796, "3x", "2796h"),
    # iPhone 15 / 15 Pro / 16 / 16 Pro
    ("launch-1179x2556.png", 1179, 2556, "3x", "2556h"),
    # iPhone 16 Pro Max
    ("launch-1320x2868.png", 1320, 2868, "3x", "2868h"),
]

# Remove duplicates (same filename)
seen = set()
unique_images = []
for img in IMAGES:
    if img[0] not in seen:
        seen.add(img[0])
        unique_images.append(img)

# Output directory
out_dir = os.path.join("SmokeQuit", "Assets.xcassets", "LaunchImage.launchimage")
os.makedirs(out_dir, exist_ok=True)

print(f"Writing PNG files to: {out_dir}")

# Generate PNGs
for filename, w, h, scale, subtype in unique_images:
    data = make_png(w, h, R, G, B)
    path = os.path.join(out_dir, filename)
    with open(path, 'wb') as f:
        f.write(data)
    print(f"  Written: {filename} ({w}x{h})")

# Build Contents.json for the LaunchImage asset
entries = []
for filename, w, h, scale, subtype in unique_images:
    entries.append({
        "extent": "full-screen",
        "filename": filename,
        "idiom": "iphone",
        "minimum-system-version": "8.0",
        "orientation": "portrait",
        "scale": scale,
        "subtype": subtype
    })

contents = {
    "images": entries,
    "info": {
        "author": "xcode",
        "version": 1
    }
}

contents_path = os.path.join(out_dir, "Contents.json")
with open(contents_path, 'w') as f:
    json.dump(contents, f, indent=2)
print(f"  Written: Contents.json")

print("Done! Launch images generated successfully.")
