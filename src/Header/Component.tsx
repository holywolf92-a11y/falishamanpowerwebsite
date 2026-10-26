import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'
import { MegaHeader, type MenuLink } from '@/components/visual/MegaHeader'
import { COUNTRY_CONTENT } from '@/data/countryContent'
import { SERVICES } from '@/data/serviceDetail'

const EMPTY: { docs: Record<string, any>[] } = { docs: [] }

// Destinations shown first in the header menu — the markets we're known for
// (Türkiye + the Gulf), then other notable corridors, then the rest A–Z.
// Built from code so the key markets always appear (and render without a DB).
const HEADER_FEATURED = [
  'turkey',
  'saudi-arabia',
  'united-arab-emirates',
  'qatar',
  'kuwait',
  'oman',
  'bahrain',
  'united-kingdom',
  'germany',
  'romania',
  'malaysia',
  'azerbaijan',
]

function buildPresence(): MenuLink[] {
  const all = Object.entries(COUNTRY_CONTENT).filter(
    ([slug, c]) => c.name && slug !== 'england' && slug !== 'scotland',
  )
  const bySlug = new Map(all.map(([slug, c]) => [slug, c]))
  const featured = HEADER_FEATURED.filter((slug) => bySlug.has(slug))
  const featuredSet = new Set(featured)
  const rest = all
    .filter(([slug]) => !featuredSet.has(slug))
    .sort((a, b) => String(a[1].name).localeCompare(String(b[1].name)))
    .map(([slug]) => slug)
  return [...featured, ...rest].map((slug) => ({
    label: bySlug.get(slug)!.name as string,
    href: `/countries/${slug}`,
  }))
}

export async function Header() {
  let industries: { docs: Record<string, any>[] } = EMPTY
  try {
    const payload = await getPayload({ config: configPromise })
    industries = (await payload.find({
      collection: 'industries',
      overrideAccess: false,
      limit: 24,
      depth: 0,
      sort: 'title',
      select: { title: true, slug: true } as never,
    })) as any
  } catch {
    // DB unavailable (e.g. during build) — render the header with an empty industries menu.
  }

  const presence = buildPresence()
  const expertise: MenuLink[] = (industries.docs as Record<string, any>[]).map((i) => ({ label: i.title, href: `/industries/${i.slug}` }))
  // Services are code-driven (src/data/serviceDetail.ts), not the CMS.
  const recruitment: MenuLink[] = SERVICES.filter((s) => s.serviceType === 'recruitment').map((s) => ({ label: s.title, href: `/services/${s.slug}` }))
  const advisory: MenuLink[] = SERVICES.filter((s) => s.serviceType === 'advisory').map((s) => ({ label: s.title, href: `/services/${s.slug}` }))

  return <MegaHeader presence={presence} expertise={expertise} recruitment={recruitment} advisory={advisory} />
}
