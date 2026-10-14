import type { Metadata } from 'next/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ArrowRight, CheckCircle2, Clock, FileCheck2, MapPin, MessageCircle, Plane, Search, ShieldCheck, Users } from 'lucide-react'
import RichText from '@/components/RichText'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Flag } from '@/components/visual/Flag'
import Reveal from '@/components/visual/Reveal'
import { FAQAccordion } from '@/components/visual/FAQAccordion'
import { COUNTRY_CONTENT } from '@/data/countryContent'
import { COUNTRY_SEO } from '@/data/countrySeo'
import { breadcrumbSchema } from '@/utilities/breadcrumbSchema'

export const dynamic = 'force-dynamic'

const REGION_LABELS: Record<string, string> = {
  gulf: 'Gulf / GCC',
  gcc: 'Gulf / GCC',
  europe: 'Europe',
  'east-asia': 'East Asia',
  sea: 'Southeast Asia',
  'southeast-asia': 'Southeast Asia',
  'central-asia': 'Central Asia & Caucasus',
  mena: 'Middle East & North Africa',
}

const STEPS = [
  { icon: MessageCircle, t: 'Share the requirement', d: 'Employer confirms roles, numbers, salary and timeline; we agree the sourcing plan.' },
  { icon: Search, t: 'Source & screen', d: 'We shortlist pre-vetted, trade-tested candidates from our nationwide network.' },
  { icon: Users, t: 'Interview & select', d: 'You interview and select — in person, by video or by proxy.' },
  { icon: Plane, t: 'Visa & mobilise', d: 'Documentation, medicals, visa, attestation and travel — handled end-to-end.' },
]

const EMPTY_JOBS = { docs: [] as Record<string, any>[], totalDocs: 0 } as const

async function getData(slug: string) {
  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'countries',
      where: { slug: { equals: slug } } as never,
      overrideAccess: false,
      depth: 1,
      limit: 1,
    })
    const country = res.docs[0] as Record<string, any> | undefined
    if (!country) return { country: undefined, jobs: EMPTY_JOBS }
    const jobs = await payload.find({
      collection: 'jobs',
      where: { and: [{ vacancyStatus: { equals: 'open' } }, { 'country.slug': { equals: slug } }] } as never,
      overrideAccess: false,
      depth: 1,
      limit: 12,
      sort: '-createdAt',
    })
    return { country, jobs }
  } catch {
    // No DB / no record — fall back to code-level content below.
    return { country: undefined, jobs: EMPTY_JOBS }
  }
}

/** Merge a CMS record (if any) with code-level content into one view model. */
function resolveCountry(slug: string, cms: Record<string, any> | undefined) {
  const extra = COUNTRY_CONTENT[slug]
  const name: string | undefined = cms?.name ?? extra?.name
  if (!name) return undefined
  const region: string | undefined = cms?.region ?? extra?.region
  return {
    name,
    slug,
    intro: cms?.intro ?? extra?.intro ?? null,
    content: cms?.content ?? null,
    meta: cms?.meta ?? null,
    region,
    regionLabel: extra?.regionLabel ?? (region ? REGION_LABELS[region] : undefined) ?? 'Worldwide',
    sectorsLabel: extra?.sectorsLabel ?? null,
    lead: extra?.lead ?? null,
    categoriesTitle: extra?.categoriesTitle ?? null,
    categories: extra?.categories ?? null,
    partnership: extra?.partnership ?? null,
    sections: extra?.sections ?? null,
  }
}

function relatedCountries(slug: string, region: string | undefined) {
  if (!region) return []
  return Object.entries(COUNTRY_CONTENT)
    .filter(([s, c]) => s !== slug && c.region === region && c.name)
    .slice(0, 6)
    .map(([s, c]) => ({ slug: s, name: c.name as string }))
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { country: cms, jobs } = await getData(slug)
  const c = resolveCountry(slug, cms)
  if (!c) notFound()

  const related = relatedCountries(slug, COUNTRY_CONTENT[slug]?.region)
  const seo = COUNTRY_SEO[slug]
  const faqSchema =
    seo?.faqs && seo.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: seo.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null
  const gridBg = {
    backgroundImage:
      'linear-gradient(to right, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px)',
    backgroundSize: '44px 44px',
    maskImage: 'radial-gradient(120% 90% at 85% 10%, black, transparent 72%)',
    WebkitMaskImage: 'radial-gradient(120% 90% at 85% 10%, black, transparent 72%)',
  } as const

  return (
    <div>
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Destinations', path: '/countries' },
              { name: c.name, path: `/countries/${slug}` },
            ]),
          ),
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-background text-foreground">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70" style={gridBg} />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--gold)]/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-[var(--primary)]/25 blur-3xl"
        />
        <div className="container relative py-14 md:py-20">
          <Link href="/countries" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
            ← All destinations
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            {/* Copy */}
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                Recruitment Agency in Pakistan for
              </p>
              <div className="mt-3 flex items-center gap-4">
                <Flag name={c.name} className="h-11 w-[4.1rem] rounded-md shadow-lg ring-1 ring-border" />
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{c.name}</h1>
              </div>
              {c.intro && <p className="mt-5 max-w-xl text-lg text-muted-foreground">{c.intro}</p>}

              <ul className="mt-7 flex flex-wrap gap-2.5">
                {[
                  { icon: ShieldCheck, t: 'BEOE-licensed · OEP 4035' },
                  { icon: Clock, t: '15+ years' },
                  { icon: MapPin, t: c.regionLabel },
                ].map((p) => (
                  <li
                    key={p.t}
                    className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground shadow-sm"
                  >
                    <p.icon className="h-4 w-4 text-[var(--gold)]" />
                    {p.t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-6">
                  <Link href="/fill-a-vacancy">Hire from Pakistan for {c.name}</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-6">
                  <Link href="/upload-cv">Find work →</Link>
                </Button>
              </div>
            </Reveal>

            {/* Destination card */}
            <Reveal delay={0.1}>
              <div className="relative mx-auto w-full max-w-sm">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-black/20 ring-1 ring-border">
                  <Flag name={c.name} className="block h-auto w-full rounded-none" />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                  />
                </div>
                <div className="absolute -right-3 top-5 rounded-2xl border border-border bg-card/90 px-4 py-2.5 shadow-lg backdrop-blur-md">
                  <p className="text-lg font-bold leading-none text-[var(--gold)]">OEP 4035</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">BEOE licensed</p>
                </div>
                <div className="absolute -bottom-4 left-0 rounded-2xl border border-border bg-card/90 px-4 py-2.5 shadow-lg backdrop-blur-md">
                  <p className="text-lg font-bold leading-none text-foreground">End-to-end</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">Sourcing to travel</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="container py-16 md:py-20">
        {/* Overview + quick facts */}
        <section className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight">Recruitment from Pakistan for {c.name}</h2>
            {c.lead ? (
              <div className="mt-5 space-y-4">
                {c.lead.map((p, i) => (
                  <p key={i} className="leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            ) : c.content ? (
              <div className="prose dark:prose-invert mt-5 max-w-none">
                <RichText data={c.content} enableGutter={false} />
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-28">
              <h3 className="font-semibold">Quick facts</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <Fact label="Region" value={c.regionLabel} />
                {c.sectorsLabel && <Fact label="Key sectors" value={c.sectorsLabel} />}
                <Fact label="Licence" value="OEP No. 4035 · BEOE-registered" />
                <Fact label="Experience" value="15+ years of overseas recruitment" />
                <Fact label="Offices" value="Rawalpindi (HO), Lahore, Karachi, Peshawar & AJK" />
              </dl>
              <Button asChild className="mt-6 w-full rounded-full">
                <Link href="/fill-a-vacancy">Request workforce</Link>
              </Button>
              <Button asChild variant="outline" className="mt-2.5 w-full rounded-full">
                <Link href="/upload-cv">Submit your CV</Link>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* In-depth: unique per-country market, roles & deployment */}
        {c.sections && c.sections.length > 0 && (
          <section className="mt-14 md:mt-16">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
              {c.sections.map((s, i) => (
                <Reveal key={s.heading} delay={(i % 2) * 0.05}>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight md:text-2xl">{s.heading}</h2>
                    <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                      {s.body.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Manpower categories */}
        {c.categories && c.categories.length > 0 && (
          <section className="mt-16 md:mt-20">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">What we recruit</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                {c.categoriesTitle || `Manpower categories we recruit for ${c.name}`}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {c.categories.map((cat, i) => (
                <Reveal key={cat} delay={(i % 3) * 0.05}>
                  <div className="flex h-full items-start gap-2.5 rounded-xl border border-border bg-card p-3.5 text-sm shadow-sm">
                    <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{cat}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Work & visa routes */}
        {seo?.visaRoutes && seo.visaRoutes.length > 0 && (
          <section className="mt-16 md:mt-20">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Work &amp; visa routes</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">How Pakistanis work in {c.name}</h2>
              <p className="mt-3 text-muted-foreground">
                The main legal pathways we recruit through. We handle the documentation and visa process end-to-end.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {seo.visaRoutes.map((v, i) => (
                <Reveal key={v.name} delay={(i % 3) * 0.06}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FileCheck2 className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-semibold">{v.name}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{v.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Immigration rules change — details are a general guide, not legal advice. We confirm the current route and
              requirements for each role.
            </p>
          </section>
        )}

        {/* How we deploy */}
        <section className="mt-16 md:mt-20">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">How we deploy</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">From requirement to arrival in {c.name}</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-primary-foreground">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span className="text-2xl font-bold text-muted-foreground/25">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-4 font-semibold">{s.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Open roles */}
        <section className="mt-16 md:mt-20">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Open roles in {c.name}</h2>
            <Button asChild variant="outline" size="sm">
              <Link href={`/jobs?country=${c.slug}`}>See all</Link>
            </Button>
          </div>
          {jobs.totalDocs === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-border p-6 text-muted-foreground">
              No open roles listed right now.{' '}
              <Link href="/upload-cv" className="font-medium text-primary underline">
                Send your CV
              </Link>{' '}
              and we&apos;ll match you to upcoming vacancies in {c.name}.
            </p>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(jobs.docs as Record<string, any>[]).map((job) => (
                <Card key={job.id} className="transition-shadow hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg leading-snug">
                      <Link href={`/jobs/${job.slug}`} className="hover:underline">
                        {job.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {[job.city, c.name].filter(Boolean).join(', ')}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* FAQ */}
        {seo?.faqs && seo.faqs.length > 0 && (
          <section className="mt-16 md:mt-20">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">FAQ</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Working in {c.name} — your questions</h2>
            </Reveal>
            <div className="mt-8 max-w-3xl">
              <FAQAccordion items={seo.faqs} />
            </div>
          </section>
        )}

        {/* Related destinations */}
        {related.length > 0 && (
          <section className="mt-16 md:mt-20">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Nearby destinations</h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/countries/${r.slug}`}
                  className="group flex items-center gap-2.5 rounded-xl border border-border bg-card p-3 text-sm font-medium shadow-sm transition hover:shadow-md"
                >
                  <Flag name={r.name} className="h-5 w-[1.9rem] rounded-sm shadow-sm" />
                  <span className="truncate group-hover:text-primary">{r.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* CTA band */}
      {c.partnership && (
        <section className="container pb-20">
          <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-10 text-background md:px-12 md:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--gold)]/15 blur-3xl"
            />
            <div className="relative flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Hiring from Pakistan for {c.name}?</h2>
                <p className="mt-2 text-background/70">{c.partnership}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full bg-[var(--gold)] px-6 text-[var(--navy)] hover:brightness-105">
                  <Link href="/fill-a-vacancy">Request workforce</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-background/30 bg-transparent px-6 text-background hover:bg-background/10 hover:text-background"
                >
                  <Link href="/contact">
                    Contact us <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-dashed border-border pb-3 last:border-0 last:pb-0">
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { country: cms } = await getData(slug)
  const c = resolveCountry(slug, cms)
  if (!c) return { title: 'Country not found | Falisha Manpower' }
  return {
    alternates: { canonical: `/countries/${slug}` },
    title: c.meta?.title || `Recruitment Agency in Pakistan for ${c.name} | Falisha Manpower`,
    description:
      c.meta?.description ||
      c.intro ||
      `Hire skilled Pakistani workers for ${c.name}, or find work in ${c.name}, with Falisha Manpower (BEOE OEP 4035).`,
  }
}
