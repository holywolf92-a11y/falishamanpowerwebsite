import legacyRedirects from './legacy-redirects.json'

// --- Preserve the original WordPress URLs for pages that map 1:1 to a new page ---
//
// The client wants the old, already-indexed URLs (e.g.
// /recruitment-agency-in-pakistan-for-bahrain) to stay the live, canonical URL of
// their page instead of 301-ing to the new short path (/countries/bahrain).
//
// For every old→new entry whose destination is a single country, post or industry
// page, we:
//   • rewrite the old URL to the new route (serves the page, URL unchanged)       — rewrites.ts
//   • drop its 301 (it would otherwise redirect away)                              — redirects.ts
//   • set the page's canonical + sitemap entry to the OLD URL                      — pages + sitemaps
//
// Pages that are NOT 1:1 keep 301s: merged/moved URLs, hub redirects, and any new
// page that has more than one old URL (e.g. the UK page = England + Scotland
// consolidation — it keeps its new URL and both old URLs 301 to it).

const ONE_TO_ONE_PREFIXES = ['/countries/', '/posts/', '/industries/']

// Top-level route segments an old URL must never shadow (post old URLs live at the
// site root, so a stray collision would hijack a real page).
const RESERVED = new Set([
  'countries', 'posts', 'industries', 'services', 'contact', 'about', 'faq',
  'search', 'profile', 'hire-from-pakistan', 'upload-cv', 'partner-with-us',
  'fill-a-vacancy', 'our-team', 'privacy', 'admin', 'next', 'api', 'blog',
])

type Entry = { source: string; destination: string }

function build() {
  const entries = legacyRedirects as Entry[]
  const is11 = (dest: string) => ONE_TO_ONE_PREFIXES.some((p) => dest.startsWith(p))

  // Count old URLs per destination so we can skip consolidations (>1 old URL).
  const counts: Record<string, number> = {}
  for (const r of entries) if (is11(r.destination)) counts[r.destination] = (counts[r.destination] || 0) + 1

  const newToOld: Record<string, string> = {}
  const oldToNew: Record<string, string> = {}
  for (const r of entries) {
    if (!is11(r.destination)) continue
    if (counts[r.destination] !== 1) continue // consolidation → keep 301
    // A few imported posts have percent-encoded emoji/Arabic in the old URL whose
    // destination slug no longer matches the real post slug (the import stripped the
    // '%'). Don't try to preserve those — rewriting would point at a dead route; they
    // keep a (corrected) 301 instead. See redirects.ts.
    if (r.destination.includes('%')) continue
    const firstSegment = r.source.replace(/^\//, '').split('/')[0]
    if (RESERVED.has(firstSegment)) continue // never shadow a real route
    newToOld[r.destination] = r.source
    oldToNew[r.source] = r.destination
  }
  return { newToOld, oldToNew }
}

const { newToOld, oldToNew } = build()

/** new path (`/countries/bahrain`) → original old URL (`/recruitment-agency-in-pakistan-for-bahrain`). */
export const LEGACY_URL_BY_PATH: Record<string, string> = newToOld

/** original old URL → new route, used to rewrite old URLs onto the real page. */
export const NEW_PATH_BY_LEGACY: Record<string, string> = oldToNew

/** Returns the old URL for a new path if one exists, else the new path unchanged. */
export function canonicalPath(newPath: string): string {
  return LEGACY_URL_BY_PATH[newPath] ?? newPath
}
