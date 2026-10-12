import type { Metadata } from 'next/types'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Tilt3D } from '@/components/visual/Tilt3D'
import { Flag } from '@/components/visual/Flag'

export const dynamic = 'force-dynamic'

const REGION_LABELS: Record<string, string> = {
  gcc: 'Gulf / GCC',
  europe: 'Europe',
  'east-asia': 'East Asia',
  'southeast-asia': 'Southeast Asia',
  mena: 'MENA / North Africa',
  other: 'Other',
}

export default async function CountriesPage() {
  const payload = await getPayload({ config: configPromise })
  const countries = await payload.find({
    collection: 'countries',
    overrideAccess: false,
    limit: 100,
    depth: 0,
    sort: 'name',
  })

  const byRegion = new Map<string, Record<string, any>[]>()
  for (const c of countries.docs as Record<string, any>[]) {
    const key = c.region || 'other'
    if (!byRegion.has(key)) byRegion.set(key, [])
    byRegion.get(key)!.push(c)
  }

  return (
    <div className="container py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Our presence</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Destination countries</h1>
        <p className="mt-3 text-muted-foreground">
          Falisha Manpower places Pakistani professionals with employers across these markets.
        </p>
      </header>

      <div className="mt-12 space-y-12">
        {[...byRegion.entries()].map(([region, list]) => (
          <div key={region}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {REGION_LABELS[region] || region}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((c) => (
                <Tilt3D key={c.id} max={6}>
                  <Link
                    href={`/countries/${c.slug}`}
                    className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-xl"
                  >
                    <div aria-hidden className="absolute -bottom-6 -right-8 opacity-[0.08] transition-opacity duration-300 group-hover:opacity-20">
                      <Flag name={c.name} className="h-28 w-40" />
                    </div>
                    <Flag name={c.name} className="h-10 w-[3.75rem] rounded-md shadow-md" />
                    <p className="mt-4 text-lg font-semibold">{c.name}</p>
                    {c.intro && <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{c.intro}</p>}
                    <p className="mt-3 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Open roles →
                    </p>
                  </Link>
                </Tilt3D>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    alternates: { canonical: '/countries' },
    title: 'Destination Countries | Falisha Manpower',
    description: 'Countries where Falisha Manpower places skilled Pakistani workers, across the Gulf, Europe and Asia.',
  }
}
