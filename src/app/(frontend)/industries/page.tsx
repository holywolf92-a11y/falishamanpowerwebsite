import type { Metadata } from 'next/types'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Tilt3D } from '@/components/visual/Tilt3D'
import { IndustryIcon } from '@/components/visual/IndustryIcon'
import { industryImage } from '@/utilities/sectionImages'

export const dynamic = 'force-dynamic'

const GROUPS = [
  { key: 'industry', label: 'Industries & sectors' },
  { key: 'profession', label: 'Professions & functions' },
]

export default async function IndustriesPage() {
  const payload = await getPayload({ config: configPromise })
  const industries = await payload.find({
    collection: 'industries',
    overrideAccess: false,
    limit: 100,
    depth: 0,
    sort: 'title',
  })

  return (
    <div className="container py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Expertise</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Industries &amp; professions</h1>
        <p className="mt-3 text-muted-foreground">The sectors and functions we recruit for across our markets.</p>
      </header>

      <div className="mt-12 space-y-12">
        {GROUPS.map((g) => {
          const list = (industries.docs as Record<string, any>[]).filter((i) => i.kind === g.key)
          if (list.length === 0) return null
          return (
            <div key={g.key}>
              <h2 className="text-2xl font-bold tracking-tight">{g.label}</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((ind) => (
                  <Tilt3D key={ind.id} max={6}>
                    <Link
                      href={`/industries/${ind.slug}`}
                      className="group relative block h-56 overflow-hidden rounded-2xl border border-border shadow-lg"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={industryImage(ind.title)}
                        alt={ind.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[var(--navy)] via-[var(--navy)]/30 to-transparent" />
                      <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-white backdrop-blur">
                        <IndustryIcon name={ind.title} className="h-5 w-5" />
                      </div>
                      <div className="absolute inset-x-4 bottom-4 text-white">
                        <p className="text-lg font-semibold">{ind.title}</p>
                        {ind.summary && <p className="mt-1 line-clamp-2 text-xs text-white/75">{ind.summary}</p>}
                      </div>
                    </Link>
                  </Tilt3D>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Industries & Professions | Falisha Manpower',
    description: 'The industries and professional functions Falisha Manpower recruits for across the Gulf and beyond.',
  }
}
