import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { canonicalPath } from '@/data/legacyUrlMap'

// Canonical production URL (matches next-sitemap.config.cjs). NEXT_PUBLIC_SERVER_URL
// overrides it at runtime/build.
const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ||
  'https://falisha.up.railway.app'

// Builds a GET handler that emits a sitemap for every published doc in a collection,
// at `${SITE_URL}${pathPrefix}/${slug}`.
export function collectionSitemap(collection: string, pathPrefix: string) {
  const load = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const results = await payload.find({
          collection: collection as never,
          overrideAccess: false,
          draft: false,
          depth: 0,
          limit: 2000,
          pagination: false,
          where: { _status: { equals: 'published' } } as never,
          select: { slug: true, updatedAt: true } as never,
        })
        const fallback = new Date().toISOString()
        return (results.docs as Array<{ slug?: string; updatedAt?: string }>)
          .filter((d) => Boolean(d?.slug))
          .map((d) => ({
            loc: `${SITE_URL}${canonicalPath(`${pathPrefix}/${d.slug}`)}`,
            lastmod: d.updatedAt || fallback,
          }))
      } catch {
        // DB unreachable (e.g. during build) — emit an empty sitemap rather than failing.
        return []
      }
    },
    [`${collection}-sitemap`],
    { tags: [`${collection}-sitemap`] },
  )

  return async function GET() {
    return getServerSideSitemap(await load())
  }
}
