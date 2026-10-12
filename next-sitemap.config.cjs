const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ||
  // Canonical production URL. Update to https://falishamanpower.com at domain cutover
  // (or set NEXT_PUBLIC_SERVER_URL in the build env, which overrides this).
  'https://falisha.up.railway.app'

// Per-collection sitemaps are generated at runtime by the route handlers in
// src/app/(frontend)/(sitemaps); next-sitemap only emits the index + robots.txt.
const SITEMAPS = [
  'pages-sitemap.xml',
  'posts-sitemap.xml',
  'countries-sitemap.xml',
  'industries-sitemap.xml',
  'services-sitemap.xml',
  'jobs-sitemap.xml',
  'static-sitemap.xml',
]

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/*', ...SITEMAPS.map((s) => `/${s}`)],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*', '/next/*'],
      },
    ],
    additionalSitemaps: SITEMAPS.map((s) => `${SITE_URL}/${s}`),
  },
}
