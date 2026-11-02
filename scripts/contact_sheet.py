"""Build a labeled contact sheet of candidate images for curation."""
from PIL import Image, ImageDraw, ImageFont
import glob, os

files = sorted(glob.glob('/home/z/my-project/download/assets-raw/candidates/c*.jpg'))
files += ['/home/z/my-project/download/assets-raw/maps-cover.jpg',
          '/home/z/my-project/download/assets-raw/streetview.jpg']

COLS, TH_W, TH_H, LABEL_H = 4, 320, 240, 26
rows = (len(files) + COLS - 1) // COLS
sheet = Image.new('RGB', (COLS * TH_W, rows * (TH_H + LABEL_H)), '#222')
draw = ImageDraw.Draw(sheet)
try:
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 16)
except Exception:
    font = ImageFont.load_default()

for idx, f in enumerate(files):
    r, c = divmod(idx, COLS)
    x0, y0 = c * TH_W, r * (TH_H + LABEL_H)
    try:
        im = Image.open(f).convert('RGB')
        im.thumbnail((TH_W - 8, TH_H - 8))
        sheet.paste(im, (x0 + (TH_W - im.width) // 2, y0 + (TH_H - im.height) // 2))
        label = os.path.basename(f) + f' | {Image.open(f).size[0]}x{Image.open(f).size[1]}'
    except Exception as e:
        label = f'{os.path.basename(f)} ERROR'
    draw.text((x0 + 6, y0 + TH_H + 4), label[:44], fill='white', font=font)

sheet.save('/tmp/contact_sheet.jpg', quality=82)
print('saved', sheet.size, 'files:', len(files))
