import type { Metadata } from 'next/types'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ArrowRight, ClipboardCheck, Plane, UsersRound, Layers, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HeroShowcase } from '@/components/visual/HeroShowcase'
import { CircleBadge } from '@/components/visual/CircleBadge'
import { Tilt3D } from '@/components/visual/Tilt3D'
import { TrustAward } from '@/components/visual/TrustAward'
import { CredentialsOrbit } from '@/components/visual/CredentialsOrbit'
import { ClientLogos } from '@/components/visual/ClientLogos'
import { LogoWaterfall } from '@/components/visual/LogoWaterfall'
import { CLIENT_LOGOS, industryImage } from '@/utilities/sectionImages'
import Reveal, { CountUp } from '@/components/visual/Reveal'
import { ServiceIcon } from '@/components/visual/ServiceIcon'
import { IndustryIcon } from '@/components/visual/IndustryIcon'
import { TestimonialsCarousel } from '@/components/visual/TestimonialsCarousel'
import { CountryMarquee } from '@/components/visual/CountryMarquee'
import { Flag } from '@/components/visual/Flag'
import { ProcessSteps } from '@/components/visual/ProcessSteps'

export const dynamic = 'force-dynamic'

function salaryLabel(j: Record<string, any>): string | null {
  if (!j.salaryMin && !j.salaryMax) return null
  const per = j.salaryPeriod === 'year' ? '/yr' : '/mo'
  const range =
    j.salaryMin && j.salaryMax
      ? `${j.salaryMin.toLocaleString()}–${j.salaryMax.toLocaleString()}`
      : `${(j.salaryMin || j.salaryMax).toLocaleString()}`
  return `${j.salaryCurrency || ''} ${range}${per}`
}

// Generated cutout of a Pakistani professional (transparent WebP) — served locally.
const HERO_PHOTO = '/hero-person.webp'

const HERO_SLIDES = [
  {
    eyebrow: 'No.1 recruitment agency in Pakistan',
    titleLead: 'Manpower ',
    titleAccent: 'Recruitment Agency',
    titleRest: ' for the Gulf.',
    subtitle:
      'We connect skilled Pakistani professionals with leading employers across Saudi Arabia, the UAE and beyond — visa, attestation and mobilisation included.',
  },
  {
    eyebrow: 'For employers',
    titleLead: 'Your workforce, ',
    titleAccent: 'sourced & mobilised',
    titleRest: ' end-to-end.',
    subtitle:
      'From bulk hiring to executive search — we handle sourcing, screening, visas, attestation and payroll so you can focus on operations.',
  },
  {
    eyebrow: 'Ethical recruitment',
    titleLead: 'Transparent, ',
    titleAccent: 'zero-fee',
    titleRest: ' hiring you can trust.',
    subtitle: 'A compliant, honest process for candidates and employers across every market we serve.',
  },
]

const REGION_LABELS: Record<string, string> = {
  gcc: 'Gulf / GCC',
  europe: 'Europe',
  'east-asia': 'East Asia',
  'southeast-asia': 'Southeast Asia',
  mena: 'MENA / North Africa',
  other: 'Worldwide',
}

const TURKEY_LOGOS = ['enka', 'ronesans', 'limak', 'tav', 'tekfen', 'nurol', 'gama', 'cengiz'].map(
  (n) => `/logos/turkey/${n}.webp`,
)

const TURKEY_POINTS = [
  'Construction, EPC, energy & manufacturing projects',
  'Skilled trades, technicians & complete project teams',
  'Full visa, documentation & mobilisation support',
]

const VALUES = [
  { t: 'End-to-end hiring', d: 'Sourcing, screening, visas, attestation and mobilisation — all in one place.' },
  { t: 'Ethical & transparent', d: 'No hidden fees. A clear process for candidates and employers.' },
  { t: 'Gulf-wide network', d: 'Employer relationships across Saudi Arabia, the UAE and the wider GCC.' },
  { t: 'Dedicated support', d: 'One point of contact from application through to arrival.' },
]

const EMPLOYER_HIGHLIGHTS = [
  { Icon: UsersRound, t: 'Nationwide sourcing', d: 'Professional, engineering, technical, skilled & general manpower from across Pakistan.' },
  { Icon: ClipboardCheck, t: 'Screening & trade testing', d: 'CV shortlisting, technical assessment and practical trade tests before you interview.' },
  { Icon: Layers, t: 'Bulk & project hiring', d: 'High-volume, multi-trade campaigns aligned to your project and mobilisation schedule.' },
  { Icon: Plane, t: 'Visa, BEOE & deployment', d: 'Documentation, medical, visa, Protector formalities and on-time mobilisation.' },
]

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [services, jobs, testimonials, countries, industries] = await Promise.all([
    payload.find({ collection: 'services', where: { featured: { equals: true } } as never, overrideAccess: false, limit: 6, depth: 0 }),
    payload.find({ collection: 'jobs', where: { vacancyStatus: { equals: 'open' } } as never, overrideAccess: false, limit: 6, depth: 1, sort: '-createdAt' }),
    payload.find({ collection: 'testimonials', where: { featured: { equals: true } } as never, overrideAccess: false, limit: 8, depth: 0 }),
    payload.find({ collection: 'countries', overrideAccess: false, limit: 24, depth: 0, sort: 'name' }),
    payload.find({ collection: 'industries', overrideAccess: false, limit: 24, depth: 0 }),
  ])

  const stats = [
    { n: jobs.totalDocs, l: 'Open vacancies' },
    { n: countries.totalDocs, l: 'Destination countries' },
    { n: industries.totalDocs, l: 'Sectors covered' },
  ]

  return (
    <div>
      {/* Hero */}
      <HeroShowcase
        slides={HERO_SLIDES}
        photo={HERO_PHOTO}
        primary={{ href: '/jobs', label: 'Job Opening' }}
        secondary={{ href: '/contact', label: 'Recruit Manpower' }}
      />

      {/* Client logos — partner wall */}
      <section className="border-b border-border bg-secondary/40 py-16 md:py-20">
        <div className="container">
          <ClientLogos logos={CLIENT_LOGOS} />
        </div>
      </section>

      {/* Turkey specialty */}
      <section className="border-b border-border py-16 md:py-20">
        <div className="container grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div>
              <div className="flex items-center gap-3">
                <Flag name="Türkiye" className="h-8 w-12 rounded shadow-sm" />
                <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Our speciality</p>
              </div>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                <span className="text-primary">Türkiye</span> is our speciality
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Türkiye is one of our strongest corridors. Falisha Manpower supplies skilled and technical
                Pakistani workers to leading Turkish construction, EPC, energy and manufacturing companies —
                managing the full journey from sourcing to on-site deployment.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {TURKEY_POINTS.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 rounded-full px-6">
                <Link href="/hire-from-pakistan">Hire from Pakistan for Türkiye</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Leading Turkish employers
              </p>
              <LogoWaterfall logos={TURKEY_LOGOS} columns={2} heightClass="h-[24rem]" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Country marquee */}
      <div className="border-b border-border bg-secondary/40 py-10">
        <div className="container">
          <CountryMarquee
            label="We place talent across"
            items={(countries.docs as Record<string, any>[]).map((c) => ({
              name: c.name,
              href: `/countries/${c.slug}`,
            }))}
          />
        </div>
      </div>

      {/* For employers — Hire from Pakistan gateway */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-16 text-white md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(120% 90% at 15% 0%, black, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(120% 90% at 15% 0%, black, transparent 70%)',
          }}
        />
        <div className="container relative grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">For employers</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Hire skilled manpower <span className="text-primary">from Pakistan</span>
              </h2>
              <p className="mt-4 max-w-md text-white/70">
                Falisha Manpower manages the complete international hiring lifecycle — from workforce
                planning and nationwide sourcing to assessment, documentation and deployment. BEOE-licensed
                OEP No. 4035.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/hire-from-pakistan">
                    Employer services <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/25 bg-transparent text-white hover:bg-white/10"
                >
                  <Link href="/fill-a-vacancy">Request workforce</Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {EMPLOYER_HIGHLIGHTS.map(({ Icon, t, d }) => (
                <div
                  key={t}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition-colors hover:border-primary/40 hover:bg-white/[0.07]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{t}</h3>
                  <p className="mt-1.5 text-sm text-white/65">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section className="container py-20 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                About us
              </span>
              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                One of the most trusted recruitment agencies{' '}
                <span className="text-primary">for Pakistani manpower</span>
              </h2>
              <p className="mt-5 text-muted-foreground">
                As industries worldwide shift toward sustainable, long-term growth, companies increasingly
                rely on overseas partners to secure skilled, dependable workers. Falisha Manpower specialises
                in sourcing and supplying vetted Pakistani professionals across all major industries — managing
                recruitment, visas, attestation and mobilisation from start to finish.
              </p>
              <ul className="mt-6 grid max-w-md gap-2.5 text-sm">
                {[
                  'Government-compliant, ethical recruitment',
                  'Full visa, attestation & mobilisation support',
                  'Skilled, semi-skilled & professional talent',
                ].map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 rounded-full px-6">
                <Link href="/services">Learn more</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Tilt3D max={7} className="mx-auto w-full max-w-md">
              <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                <TrustAward />
                <div className="absolute -right-4 bottom-6" style={{ transform: 'translateZ(95px)' }}>
                  <CircleBadge className="h-28 w-28 rounded-full bg-background/70 p-1 backdrop-blur" />
                </div>
              </div>
            </Tilt3D>
          </Reveal>
        </div>
      </section>

      {/* Credentials orbit */}
      <section className="border-y border-border bg-secondary/40 py-16 md:py-20">
        <div className="container">
          <CredentialsOrbit
            stats={[
              { value: 'OEP 4035', label: 'BEOE-Licensed', sub: 'Overseas Employment Promoter' },
              { value: 'ISO 9001:2015', label: 'Certified process', sub: 'Quality management' },
              { value: 'Gulf + EU', label: 'Global reach', sub: 'GCC, Europe & Asia' },
              { value: 'End-to-end', label: 'Sourcing to deployment', sub: 'Visa, attestation, mobilisation' },
            ]}
            badges={[
              { abbr: 'BEOE', name: 'Bureau of Emigration & Overseas Employment', logo: '/logos/credentials/beoe.webp' },
              { abbr: 'ISO', name: 'ISO 9001:2015 Certified', logo: '/logos/credentials/iso.webp' },
              { abbr: 'POEPA', name: 'POEPA Member', logo: '/logos/credentials/poepa.webp' },
              { abbr: 'SECP', name: 'SECP Registered', logo: '/logos/credentials/secp.webp' },
              { abbr: 'FPCCI', name: 'FPCCI Chamber Member', logo: '/logos/credentials/fpcci.webp' },
            ]}
            logo="/logos/falisha-mark.webp"
            whyHeading="Why Employers Choose Us"
            whyPoints={[
              'Government-approved, BEOE-licensed agency',
              'Verified & skilled candidates',
              'Fast & reliable recruitment',
              'Complete documentation support',
              'Gulf recruitment specialists',
              'Transparent & ethical process',
            ]}
            contactHref="/hire-from-pakistan"
          />
        </div>
      </section>

      {/* Value props */}
      <section className="container py-16 md:py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.08}>
              <div>
                <div className="mb-3 h-1 w-10 rounded-full bg-[var(--gold)]" />
                <h3 className="font-semibold">{v.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-primary text-primary-foreground">
        <div className="container grid gap-8 py-14 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.1} className="text-center">
              <p className="text-5xl font-bold">
                <CountUp to={s.n} suffix="+" />
              </p>
              <p className="mt-2 text-primary-foreground/80">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="container py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">What we do</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Complete recruitment solutions</h2>
            </div>
            <Link href="/services" className="text-sm font-medium text-primary hover:underline">All services →</Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(services.docs as Record<string, any>[]).map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.08}>
              <Link href={`/services/${s.slug}`} className="group block h-full">
                <Card className="h-full transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                      <ServiceIcon name={s.title} className="h-7 w-7" />
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wide text-[var(--gold)]">{s.serviceType}</span>
                    <CardTitle className="mt-1 text-lg">{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{s.summary}</CardContent>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container py-20">
          <Reveal>
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">How it works</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">From requirement to arrival</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <ProcessSteps />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Latest jobs */}
      <section className="container py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Careers</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Latest overseas openings</h2>
            </div>
            <Link href="/jobs" className="text-sm font-medium text-primary hover:underline">View all jobs →</Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(jobs.docs as Record<string, any>[]).map((job, i) => {
            const country = typeof job.country === 'object' ? job.country?.name : ''
            return (
              <Reveal key={job.id} delay={(i % 3) * 0.08}>
                <Card className="flex h-full flex-col transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
                        <span className="h-2 w-2 rounded-full bg-green-500" /> Open
                      </div>
                      {country && <Flag name={country} className="h-4 w-6" />}
                    </div>
                    <CardTitle className="mt-2 text-lg leading-snug">
                      <Link href={`/jobs/${job.slug}`} className="hover:underline">{job.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-1 text-sm text-muted-foreground">
                    <div>📍 {[job.city, country].filter(Boolean).join(', ')}</div>
                    {salaryLabel(job) && <div className="font-medium text-[var(--gold)]">{salaryLabel(job)}</div>}
                  </CardContent>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Industries — 3D photo cards */}
      <section className="border-t border-border bg-secondary/40">
        <div className="container py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Sectors we cover</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Industries &amp; professions</h2>
              </div>
              <Link href="/industries" className="text-sm font-medium text-primary hover:underline">All industries →</Link>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {(industries.docs as Record<string, any>[]).slice(0, 8).map((ind, i) => (
              <Reveal key={ind.id} delay={(i % 4) * 0.06}>
                <Tilt3D max={6}>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="group relative block h-44 overflow-hidden rounded-2xl border border-border shadow-lg md:h-52"
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
                      <p className="font-semibold leading-snug">{ind.title}</p>
                      <p className="mt-0.5 text-xs text-white/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        View roles →
                      </p>
                    </div>
                  </Link>
                </Tilt3D>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Countries — 3D flag cards */}
      <section className="container py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Where we place</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Destination countries</h2>
            </div>
            <Link href="/countries" className="text-sm font-medium text-primary hover:underline">All countries →</Link>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {(countries.docs as Record<string, any>[]).map((c, i) => (
            <Reveal key={c.id} delay={(i % 4) * 0.06}>
              <Tilt3D max={6}>
                <Link
                  href={`/countries/${c.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div aria-hidden className="absolute -bottom-5 -right-7 opacity-[0.08] transition-opacity duration-300 group-hover:opacity-20">
                    <Flag name={c.name} className="h-24 w-36" />
                  </div>
                  <Flag name={c.name} className="h-10 w-[3.75rem] rounded-md shadow-md" />
                  <p className="mt-4 font-semibold">{c.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{REGION_LABELS[c.region] || 'Worldwide'}</p>
                  <p className="mt-3 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Open roles →
                  </p>
                </Link>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.docs.length > 0 && (
        <section className="container py-20">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Testimonials</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Trusted by candidates &amp; employers</h2>
          </Reveal>
          <div className="mt-10">
            <TestimonialsCarousel
              items={(testimonials.docs as Record<string, any>[]).map((t) => ({
                name: t.name,
                roleOrCompany: t.roleOrCompany,
                quote: t.quote,
                rating: Number(t.rating) || 5,
              }))}
            />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="container flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Ready to hire, or ready to work abroad?</h2>
              <p className="mt-2 max-w-xl text-primary-foreground/80">
                Whether you’re an employer needing a workforce or a candidate seeking an overseas role,
                Falisha Manpower makes it simple.
              </p>
            </div>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full"><Link href="/fill-a-vacancy">Hire talent</Link></Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full"><Link href="/jobs">Find a job</Link></Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Falisha Manpower | Overseas Recruitment Agency in Pakistan',
    description:
      'Falisha Manpower places skilled Pakistani professionals with employers across the Gulf and beyond, with full visa, attestation and mobilisation support.',
  }
}
