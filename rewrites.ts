import type { NextConfig } from 'next'
import { NEW_PATH_BY_LEGACY } from './src/data/legacyUrlMap'

// Serve the preserved old WordPress URLs directly (no redirect): each old URL is
// internally rewritten onto its real new route, so the page renders with the old
// URL kept in the address bar. `beforeFiles` guarantees these win over any other
// route. Canonicals + sitemaps point back at the old URL (see src/data/legacyUrlMap.ts),
// so the old, already-indexed URL stays the one Google keeps.
export const rewrites: NextConfig['rewrites'] = async () => ({
  beforeFiles: Object.entries(NEW_PATH_BY_LEGACY).map(([source, destination]) => ({
    source,
    destination,
  })),
})
