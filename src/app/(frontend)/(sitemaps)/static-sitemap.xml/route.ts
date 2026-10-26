import { getServerSideSitemap } from 'next-sitemap'

const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ||
  'https://falisha.up.railway.app'

// Hand-built (non-CMS) routes. Collection detail pages and posts live in their own
// sitemaps; /search is intentionally excluded (disallowed in robots.txt).
const ROUTES: {
  path: string
  priority: number
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
}[] = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/countries', priority: 0.9, changefreq: 'weekly' },
  { path: '/industries', priority: 0.9, changefreq: 'weekly' },
  { path: '/services', priority: 0.9, changefreq: 'weekly' },
  { path: '/jobs', priority: 0.9, changefreq: 'daily' },
  { path: '/hire-from-pakistan', priority: 0.8, changefreq: 'monthly' },
  { path: '/fill-a-vacancy', priority: 0.8, changefreq: 'monthly' },
  { path: '/partner-with-us', priority: 0.7, changefreq: 'monthly' },
  { path: '/upload-cv', priority: 0.8, changefreq: 'monthly' },
  { path: '/faq', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
  { path: '/our-team', priority: 0.6, changefreq: 'monthly' },
  { path: '/report-a-fraud', priority: 0.5, changefreq: 'yearly' },
  { path: '/quality-policy', priority: 0.3, changefreq: 'yearly' },
  { path: '/anti-trafficking', priority: 0.3, changefreq: 'yearly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
]

export async function GET() {
  const lastmod = new Date().toISOString()
  return getServerSideSitemap(
    ROUTES.map((r) => ({
      loc: `${SITE_URL}${r.path}`,
      lastmod,
      changefreq: r.changefreq,
      priority: r.priority,
    })),
  )
}
