import type { Metadata } from 'next/types'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Tilt3D } from '@/components/visual/Tilt3D'
import { IndustryIcon } from '@/components/visual/IndustryIcon'
import Reveal from '@/components/visual/Reveal'
import { SmoothScrollProvider } from '@/components/visual/SmoothScrollProvider'
import { ScrollProgress } from '@/components/visual/ScrollProgress'
import { KineticHeading } from '@/components/visual/KineticHeading'
import { industryImage } from '@/utilities/sectionImages'

export const dynamic = 'force-dynamic'

const display = 'font-display'

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
    <SmoothScrollProvider>
      <ScrollProgress />
      <div>
        {/* Hero */}
        <section className="relative overflow-hidden bg-background text-foreground">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                'linear-gradient(to right, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
              maskImage: 'radial-gradient(120% 90% at 20% 0%, black, transparent 72%)',
              WebkitMaskImage: 'radial-gradient(120% 90% at 20% 0%, black, transparent 72%)',
            }}
          />
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
          <div className="container relative py-16 md:py-24">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Expertise</p>
            </Reveal>
            <KineticHeading
              as="h1"
              igniteWord="professions"
              igniteClassName="text-primary"
              lines={['Industries &', 'professions']}
              className={`${display} mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.25rem]`}
            />
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                The sectors and functions we recruit for across our markets — sourced, screened and deployed with a
                BEOE-licensed partner.
              </p>
            </Reveal>
          </div>
        </section>

        <div className="container pb-20">
          <div className="space-y-14">
            {GROUPS.map((g) => {
              const list = (industries.docs as Record<string, any>[]).filter((i) => i.kind === g.key)
              if (list.length === 0) return null
              return (
                <div key={g.key}>
                  <Reveal>
                    <KineticHeading
                      as="h2"
                      lines={[g.label]}
                      className={`${display} text-2xl font-semibold tracking-tight md:text-3xl`}
                    />
                  </Reveal>
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((ind, i) => (
                      <Reveal key={ind.id} delay={(i % 3) * 0.06}>
                        <Tilt3D max={6}>
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
                      </Reveal>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </SmoothScrollProvider>
  )
}

export function generateMetadata(): Metadata {
  return {
    alternates: { canonical: '/industries' },
    title: 'Industries & Professions | Falisha Manpower',
    description: 'The industries and professional functions Falisha Manpower recruits for across the Gulf and beyond.',
  }
}
