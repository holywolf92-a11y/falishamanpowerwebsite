import type { Metadata } from 'next/types'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ArrowRight, ClipboardCheck, Plane, UsersRound, Layers, CheckCircle2, Sparkles, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utilities/ui'
import { HeroShowcase } from '@/components/visual/HeroShowcase'
import { CredentialTicker } from '@/components/visual/CredentialTicker'
import { CircleBadge } from '@/components/visual/CircleBadge'
import { Tilt3D } from '@/components/visual/Tilt3D'
import { TrustAward } from '@/components/visual/TrustAward'
import { CredentialsOrbit } from '@/components/visual/CredentialsOrbit'
import { ClientLogos } from '@/components/visual/ClientLogos'
import { TurkeyGlobe } from '@/components/visual/TurkeyGlobe'
import { LogoMarquee } from '@/components/visual/LogoMarquee'
import { CLIENT_LOGOS, industryImage } from '@/utilities/sectionImages'
import { ReadMore } from '@/components/visual/ReadMore'
import Reveal, { CountUp } from '@/components/visual/Reveal'
import { SmoothScrollProvider } from '@/components/visual/SmoothScrollProvider'
import { ScrollProgress } from '@/components/visual/ScrollProgress'
import { KineticHeading } from '@/components/visual/KineticHeading'
import { SpotlightCard } from '@/components/visual/SpotlightCard'
import { Magnetic } from '@/components/visual/Magnetic'
import { ServiceIcon } from '@/components/visual/ServiceIcon'
import { IndustryIcon } from '@/components/visual/IndustryIcon'
import { TestimonialsCarousel } from '@/components/visual/TestimonialsCarousel'
import { CountryMarquee } from '@/components/visual/CountryMarquee'
import { Flag } from '@/components/visual/Flag'
import { ProcessSteps } from '@/components/visual/ProcessSteps'
import { FAQAccordion } from '@/components/visual/FAQAccordion'
import { HOME_FAQS, faqSchema } from '@/data/faqs'
import { COUNTRY_CONTENT } from '@/data/countryContent'
import { INDUSTRY_ROLES } from '@/data/industryContent'

export const dynamic = 'force-dynamic'

const display = 'font-display'

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
    eyebrow: 'BEOE-licensed · OEP 4035',
    titleLead: 'Best ',
    titleAccent: 'Manpower Recruitment',
    titleRest: ' Agency in Pakistan.',
    subtitle:
      '15+ years of ethical, government-licensed overseas recruitment — placing skilled Pakistani talent with employers across the Gulf, Europe and Asia.',
  },
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
    eyebrow: 'Our speciality market',
    titleLead: 'Skilled talent for ',
    titleAccent: 'Türkiye’s',
    titleRest: ' top employers.',
    subtitle:
      'One of our strongest corridors — we supply skilled and technical Pakistani workers to leading Turkish construction, EPC, energy and manufacturing companies.',
  },
  {
    eyebrow: 'Ethical recruitment',
    titleLead: 'Transparent, ',
    titleAccent: 'zero-fee',
    titleRest: ' hiring you can trust.',
    subtitle: 'A compliant, honest process for candidates and employers across every market we serve.',
  },
]

// Destination markets grouped by region, sourced from code-level content so the
// home page lists every market (including those without a CMS record yet).
const REGION_ORDER: { key: string; label: string }[] = [
  { key: 'gulf', label: 'Gulf / GCC' },
  { key: 'europe', label: 'Europe' },
  { key: 'mena', label: 'Middle East & North Africa' },
  { key: 'east-asia', label: 'East Asia' },
  { key: 'sea', label: 'Southeast Asia' },
  { key: 'central-asia', label: 'Central Asia & Caucasus' },
]

const DESTINATIONS_BY_REGION = REGION_ORDER.map((r) => ({
  ...r,
  countries: Object.entries(COUNTRY_CONTENT)
    // england & scotland 301-redirect to /countries/united-kingdom — don't count or link them.
    .filter(([slug, c]) => c.name && c.region === r.key && slug !== 'england' && slug !== 'scotland')
    .map(([slug, c]) => ({ slug, name: c.name as string, intro: c.intro }))
    .sort((a, b) => a.name.localeCompare(b.name)),
})).filter((r) => r.countries.length > 0)

const ALL_DESTINATIONS = Object.entries(COUNTRY_CONTENT)
  .filter(([slug, c]) => c.name && slug !== 'england' && slug !== 'scotland')
  .map(([slug, c]) => ({ name: c.name as string, href: `/countries/${slug}` }))
  .sort((a, b) => a.name.localeCompare(b.name))

const MARKET_COUNT = ALL_DESTINATIONS.length

// Home destinations: a block per region, each with a large keyword heading + a
// few country cards. These headings mirror the /countries region sections.
const REGION_HEADINGS: Record<string, string> = {
  gulf: 'Recruitment Agency in Pakistan for the GCC',
  europe: 'Recruitment Agency in Pakistan for Europe',
  mena: 'Recruitment Agency in Pakistan for the Middle East & North Africa',
  'central-asia': 'Recruitment Agency in Pakistan for Central Asia & the Caucasus',
  'east-asia': 'Recruitment Agency in Pakistan for East Asia',
  sea: 'Recruitment Agency in Pakistan for Southeast Asia',
}
// A short, distinct editorial line under each region heading.
const REGION_INTRO: Record<string, string> = {
  gulf: 'The Gulf is our heartland. For more than 15 years we have deployed skilled and semi-skilled Pakistani workers across Saudi Arabia, the UAE, Qatar, Kuwait, Oman and Bahrain — for construction, oil and gas, hospitality, healthcare and facilities management.',
  europe:
    'Our fastest-growing corridor. As Europe’s workforce ages, employers from the UK and Germany to Romania, Poland, Portugal and the Balkans hire Pakistani trades, drivers and factory staff on regulated, EU-protected contracts.',
  mena: 'Across the wider Middle East and North Africa — Iraq, Jordan and beyond — we supply construction crews, oilfield labour and industrial workers for major projects and long-established employers.',
  'central-asia':
    'From Azerbaijan to the Caspian and the Caucasus, expanding energy, construction and infrastructure projects draw skilled Pakistani manpower through structured, employer-led recruitment.',
  'east-asia':
    'Japan and South Korea offer some of the most sought-after overseas opportunities, with government-backed skilled-worker routes we prepare candidates for carefully, patiently and ethically.',
  sea: 'Malaysia and the wider region recruit Pakistani factory, plantation, construction and service workers at scale, on documented contracts we manage end-to-end from Pakistan.',
}
// Float the biggest markets to the front of each region's preview.
const HOME_FEATURED_FIRST = new Set(['united-kingdom', 'germany', 'romania', 'poland', 'portugal', 'italy'])
const HOME_CARDS_PER_REGION = 6

function DestinationCard({ slug, name, intro }: { slug: string; name: string; intro?: string }) {
  return (
    <Link
      href={`/countries/${slug}`}
      className="group relative flex overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* corner flag watermark for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-7 -top-7 rotate-6 opacity-[0.07] transition-all duration-500 group-hover:-rotate-3 group-hover:opacity-[0.14]"
      >
        <Flag name={name} className="h-32 w-44 rounded-lg" />
      </div>
      <div className="relative flex h-full w-full flex-col">
        <Flag name={name} className="h-10 w-[3.7rem] shrink-0 rounded-md shadow-md ring-1 ring-black/5" />
        <h4 className="mt-4 text-lg font-bold leading-snug tracking-tight">
          Recruitment Agency for <span className="text-primary">{name}</span> in Pakistan
        </h4>
        {intro && <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{intro}</p>}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          View {name} roles
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
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

  // Live talent-pool numbers for the headline stats (real, non-zero) — falls
  // back to the Payload collection counts if the portal API is unreachable.
  const PORTAL_API = (
    process.env.NEXT_PUBLIC_PORTAL_API_URL ||
    process.env.PORTAL_API_URL ||
    'https://glorious-flexibility-production.up.railway.app'
  ).replace(/\/$/, '')
  const talent = (await fetch(`${PORTAL_API}/api/talent/stats`, { next: { revalidate: 600 } })
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null)) as null | {
    total_candidates: number
    by_category: unknown[]
    by_country: unknown[]
  }

  // Count of distinct roles we recruit across all sectors — a real, non-zero
  // fallback so the stat never renders "0+" when the live talent feed is empty.
  const roleCount = Object.values(INDUSTRY_ROLES).reduce((sum, r) => sum + (Array.isArray(r) ? r.length : 0), 0)
  const stats = [
    talent?.total_candidates && talent.total_candidates > 0
      ? { n: talent.total_candidates, l: 'Skilled candidates' }
      : { n: roleCount, l: 'Specialist roles & trades' },
    { n: Math.max(MARKET_COUNT, countries.totalDocs, talent?.by_country?.length ?? 0), l: 'Destination countries' },
    { n: Math.max(18, industries.totalDocs, talent?.by_category?.length ?? 0), l: 'Sectors covered' },
  ]

  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <div>
      {/* Hero */}
      <HeroShowcase
        slides={HERO_SLIDES}
        photo={HERO_PHOTO}
        primary={{ href: '/jobs', label: 'Job Opening' }}
        secondary={{ href: '/contact', label: 'Recruit Manpower' }}
      />

      {/* Accreditations & memberships ticker */}
      <CredentialTicker />

      {/* Client logos — partner wall */}
      <section className="border-b border-border bg-secondary/40 py-16 md:py-20">
        <div className="container">
          <ClientLogos logos={CLIENT_LOGOS} />
        </div>
      </section>

      {/* Turkey specialty — focus band */}
      <section className="relative overflow-hidden bg-background py-20 text-foreground md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(to right, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(120% 90% at 85% 10%, black, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(120% 90% at 85% 10%, black, transparent 72%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-4 h-[36rem] w-[36rem] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(227,10,23,0.14), transparent 70%)' }}
        />

        <div className="container relative">
          {/* Heading */}
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <Flag name="Türkiye" className="h-8 w-12 rounded shadow-sm ring-1 ring-border" />
                <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                  Our speciality market
                </p>
              </div>
            </Reveal>
            <KineticHeading
              as="h2"
              igniteWord="Türkiye"
              igniteClassName="text-primary"
              lines={['Türkiye is where', 'we go deepest']}
              className={`${display} mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl`}
            />
          </div>

          {/* Full-width flight-route map */}
          <Reveal delay={0.08}>
            <div className="relative mt-8">
              {/* On phones the wide map is taller and scrolls sideways (swipe Türkiye → Pakistan)
                  so every label stays readable; on sm+ it fits full-width. */}
              <div className="overflow-x-auto overflow-y-hidden rounded-3xl border border-border shadow-2xl shadow-black/25 [scrollbar-width:thin] sm:overflow-hidden">
                <TurkeyGlobe className="block h-[320px] w-auto max-w-none sm:h-auto sm:w-full" />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 w-12 rounded-r-3xl bg-gradient-to-l from-background/70 to-transparent sm:hidden"
              />
              <div className="absolute right-4 top-4 hidden rounded-2xl border border-border bg-card/85 px-4 py-2.5 shadow-lg backdrop-blur-md sm:block">
                <p className="text-xl font-bold leading-none text-[var(--gold)]">15+ yrs</p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">Türkiye corridor</p>
              </div>
              <div className="absolute bottom-4 left-4 hidden rounded-2xl border border-border bg-card/85 px-4 py-2.5 shadow-lg backdrop-blur-md sm:block">
                <p className="text-xl font-bold leading-none text-foreground">OEP 4035</p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">BEOE licensed</p>
              </div>
            </div>
          </Reveal>

          {/* Supporting copy + CTAs */}
          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-muted-foreground">
                  Türkiye is one of our strongest corridors. Falisha Manpower supplies skilled and technical
                  Pakistani workers to leading Turkish construction, EPC, energy and manufacturing companies —
                  managing the full journey from sourcing to on-site deployment.
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {TURKEY_POINTS.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--gold)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-3">
                <Magnetic>
                  <Button asChild className="rounded-full px-6">
                    <Link href="/fill-a-vacancy">Hire from Pakistan for Türkiye</Link>
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-border bg-transparent px-6 text-foreground hover:bg-muted hover:text-foreground"
                  >
                    <Link href="/countries/turkey">Explore Türkiye →</Link>
                  </Button>
                </Magnetic>
              </div>
            </div>
          </Reveal>

          {/* Employer logos */}
          <Reveal delay={0.15}>
            <div className="mt-16 border-t border-border pt-10">
              <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Trusted alongside leading Turkish employers
              </p>
              <LogoMarquee logos={TURKEY_LOGOS} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Country marquee */}
      <div className="border-b border-border bg-secondary/40 py-10">
        <div className="container">
          <CountryMarquee label="We place talent across" items={ALL_DESTINATIONS} />
        </div>
      </div>

      {/* For employers — Hire from Pakistan gateway */}
      <section className="relative overflow-hidden bg-background py-16 text-foreground md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(to right, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(120% 90% at 15% 0%, black, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(120% 90% at 15% 0%, black, transparent 70%)',
          }}
        />
        <div className="container relative grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">For employers</p>
              <h2 className={`${display} mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl`}>
                Hire skilled manpower <span className="text-primary">from Pakistan</span>
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Falisha Manpower manages the complete international hiring lifecycle — from workforce
                planning and nationwide sourcing to assessment, documentation and deployment. BEOE-licensed
                OEP No. 4035.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="/hire-from-pakistan">
                      Employer services <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full border-border bg-transparent text-foreground hover:bg-muted"
                  >
                    <Link href="/fill-a-vacancy">Request workforce</Link>
                  </Button>
                </Magnetic>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {EMPLOYER_HIGHLIGHTS.map(({ Icon, t, d }) => (
                <SpotlightCard key={t} className="h-full" spotlight="var(--primary)">
                  <div className="p-5">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-semibold">{t}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
                  </div>
                </SpotlightCard>
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
              <h2 className={`${display} mt-5 text-3xl font-semibold leading-tight tracking-tight md:text-4xl`}>
                One of the most trusted recruitment agencies{' '}
                <span className="text-primary">in Pakistan</span>
              </h2>
              <ReadMore className="mt-5" collapsedHeight={176}>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    As industries around the world shift toward sustainable, long-term growth, companies
                    increasingly rely on overseas recruitment partners to secure skilled and dependable workers.
                    This is where Falisha Manpower stands out as one of the most trusted overseas recruitment
                    agencies in Pakistan — a Government-licensed Overseas Employment Promoter (OEP Licence No.
                    4035, BEOE-registered) supplying vetted Pakistani manpower to employers across the Gulf,
                    Europe, Central Asia and beyond.
                  </p>
                  <p>
                    With 15+ years of experience and a nationwide sourcing network — a head office in Rawalpindi
                    and branches in Lahore, Karachi, Peshawar and Azad Jammu &amp; Kashmir — we place skilled,
                    semi-skilled and professional workers across every major industry, from construction, oil
                    &amp; gas and engineering to healthcare, hospitality and information technology.
                  </p>
                  <p>
                    We manage the complete recruitment journey in-house: sourcing, screening, trade testing,
                    documentation, medicals, work visa processing, document attestation and on-time mobilisation.
                    Employers deal with a single, accountable partner from the first requirement to arrival on
                    site, while Pakistani workers get a safe, lawful route to genuine overseas employment.
                  </p>
                  <p>
                    Whether you need one specialist, a permanent hire or a project-scale workforce of several
                    hundred, Falisha Manpower delivers compliant, ethical manpower recruitment built on government
                    licensing, transparency and more than 15 years of overseas employment expertise.
                  </p>
                </div>
              </ReadMore>
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
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <Button asChild className="rounded-full px-6">
                    <Link href="/about">Learn more about us</Link>
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button asChild variant="outline" className="rounded-full px-6">
                    <Link href="/services">Our services →</Link>
                  </Button>
                </Magnetic>
              </div>
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
              <p className={`${display} text-5xl font-semibold`}>
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
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">What we do</p>
              <h2 className={`${display} mt-2 text-3xl font-semibold tracking-tight md:text-4xl`}>Complete recruitment solutions</h2>
              <p className="mt-3 text-muted-foreground">
                One BEOE-licensed partner for the entire journey — sourcing and executive search through to
                visas, attestation and large-scale mobilisation.
              </p>
            </div>
            <Link
              href="/services"
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
            >
              All services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(services.docs as Record<string, any>[]).map((s, i) => {
            const isRecruit = /recruit|search|executive/i.test(String(s.serviceType ?? ''))
            return (
              <Reveal key={s.id} delay={(i % 3) * 0.08} className="h-full">
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_22px_48px_-20px_rgba(37,99,235,0.45)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/15 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="relative flex items-start justify-between">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--navy)] to-primary text-white shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                      <ServiceIcon name={s.title} className="h-7 w-7" />
                    </div>
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ring-1',
                        isRecruit
                          ? 'bg-primary/10 text-primary ring-primary/20'
                          : 'bg-[var(--gold)]/10 text-[var(--gold)] ring-[var(--gold)]/25',
                      )}
                    >
                      {s.serviceType}
                    </span>
                  </div>
                  <h3 className="relative mt-5 text-lg font-bold">{s.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
                  <span className="relative mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </Link>
              </Reveal>
            )
          })}
          {/* Tailored-solution CTA — fills the grid and drives enquiries */}
          <Reveal
            delay={0.1}
            className={cn(
              'h-full',
              services.docs.length % 2 === 1 ? 'md:col-span-1' : 'md:col-span-2',
              services.docs.length % 3 === 2
                ? 'lg:col-span-1'
                : services.docs.length % 3 === 1
                  ? 'lg:col-span-2'
                  : 'lg:col-span-3',
            )}
          >
            <Link
              href="/hire-from-pakistan"
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--navy)] to-primary p-6 text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/40"
            >
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full border border-white/15" />
              <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-8 h-56 w-56 rounded-full border border-white/10" />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5" /> Tailored hiring
                </span>
                <h3 className="mt-4 text-xl font-bold leading-snug">Need a custom manpower solution?</h3>
                <p className="mt-2 max-w-md text-sm text-white/85">
                  Tell us your roles, volumes and destination — we&apos;ll build a compliant plan across the
                  Gulf, Europe and Asia.
                </p>
              </div>
              <span className="relative mt-6 inline-flex items-center gap-2 font-semibold">
                Talk to our team
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container py-20">
          <Reveal>
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">How it works</p>
              <h2 className={`${display} mt-2 text-3xl font-semibold tracking-tight md:text-4xl`}>From requirement to arrival</h2>
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
              <h2 className={`${display} mt-2 text-3xl font-semibold tracking-tight md:text-4xl`}>Latest overseas openings</h2>
            </div>
            <Link href="/jobs" className="text-sm font-medium text-primary hover:underline">View all jobs →</Link>
          </div>
        </Reveal>
        {jobs.docs.length > 0 ? (
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
        ) : (
          <div className="mt-10 rounded-2xl border border-border bg-secondary/40 p-8 text-center md:p-10">
            <h3 className="text-lg font-semibold">New roles are posted regularly</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Register your interest and we&apos;ll contact you the moment a matching overseas position opens.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href="/upload-cv">Register your interest</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/fill-a-vacancy">Hire talent</Link>
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Industries & roles — "Best Manpower Recruitment Agency in Pakistan" */}
      <section className="border-t border-border bg-secondary/40">
        <div className="container py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Sectors &amp; roles</p>
                <h2 className={`${display} mt-2 text-3xl font-semibold tracking-tight md:text-4xl`}>
                  Best Manpower Recruitment Agency in Pakistan
                </h2>
                <p className="mt-3 text-muted-foreground">
                  We source, screen and deploy skilled Pakistani talent across every major sector — explore the roles we
                  recruit for in each.
                </p>
              </div>
              <Link href="/industries" className="text-sm font-medium text-primary hover:underline">
                All industries →
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(industries.docs as Record<string, any>[])
              .filter((ind) => INDUSTRY_ROLES[ind.slug]?.length)
              .slice(0, 9)
              .map((ind, i) => {
                const roles = INDUSTRY_ROLES[ind.slug] || []
                return (
                  <Reveal key={ind.id} delay={(i % 3) * 0.06}>
                    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                      <div className="relative h-44 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={industryImage(ind.title)}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0"
                          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.28) 24%, transparent 55%)' }}
                        />
                        <div className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-lg bg-black/30 text-white backdrop-blur-sm">
                          <IndustryIcon name={ind.title} className="h-5 w-5" />
                        </div>
                        <p className="absolute inset-x-4 bottom-3 text-xl font-bold text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.7)]">
                          {ind.title} Jobs
                        </p>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <ul className="space-y-2 text-base text-muted-foreground">
                          {roles.slice(0, 5).map((r) => (
                            <li key={r} className="flex items-start gap-2.5">
                              <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              {r}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={`/industries/${ind.slug}`}
                          className="mt-5 inline-block text-[15px] font-semibold text-primary hover:underline"
                        >
                          All {ind.title} roles →
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
          </div>
        </div>
      </section>

      {/* Destinations — featured GCC blocks + breadth, full list on /countries */}
      <section className="relative overflow-hidden border-y border-border bg-gradient-to-b from-secondary/50 via-background to-background py-20 md:py-24">
        {/* grid pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(to right, color-mix(in oklch, var(--foreground) 5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 5%, transparent) 1px, transparent 1px)',
            backgroundSize: '46px 46px',
            maskImage: 'radial-gradient(120% 70% at 50% 0%, black, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(120% 70% at 50% 0%, black, transparent 72%)',
          }}
        />
        {/* brand glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--primary) 13%, transparent), transparent 70%)',
          }}
        />

        <div className="container relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                <Globe className="h-4 w-4" /> Where we place
              </p>
            </Reveal>
            <KineticHeading
              as="h2"
              igniteWord={`${MARKET_COUNT}+ markets`}
              igniteClassName="text-primary"
              lines={['Recruitment across', `${MARKET_COUNT}+ markets`]}
              className={`${display} mt-3 text-3xl font-semibold tracking-tight md:text-4xl`}
            />
            <Reveal delay={0.1}>
              <p className="mt-4 text-muted-foreground">
                We source, screen and deploy skilled Pakistani talent across the Gulf, Europe, Asia and beyond —
                tailored to each market&apos;s labour rules and sector demand.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 space-y-14 md:space-y-16">
            {DESTINATIONS_BY_REGION.map((region) => {
              const shown = [...region.countries]
                .sort((a, b) => {
                  const fa = HOME_FEATURED_FIRST.has(a.slug) ? 0 : 1
                  const fb = HOME_FEATURED_FIRST.has(b.slug) ? 0 : 1
                  return fa - fb || a.name.localeCompare(b.name)
                })
                .slice(0, HOME_CARDS_PER_REGION)
              const hasMore = region.countries.length > shown.length
              return (
                <Reveal key={region.key}>
                  <div>
                    <div className="text-center">
                      <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                        {region.label} · {region.countries.length}{' '}
                        {region.countries.length === 1 ? 'country' : 'countries'}
                      </p>
                      <h3 className={`${display} mt-2 text-2xl font-semibold leading-tight tracking-tight md:text-[2rem]`}>
                        {REGION_HEADINGS[region.key] ?? `Recruitment Agency in Pakistan for ${region.label}`}
                      </h3>
                      {REGION_INTRO[region.key] && (
                        <p className="mx-auto mt-4 max-w-2xl text-balance leading-relaxed text-muted-foreground">
                          {REGION_INTRO[region.key]}
                        </p>
                      )}
                    </div>
                    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {shown.map((cc) => (
                        <DestinationCard key={cc.slug} slug={cc.slug} name={cc.name} intro={cc.intro} />
                      ))}
                    </div>
                    {hasMore && (
                      <div className="mt-6 text-center">
                        <Link
                          href={`/countries#${region.key}`}
                          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                        >
                          View all {region.countries.length} {region.label} destinations
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>

          <div className="mt-14 flex justify-center">
            <Magnetic>
              <Link
                href="/countries"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
              >
                View all {MARKET_COUNT} destinations
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.docs.length > 0 && (
        <section className="container py-20">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Testimonials</p>
            <h2 className={`${display} mt-2 text-3xl font-semibold tracking-tight md:text-4xl`}>Trusted by candidates &amp; employers</h2>
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

      {/* FAQ */}
      <section className="container py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(HOME_FAQS)) }}
        />
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">FAQ</p>
          <h2 className={`${display} mt-2 text-3xl font-semibold tracking-tight md:text-4xl`}>Frequently asked questions</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Answers for candidates seeking overseas jobs and for employers hiring skilled manpower from Pakistan.
          </p>
        </Reveal>
        <div className="mt-10 max-w-3xl">
          <FAQAccordion items={HOME_FAQS} />
          <Link
            href="/faq"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            View all FAQs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="container flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <div>
              <h2 className={`${display} text-3xl font-semibold tracking-tight`}>Ready to hire, or ready to work abroad?</h2>
              <p className="mt-2 max-w-xl text-primary-foreground/80">
                Whether you’re an employer needing a workforce or a candidate seeking an overseas role,
                Falisha Manpower makes it simple.
              </p>
            </div>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <Button asChild size="lg" variant="secondary" className="rounded-full"><Link href="/fill-a-vacancy">Hire talent</Link></Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="secondary" className="rounded-full"><Link href="/jobs">Find a job</Link></Button>
            </Magnetic>
          </div>
        </div>
      </section>
      </div>
    </SmoothScrollProvider>
  )
}

export function generateMetadata(): Metadata {
  return {
    alternates: { canonical: '/' },
    title: 'Falisha Manpower | Overseas Recruitment Agency in Pakistan',
    description:
      'Falisha Manpower places skilled Pakistani professionals with employers across the Gulf and beyond, with full visa, attestation and mobilisation support.',
  }
}
