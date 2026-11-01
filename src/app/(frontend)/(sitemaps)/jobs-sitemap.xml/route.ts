import { getServerSideSitemap } from 'next-sitemap'
import { JOBS } from '@/data/jobsData'

// Jobs are code-driven (src/data/jobsData.ts), so emit them directly rather than
// querying the (empty on prod) CMS collection.
const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
  'https://falishamanpower.com'

export async function GET() {
  const now = new Date().toISOString()
  return getServerSideSitemap([
    { loc: `${SITE_URL}/jobs`, lastmod: now },
    ...JOBS.map((j) => ({ loc: `${SITE_URL}/jobs/${j.slug}`, lastmod: now })),
  ])
}
