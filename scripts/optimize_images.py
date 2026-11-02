"""Optimize the real barbershop photos into web-ready WebP assets."""
from PIL import Image, ImageEnhance
import os

SRC = '/home/z/my-project/download/assets-raw'
OUT = '/home/z/my-project/public/img'
os.makedirs(OUT, exist_ok=True)

PHOTOS = {
    'interior': f'{SRC}/maps-cover.jpg',      # interior amplio (foto de portada de Google Maps)
    'silla': f'{SRC}/candidates/c00.jpg',     # silla de barberia + interior
    'corte': f'{SRC}/candidates/c01.jpg',     # corte en accion
    'fachada': f'{SRC}/candidates/c12.jpg',   # fachada con neon rojo
    'calle': f'{SRC}/streetview.jpg',         # calle / exterior
}

# output sizes per role
PLAN = {
    'interior': [('hero-1800', 1800), ('hero-1000', 1000), ('g-900', 900), ('t-560', 560)],
    'silla':    [('g-900', 900), ('t-560', 560)],
    'corte':    [('g-900', 900), ('t-560', 560)],
    'fachada':  [('g-900', 900), ('t-560', 560)],
    'calle':    [('g-900', 900), ('t-560', 560), ('map-ph-800', 800)],
}

total = 0
for name, path in PHOTOS.items():
    im = Image.open(path).convert('RGB')
    # slight saturation boost for the dark site look
    im = ImageEnhance.Color(im).enhance(1.06)
    im = ImageEnhance.Contrast(im).enhance(1.03)
    for label, w in PLAN[name]:
        ratio = w / im.width
        if ratio < 1:
            im2 = im.resize((w, max(1, round(im.height * ratio))), Image.LANCZOS)
        else:
            im2 = im.copy()
        out_path = f'{OUT}/{name}-{label}.webp'
        im2.save(out_path, 'WEBP', quality=82, method=6)
        kb = os.path.getsize(out_path) // 1024
        total += kb
        print(f'{name}-{label}.webp  {im2.size}  {kb}KB')
print('TOTAL KB:', total)

# report original aspect ratios for layout planning
for name, path in PHOTOS.items():
    w, h = Image.open(path).size
    print(f'{name}: {w}x{h}  ratio={w/h:.3f}')
