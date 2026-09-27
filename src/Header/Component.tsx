import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'
import { MegaHeader, type MenuLink } from '@/components/visual/MegaHeader'

const EMPTY: { docs: Record<string, any>[] } = { docs: [] }

export async function Header() {
  let countries: { docs: Record<string, any>[] } = EMPTY
  let industries: { docs: Record<string, any>[] } = EMPTY
  let services: { docs: Record<string, any>[] } = EMPTY
  try {
    const payload = await getPayload({ config: configPromise })
    const [c, i, s] = (await Promise.all([
      payload.find({ collection: 'countries', overrideAccess: false, limit: 24, depth: 0, sort: 'name', select: { name: true, slug: true } as never }),
      payload.find({ collection: 'industries', overrideAccess: false, limit: 24, depth: 0, sort: 'title', select: { title: true, slug: true } as never }),
      payload.find({ collection: 'services', overrideAccess: false, limit: 50, depth: 0, sort: 'title', select: { title: true, slug: true, serviceType: true } as never }),
    ])) as any[]
    countries = c
    industries = i
    services = s
  } catch {
    // DB unavailable (e.g. during build) — render the header with empty menus.
  }

  const presence: MenuLink[] = (countries.docs as Record<string, any>[]).map((c) => ({ label: c.name, href: `/countries/${c.slug}` }))
  const expertise: MenuLink[] = (industries.docs as Record<string, any>[]).map((i) => ({ label: i.title, href: `/industries/${i.slug}` }))
  const svc = services.docs as Record<string, any>[]
  const recruitment: MenuLink[] = svc.filter((s) => s.serviceType === 'recruitment').map((s) => ({ label: s.title, href: `/services/${s.slug}` }))
  const advisory: MenuLink[] = svc.filter((s) => s.serviceType === 'advisory').map((s) => ({ label: s.title, href: `/services/${s.slug}` }))

  return <MegaHeader presence={presence} expertise={expertise} recruitment={recruitment} advisory={advisory} />
}
