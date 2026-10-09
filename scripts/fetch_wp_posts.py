#!/usr/bin/env python3
"""Fetch all WordPress posts from falishamanpower.com, clean the Elementor
content down to structured blocks, and write scripts/wp-posts.json for the
Payload import route to consume."""
import urllib.request, json, re, html, sys, os
from html.parser import HTMLParser

UA = {'User-Agent': 'Mozilla/5.0'}
BASE = "https://falishamanpower.com/wp-json/wp/v2/posts"
OUT = sys.argv[1] if len(sys.argv) > 1 else "wp-posts.json"

def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=40) as r:
        return json.load(r)

BLOCK_TAGS = {'h2', 'h3', 'h4', 'p', 'li'}
SKIP_SUBSTR = ('elementor-button', 'read more', 'share this', 'related post',
               'leave a comment', 'your email', 'post comment', 'whatsapp')

class BlockParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.blocks = []
        self.stack = []        # open block tags
        self.buf = []          # text for current block
        self.cur = None        # current block tag

    def handle_starttag(self, tag, attrs):
        if tag in BLOCK_TAGS and self.cur is None:
            self.cur = 'p' if tag == 'li' else tag
            self.buf = []

    def handle_endtag(self, tag):
        t = 'p' if tag == 'li' else tag
        if self.cur and t == self.cur:
            text = html.unescape(''.join(self.buf))
            text = re.sub(r'\s+', ' ', text).strip()
            if text and len(text) > 1:
                low = text.lower()
                if not any(s in low for s in SKIP_SUBSTR):
                    self.blocks.append({'tag': self.cur, 'text': text})
            self.cur = None
            self.buf = []

    def handle_data(self, data):
        if self.cur is not None:
            self.buf.append(data)

def clean_blocks(content_html, title):
    content_html = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', content_html, flags=re.S | re.I)
    p = BlockParser()
    try:
        p.feed(content_html)
    except Exception:
        pass
    blocks = p.blocks
    # drop a leading heading that just repeats the title
    norm = lambda s: re.sub(r'[^a-z0-9]', '', s.lower())
    if blocks and blocks[0]['tag'].startswith('h') and norm(blocks[0]['text']) == norm(title):
        blocks = blocks[1:]
    # dedupe consecutive identical blocks
    out = []
    for b in blocks:
        if out and out[-1]['text'] == b['text']:
            continue
        # skip tiny paragraph fragments that are nav/labels
        if b['tag'] == 'p' and len(b['text'].split()) < 3:
            continue
        out.append(b)
    return out

def strip(s):
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', html.unescape(s or ''))).strip()

posts = []
page = 1
while True:
    try:
        d = get(f"{BASE}?per_page=100&page={page}&status=publish&_embed=1")
    except urllib.error.HTTPError as e:
        if e.code == 400:
            break
        raise
    if not d:
        break
    for p in d:
        title = strip(p['title']['rendered'])
        excerpt = strip(p.get('excerpt', {}).get('rendered', ''))
        img = ''
        emb = p.get('_embedded', {})
        fm = emb.get('wp:featuredmedia')
        if fm and isinstance(fm, list) and fm[0].get('source_url'):
            md = fm[0].get('media_details', {}).get('sizes', {})
            # prefer a reasonably large size
            for pref in ('large', 'medium_large', 'tx-1920x600-thumb', 'full'):
                if pref in md and md[pref].get('source_url'):
                    img = md[pref]['source_url']; break
            if not img:
                img = fm[0]['source_url']
        cats = []
        for grp in emb.get('wp:term', []) or []:
            for t in grp:
                n = t.get('name')
                if n and n.lower() not in ('uncategorized',):
                    cats.append(n)
        blocks = clean_blocks(p['content']['rendered'], title)
        meta_desc = excerpt or (blocks[0]['text'] if blocks else '')
        posts.append({
            'slug': p['slug'],
            'title': title,
            'date': p.get('date'),
            'image': img,
            'categories': cats,
            'metaTitle': f"{title} | Falisha Manpower"[:60] if len(title) > 50 else f"{title} | Falisha Manpower",
            'metaDescription': meta_desc[:155],
            'blocks': blocks,
        })
    print(f"page {page}: {len(d)} posts (total {len(posts)})", file=sys.stderr)
    if len(d) < 100:
        break
    page += 1

os.makedirs(os.path.dirname(OUT) or '.', exist_ok=True)
with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=0)
# stats
empty = sum(1 for p in posts if not p['blocks'])
noimg = sum(1 for p in posts if not p['image'])
print(f"WROTE {len(posts)} posts -> {OUT} | no-blocks: {empty} | no-image: {noimg}", file=sys.stderr)
