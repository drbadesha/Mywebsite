"""Split the single-file artifact into a structured static site.

Keeps the exact cascade order of every <style> block and the exact execution
order/position of every <script> block, so the site behaves the same.
"""
import base64, hashlib, os, re, shutil, sys

SRC = sys.argv[1]          # downloaded artifact folder (index.html + images)
OUT = sys.argv[2]          # repository root
s = open(os.path.join(SRC, 'index.html'), encoding='utf-8').read()

BLOCK = re.compile(r'<(style|script)([^>]*)>(.*?)</\1>', re.S)

# ---------------------------------------------------------------- images
IMG_MAP = {}   # old relative path -> new path from site root
for root, _, files in os.walk(SRC):
    for f in files:
        rel = os.path.relpath(os.path.join(root, f), SRC).replace(os.sep, '/')
        if rel == 'index.html':
            continue
        if rel.startswith('img/'):
            new = 'assets/images/content/' + rel[4:]
        elif rel.startswith('clinic/'):
            new = 'assets/images/clinic/' + rel[7:]
        else:
            new = 'assets/images/pages/' + rel
        IMG_MAP[rel] = new
        dst = os.path.join(OUT, new)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copyfile(os.path.join(SRC, rel), dst)
# referenced but not supplied with the artifact
IMG_MAP['hero-clinic.mp4'] = 'assets/video/hero-clinic.mp4'

INLINE = {}  # sha -> new path
def extract_data_uris(text):
    def rep(m):
        kind, b64 = m.group(1), m.group(2)
        raw = base64.b64decode(b64)
        h = hashlib.sha256(raw).hexdigest()[:12]
        ext = {'png': 'png', 'webp': 'webp', 'jpeg': 'jpg', 'jpg': 'jpg', 'gif': 'gif'}[kind]
        if h not in INLINE:
            path = f'assets/images/embedded/{h}.{ext}'
            os.makedirs(os.path.join(OUT, os.path.dirname(path)), exist_ok=True)
            open(os.path.join(OUT, path), 'wb').write(raw)
            INLINE[h] = path
        return '\x00' + INLINE[h] + '\x00'   # marker, resolved per file type
    return re.sub(r'data:image/(png|webp|jpe?g|gif);base64,([A-Za-z0-9+/=]+)', rep, text)

def rewrite_paths(text, prefix):
    """prefix '' for html/js (resolved against the page), '../../' for css."""
    text = extract_data_uris(text)
    text = re.sub('\x00(assets/[^\x00]+)\x00',
                  lambda m: prefix + m.group(1), text)
    for old in sorted(IMG_MAP, key=len, reverse=True):
        text = re.sub(r'(?<![\w/.-])' + re.escape(old) + r'(?![\w.-])',
                      prefix + IMG_MAP[old], text)
    return text

# ---------------------------------------------------------------- naming
CSS_GROUP = [  # (first block offset, file) — every block from offset on goes in file
    (0,       '00-reset.css'),
    (1665,    '01-early-overrides.css'),
    (60134,   '02-base.css'),
    (424000,  '03-layers-v6-v31.css'),
    (535000,  '04-page-additions.css'),
    (1801000, '05-nov-updates.css'),
    (1851000, '06-design-layers.css'),
]
JS_NAMES = {
    32895: 'data/tile-gradients.js',
    33745: 'data/treatment-pages-1.js',
    49730: 'data/treatment-pages-2.js',
    424263: 'boot/intro-splash.js',
    424805: 'boot/legacy-protocol-redirects.js',
    445853: 'boot/iv-booking-drip-lounge.js',
    450202: 'boot/retired-lab-redirects.js',
    450474: 'boot/hormone-testing-redirect.js',
    499254: 'boot/intro-logo.js',
    546466: 'features/shop-products.js',
    749343: 'data/goal-protocol-prices.js',
    754958: 'app.js',
    1563078: 'features/uniform-spacing.js',
    1566715: 'features/motion.js',
    1572104: 'features/section-order.js',
    1573292: 'features/philosophy-orbit.js',
    1574300: 'features/page-hero-photos.js',
    1575859: 'features/tickers.js',
    1577945: 'features/liveo2-promo.js',
    1580077: 'features/hormone-symptom-check.js',
    1589012: 'features/phenoage-calculator.js',
    1592648: 'features/soft-hyphens.js',
    1593533: 'data/treatment-content.js',
    1729353: 'features/arrc-drip-details.js',
    1737373: 'features/diagnostics-dropdown.js',
    1739516: 'layers/myrocky-enhancements.js',
    1751775: 'layers/v3-audit.js',
    1768816: 'layers/v5-additions.js',
    1789850: 'features/lab-test-deeplink.js',
    1790389: 'features/quiz-redirect.js',
    1791557: 'layers/v29-usability.js',
    1799264: 'layers/v30-tickers.js',
    1807469: 'features/mobile-find-sheet.js',
    1815422: 'features/six-pillars.js',
    1828786: 'features/marker-explorer.js',
    1830897: 'features/arrc-hero-photo.js',
    1832224: 'features/other-areas-tiles.js',
    1833413: 'features/energy-area-link.js',
    1846628: 'layers/design6-motion.js',
    1872426: 'layers/v4-design.js',
    1903821: 'layers/v6-diagnostics.js',
}

css_out = {}            # file -> list of chunks, in order
head_js, body = [], []  # body: list of html strings
jsonld = []
seen_reset = False
pos = 0
BODY_START = 424263     # first script that belongs to <body> (everything before only sets globals)

def html_gap(text):
    text = re.sub(r'<!doctype[^>]*>|</?html[^>]*>|</?head>|</?body>', '', text, flags=re.I)
    text = re.sub(r'<meta charset[^>]*>|<meta name="?viewport"?[^>]*>', '', text, flags=re.I)
    return text

head_meta = []
for m in list(BLOCK.finditer(s)) + [None]:
    a = m.start() if m else len(s)
    gap = html_gap(s[pos:a])
    if gap.strip():
        if a <= 60134:   # title, description, font links: head material
            head_meta.append(gap.strip())
        else:
            body.append(rewrite_paths(gap, ''))
    if not m:
        break
    pos = m.end()
    kind, attrs, content = m.group(1), m.group(2), m.group(3)
    if kind == 'style':
        if content.strip().startswith(':root{color-scheme:light}body{margin:0'):
            if seen_reset and len(content) < 300:
                continue          # duplicate host reset
            seen_reset = True
        fname = [f for off, f in CSS_GROUP if off <= a][-1]
        label = attrs.strip() or f'block @{a}'
        css_out.setdefault(fname, []).append(f'/* ---- source {label} ---- */\n' + rewrite_paths(content.strip('\n'), '../../') + '\n')
        continue
    if 'ld+json' in attrs:
        jsonld.append(f'<script type="application/ld+json">{content.strip()}</script>')
        continue
    name = JS_NAMES[a]
    path = f'assets/js/{name}'
    os.makedirs(os.path.dirname(os.path.join(OUT, path)), exist_ok=True)
    open(os.path.join(OUT, path), 'w', encoding='utf-8').write(rewrite_paths(content.strip('\n'), '') + '\n')
    tag = f'<script src="{path}"{attrs.replace("id=","data-src-id=") if attrs.strip() else ""}></script>'
    (head_js if a < BODY_START else body).append(tag + '\n')

os.makedirs(os.path.join(OUT, 'assets/css'), exist_ok=True)
for f, chunks in css_out.items():
    open(os.path.join(OUT, 'assets/css', f), 'w', encoding='utf-8').write('\n'.join(chunks))

css_links = '\n'.join(f'<link rel="stylesheet" href="assets/css/{f}">' for _, f in CSS_GROUP if f in css_out)
doc = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
{chr(10).join(head_meta)}
{chr(10).join(jsonld)}
{css_links}
{''.join(head_js)}</head>
<body>
{''.join(body).strip()}
</body>
</html>
'''
open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8').write(doc)
print('css', {k: sum(map(len, v)) for k, v in css_out.items()})
print('embedded images', len(INLINE), 'index.html', len(doc))
