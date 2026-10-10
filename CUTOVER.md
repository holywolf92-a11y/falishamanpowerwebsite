# Replacing falishamanpower.com with the new site — cutover guide

The new site (currently at **https://falisha.up.railway.app**) is content-complete and
ready to become **falishamanpower.com**. This is the checklist to switch over without
losing SEO.

## ✅ Already done
- All content migrated: 28 destination countries, 18 industries, 170 blog posts, services, FAQ.
- New royal-blue design + per-page SEO titles/descriptions + FAQ schema.
- **301 redirects** from every old WordPress URL → its new page (`redirects.ts` +
  `src/data/legacy-redirects.json`, 316 rules). Regenerate with
  `python scripts/gen_legacy_redirects.py` if the URL set changes.

## 1. Point the domain at the new site (you do the DNS)
1. In the **Railway dashboard** → `falisha-website` service → **Settings → Networking →
   Custom Domain**, add **`falishamanpower.com`** and **`www.falishamanpower.com`**.
   Railway will display the exact DNS target (a `…up.railway.app` value) for each.
2. At your DNS provider (wherever falishamanpower.com’s DNS is managed), add the records
   Railway shows:
   - **`www`** → `CNAME` → the Railway target.
   - **apex `falishamanpower.com`** → an **ALIAS / ANAME** record → the Railway target
     (most providers; e.g. Cloudflare = CNAME with flattening). Use exactly what the
     Railway panel instructs for the apex.
3. ~24 h before switching, **lower the DNS TTL** (e.g. to 300 s) so propagation — and any
   rollback — is fast.
4. Railway **auto-provisions SSL** once DNS resolves to it (give it a few minutes).

## 2. Flip the site’s canonical URL
Once `falishamanpower.com` resolves to the new site:
- In Railway, set **`NEXT_PUBLIC_SERVER_URL=https://falishamanpower.com`** on the
  `falisha-website` service, then redeploy. This makes canonicals, Open Graph tags and the
  XML sitemap use the real domain instead of the railway.app URL.

## 3. SEO after cutover
- Submit **`https://falishamanpower.com/sitemap.xml`** in **Google Search Console**.
- The domain itself is unchanged (still falishamanpower.com), so **no “Change of Address”**
  is needed — Google sees a redesign, and the 301s map old pages to new.
- Watch GSC **Coverage** + **Performance** for 2–4 weeks; a brief dip then recovery is normal.

## 4. Safety
- **Keep the old WordPress site/host up** for a few weeks as rollback, and because the
  migrated blog posts currently **hotlink their images** from falishamanpower.com. Re-host
  images on cloud storage (Cloudflare R2 / S3) before retiring the old host — see the media
  follow-up.
- Rollback = point DNS back to the old host (fast if TTL was lowered).

## Notes
- Non-core country pages (~87) 301 to the `/countries` hub; the 28 core markets, 18
  industries and all 170 posts map to their specific new pages.
- Old post URLs were flat (`/slug`); they now live at `/posts/slug` and are redirected.
