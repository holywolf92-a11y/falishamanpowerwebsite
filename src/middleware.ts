import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// De-index the Railway staging host so it never competes with the production
// domain (falishamanpower.com) as duplicate content. Requests served over the
// custom production domain are untouched and index normally.
export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const host = req.headers.get('host') || ''
  if (host.includes('.up.railway.app')) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }
  return res
}

export const config = {
  // Run on page routes only — skip Next internals and any path with a file
  // extension (static assets, robots.txt, *-sitemap.xml).
  matcher: ['/((?!_next/static|_next/image|.*\\.[\\w]+$).*)'],
}
