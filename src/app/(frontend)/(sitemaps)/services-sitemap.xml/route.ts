import { getServerSideSitemap } from 'next-sitemap'
import { SERVICES } from '@/data/serviceDetail'

// Services are code-driven (src/data/serviceDetail.ts), so emit them directly
// rather than querying the CMS collection.
const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
  'https://falishamanpower.com'

export async function GET() {
  const now = new Date().toISOString()
  return getServerSideSitemap(
    SERVICES.map((s) => ({ loc: `${SITE_URL}/services/${s.slug}`, lastmod: now })),
  )
}
