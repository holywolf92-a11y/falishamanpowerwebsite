#!/usr/bin/env python3
"""Generate 301 redirect mappings (old falishamanpower.com WordPress URLs -> new
site paths) into src/data/legacy-redirects.json for next.config's redirects()."""
import urllib.request, json, sys, os

UA = {'User-Agent': 'Mozilla/5.0'}
def get(u):
    req = urllib.request.Request(u, headers=UA)
    with urllib.request.urlopen(req, timeout=40) as r:
        return json.load(r)

# Old country-slug fragment -> new /countries/<slug> (only the 28 core markets).
COUNTRY = {
    'saudi-arabia': 'saudi-arabia', 'uae': 'united-arab-emirates', 'qatar': 'qatar', 'kuwait': 'kuwait', 'bahrain': 'bahrain', 'oman': 'oman',
    'turkey': 'turkey', 'romania': 'romania', 'poland': 'poland', 'croatia': 'croatia', 'hungary': 'hungary', 'serbia': 'serbia', 'portugal': 'portugal',
    'greece': 'greece', 'germany': 'germany', 'italy': 'italy', 'cyprus': 'cyprus', 'lithuania': 'lithuania',
    'japan': 'japan', 'korea': 'south-korea', 'malaysia': 'malaysia',
    'azerbaijan': 'azerbaijan', 'kazakhstan': 'kazakhstan', 'uzbekistan': 'uzbekistan', 'georgia': 'georgia',
    'iraq': 'iraq', 'libya': 'libya',
}
# Old industry page slug -> new /industries/<slug> (exact new slugs from the API).
INDUSTRY = {
    'medical-staff-recruitment-from-pakistan': 'healthcare',
    'it-and-telecommunication-recruitment-from-pakistan': 'information-technology',
    'oil-gas-industry-recruitment-from-pakistan': 'oil--gas',
    'construction-staff-recruitment-from-pakistan': 'construction',
    'textile-industry-recruitment-from-pakistan': 'textile',
    'banking-staff-recruitment-from-pakistan': 'banking--finance',
    'engineering-sector-staff-recruitment-from-pakistan': 'engineering',
    'security-staff-recruitment-from-pakistan': 'security',
    'agriculture-staff-recruitment-from-pakistan': 'agriculture',
    'hotels-restaurants-staff-recruitment-from-pakistan': 'hospitality',
    'power-energy-sector-recruitment-from-pakistan': 'power--energy',
    'educational-staff-recruitment-from-pakistan': 'education',
    'fmcg-sector-staff-recruitment-from-pakistan': 'fmcg',
    'livestock-industry-recruitment-from-pakistan': 'livestock',
    'steel-fabrication-sector-recruitment-from-pakistan': 'steel-fabrication',
    'transportation-sector-recruitment-from-pakistan': 'transportation',
    'travel-and-tourism-industry-recruitment-from-pakistan': 'travel--tourism',
}
# Core / misc pages -> best-match new path.
CORE = {
    'contact-us': '/contact', 'submit-cv': '/upload-cv', 'blog': '/posts', 'about-us': '/our-team',
    'recruitment-process': '/hire-from-pakistan', 'recruitment-categories': '/industries', 'industries-we-serve': '/industries',
    'gallery': '/', 'visa-processing-agency-for-saudi-arabia': '/services', 'best-recruitment-agency-pakistan': '/',
    'pakistan-overseas-employment-promoters-association': '/hire-from-pakistan',
    'international-organization-for-standardization': '/hire-from-pakistan',
    'government-registered': '/hire-from-pakistan',
    'rawalpindi-chamber-of-commerce-and-industry': '/hire-from-pakistan',
}
SKIP = {'services'}  # same path + equivalent content -> no redirect needed

redirects = []
seen = set()
def add(src, dst):
    if src in seen or src == dst:
        return
    seen.add(src)
    redirects.append({'source': src, 'destination': dst})

# Pages
slugs = []
for pg in (1, 2):
    d = get(f"https://falishamanpower.com/wp-json/wp/v2/pages?per_page=100&page={pg}&status=publish&_fields=slug")
    slugs += [p['slug'] for p in d]

unknown = []
for s in slugs:
    src = '/' + s
    if s in SKIP:
        continue
    if s in CORE:
        add(src, CORE[s])
    elif s in INDUSTRY:
        add(src, '/industries/' + INDUSTRY[s])
    elif s.startswith('recruitment-agency-for-') and s.endswith('-in-pakistan'):
        frag = s[len('recruitment-agency-for-'):-len('-in-pakistan')]
        add(src, '/countries/' + COUNTRY[frag] if frag in COUNTRY else '/countries')
    elif s.startswith('recruitment-agency-in-pakistan-for-'):
        frag = s[len('recruitment-agency-in-pakistan-for-'):]
        add(src, '/countries/' + COUNTRY[frag] if frag in COUNTRY else '/countries')
    else:
        unknown.append(s)
        add(src, '/')

# Posts: old flat /<slug> -> /posts/<slug>
posts = json.load(open('src/data/wp-posts.json', encoding='utf-8'))
for p in posts:
    add('/' + p['slug'], '/posts/' + p['slug'])

os.makedirs('src/data', exist_ok=True)
json.dump(redirects, open('src/data/legacy-redirects.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
print(f"wrote {len(redirects)} redirects; {len(unknown)} unknown page(s) -> /: {unknown}", file=sys.stderr)
