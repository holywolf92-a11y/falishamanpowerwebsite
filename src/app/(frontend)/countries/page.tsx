import type { Metadata } from 'next/types'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Flag } from '@/components/visual/Flag'
import Reveal from '@/components/visual/Reveal'
import { ReadMore } from '@/components/visual/ReadMore'
import { SmoothScrollProvider } from '@/components/visual/SmoothScrollProvider'
import { ScrollProgress } from '@/components/visual/ScrollProgress'
import { KineticHeading } from '@/components/visual/KineticHeading'
import { SpotlightCard } from '@/components/visual/SpotlightCard'
import { Magnetic } from '@/components/visual/Magnetic'
import { COUNTRY_CONTENT } from '@/data/countryContent'

// Destinations are code-defined in COUNTRY_CONTENT (the same source the home
// "Where we place" section uses), so this page renders fully without a DB write
// or connection — every market shows with its own description.

const display = 'font-display'

type Region = { key: string; label: string; heading: string; intro: string }

const REGIONS: Region[] = [
  {
    key: 'gulf',
    label: 'Gulf / GCC',
    heading: 'Recruitment Agency in Pakistan for the GCC',
    intro:
      'We understand the specific labour rules, visa processes and sector demands of each Gulf state. Whether you are hiring in Saudi Arabia, the UAE, Qatar, Kuwait, Bahrain or Oman, Falisha Manpower sources, screens and mobilises skilled Pakistani workers tailored to your market.',
  },
  {
    key: 'europe',
    label: 'Europe',
    heading: 'Recruitment Agency in Pakistan for Europe',
    intro:
      'From Skilled Worker and seasonal routes to EU work permits, we place Pakistani professionals and tradespeople with European employers — managing sponsorship paperwork, attestation and mobilisation end to end.',
  },
  {
    key: 'mena',
    label: 'Middle East & North Africa',
    heading: 'Recruitment Agency in Pakistan for the Middle East & North Africa',
    intro:
      'Across the wider Middle East and North Africa, we supply skilled and semi-skilled Pakistani manpower for oil & gas, construction and infrastructure projects, in line with each country’s work-permit rules.',
  },
  {
    key: 'central-asia',
    label: 'Central Asia & Caucasus',
    heading: 'Recruitment Agency in Pakistan for Central Asia & the Caucasus',
    intro:
      'In the energy and construction corridors of Central Asia and the Caucasus, we deploy skilled Pakistani workers for oil & gas, engineering and services projects.',
  },
  {
    key: 'east-asia',
    label: 'East Asia',
    heading: 'Recruitment Agency in Pakistan for East Asia',
    intro:
      'We place Pakistani workers with manufacturers and employers across East Asia in manufacturing, caregiving, construction and food processing, under each country’s overseas-worker programmes.',
  },
  {
    key: 'sea',
    label: 'Southeast Asia',
    heading: 'Recruitment Agency in Pakistan for Southeast Asia',
    intro:
      'For Southeast Asian employers, we source skilled and general Pakistani manpower across manufacturing, construction, plantation and services.',
  },
]

type DestCountry = { slug: string; name: string; intro?: string }

function countriesIn(regionKey: string): DestCountry[] {
  return Object.entries(COUNTRY_CONTENT)
    .filter(
      ([slug, c]) => c.name && c.region === regionKey && slug !== 'england' && slug !== 'scotland',
    )
    .map(([slug, c]) => ({ slug, name: c.name as string, intro: c.intro }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

function CountryCard({ c }: { c: DestCountry }) {
  return (
    <SpotlightCard className="h-full">
      <Link href={`/countries/${c.slug}`} className="flex h-full flex-col p-6">
        <Flag name={c.name} className="h-11 w-[4.1rem] shrink-0 rounded-md shadow ring-1 ring-black/5" />
        <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight">
          Recruitment Agency in Pakistan for{' '}
          <span className="text-primary">{c.name}</span>
        </h3>
        {c.intro && (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.intro}</p>
        )}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          View {c.name} roles
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </SpotlightCard>
  )
}

export default function CountriesPage() {
  const regions = REGIONS.map((r) => ({ ...r, countries: countriesIn(r.key) })).filter(
    (r) => r.countries.length > 0,
  )
  const total = regions.reduce((sum, r) => sum + r.countries.length, 0)

  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <div className="pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-navy text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
              maskImage: 'radial-gradient(110% 80% at 50% 0%, black, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(110% 80% at 50% 0%, black, transparent 75%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-24 h-[36rem] w-[36rem] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(79,121,255,0.28), transparent 70%)' }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-10 h-[26rem] w-[26rem] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(244,183,64,0.12), transparent 70%)' }}
          />
          <div className="container relative py-16 md:py-24">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 ring-1 ring-white/15">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" /> Our global reach
              </p>
            </Reveal>
            <KineticHeading
              as="h1"
              igniteWord={`${total}+ countries`}
              lines={['Overseas recruitment', `across ${total}+ countries`]}
              className={`${display} mt-5 max-w-3xl text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl md:text-[3.25rem]`}
            />
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
                A BEOE-licensed Pakistani manpower agency (OEP 4035) placing skilled, semi-skilled and
                professional workers with employers across the Gulf, Europe, Asia and beyond — visa,
                attestation and mobilisation included.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <Link
                    href="/hire-from-pakistan"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 font-semibold text-[var(--navy)] shadow-lg shadow-black/20 transition hover:brightness-105"
                  >
                    Hire from Pakistan <ArrowRight className="h-4 w-4" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/industries"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    Industries we serve →
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Region sections */}
        <div className="container space-y-16 pt-14 md:space-y-20 md:pt-20">
          {regions.map((region) => (
            <section key={region.key} id={region.key} className="scroll-mt-24">
              <Reveal>
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                    {region.label} · {region.countries.length}{' '}
                    {region.countries.length === 1 ? 'country' : 'countries'}
                  </p>
                  <KineticHeading
                    as="h2"
                    lines={[region.heading]}
                    className={`${display} mt-2 text-2xl font-semibold leading-tight tracking-tight md:text-[2rem]`}
                  />
                  <p className="mt-3 text-muted-foreground">{region.intro}</p>
                </div>
              </Reveal>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {region.countries.map((c, i) => (
                  <Reveal key={c.slug} delay={(i % 3) * 0.06}>
                    <CountryCard c={c} />
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* SEO content */}
        <section className="container mt-16 max-w-4xl md:mt-20">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
              Where we recruit
            </p>
            <h2 className={`${display} mt-2 text-2xl font-semibold leading-snug tracking-tight md:text-3xl`}>
              Overseas recruitment destinations for Pakistani manpower
            </h2>
            <ReadMore className="mt-4" collapsedHeight={116}>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Falisha Manpower is a BEOE-licensed Overseas Employment Promoter (OEP Licence No. 4035) deploying
                  skilled, semi-skilled and professional Pakistani workers to employers around the world. The Gulf is our
                  core market — we recruit for{' '}
                  <Link href="/countries/saudi-arabia" className="font-medium text-primary hover:underline">Saudi Arabia</Link>,{' '}
                  <Link href="/countries/united-arab-emirates" className="font-medium text-primary hover:underline">the UAE</Link>,{' '}
                  <Link href="/countries/qatar" className="font-medium text-primary hover:underline">Qatar</Link>,{' '}
                  <Link href="/countries/kuwait" className="font-medium text-primary hover:underline">Kuwait</Link>,{' '}
                  <Link href="/countries/oman" className="font-medium text-primary hover:underline">Oman</Link> and{' '}
                  <Link href="/countries/bahrain" className="font-medium text-primary hover:underline">Bahrain</Link> — across
                  construction, oil &amp; gas, healthcare, hospitality, engineering and more.
                </p>
                <p>
                  Beyond the Gulf, Türkiye is one of our strongest corridors, and we also place workers across Europe,
                  Central Asia and Africa. For each destination we manage the full journey in-house — sourcing, screening
                  and trade testing, medicals, work visa processing, document attestation, Protector of Emigrants
                  clearance, ticketing and on-time mobilisation — so employers deal with one accountable, licensed
                  partner from first requirement to arrival on site.
                </p>
                <p>
                  Explore the{' '}
                  <Link href="/industries" className="font-medium text-primary hover:underline">industries and roles</Link>{' '}
                  we recruit for, see our{' '}
                  <Link href="/services" className="font-medium text-primary hover:underline">recruitment &amp; advisory services</Link>, or{' '}
                  <Link href="/hire-from-pakistan" className="font-medium text-primary hover:underline">request a workforce</Link>{' '}
                  for your country today.
                </p>
              </div>
            </ReadMore>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="container mt-16 md:mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-10 text-center text-primary-foreground shadow-xl shadow-primary/25 md:px-10 md:py-14">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-[var(--gold)]/20 blur-3xl" />
            <div className="relative">
              <h2 className={`${display} text-2xl font-semibold tracking-tight md:text-3xl`}>
                Don’t see your country?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
                We recruit for employers worldwide. Tell us your destination and manpower requirements —
                our team will source and mobilise the right Pakistani talent for you.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Magnetic>
                  <Link
                    href="/hire-from-pakistan"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-primary shadow-sm transition hover:brightness-95"
                  >
                    Hire from Pakistan
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    Contact our team
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SmoothScrollProvider>
  )
}

export function generateMetadata(): Metadata {
  return {
    alternates: { canonical: '/countries' },
    title: 'Destination Countries | Falisha Manpower',
    description:
      'Countries where Falisha Manpower places skilled Pakistani workers — recruitment across the Gulf (GCC), Europe, the Middle East, Central Asia and Asia.',
  }
}
