import re

html = open('/tmp/booksy.html', encoding='utf-8', errors='ignore').read()
pat = re.compile(r'https://[a-zA-Z0-9.\-]*booksy[a-zA-Z0-9.\-]*/[^\s"\'\\<>)]+?\.(?:jpe?g|png|webp)[^\s"\'\\<>)]*')
imgs = list(dict.fromkeys(pat.findall(html)))
print('BOOKSY IMGS:', len(imgs))
for i in imgs[:30]:
    print(' ', i[:160])

ld = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
print('JSON-LD blocks:', len(ld))
for b in ld[:4]:
    print('LD:', b[:500].replace('\n', ' '))
    print('---')
