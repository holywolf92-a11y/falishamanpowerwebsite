import { getServerSideSitemap } from 'next-sitemap'
import { COUNTRY_CONTENT } from '@/data/countryContent'
import { canonicalPath } from '@/data/legacyUrlMap'

// Every /countries/{slug} page renders from COUNTRY_CONTENT (code) even without a
// CMS record, so the sitemap lists every code-defined slug — not just the smaller
// CMS-published subset the generic collection sitemap would return.
const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ||
  'https://falishamanpower.com'

export async function GET() {
  const lastmod = new Date().toISOString()
  return getServerSideSitemap(
    Object.keys(COUNTRY_CONTENT)
      .filter((slug) => slug !== 'england' && slug !== 'scotland')
      .map((slug) => ({
      loc: `${SITE_URL}${canonicalPath(`/countries/${slug}`)}`,
      lastmod,
      changefreq: 'weekly' as const,
      priority: 0.8,
    })),
  )
}
