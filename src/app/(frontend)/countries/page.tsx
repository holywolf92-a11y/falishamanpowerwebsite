import type { Metadata } from 'next/types'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Flag } from '@/components/visual/Flag'
import { COUNTRY_CONTENT } from '@/data/countryContent'

// Destinations are code-defined in COUNTRY_CONTENT (the same source the home
// "Where we place" section uses), so this page renders fully without a DB write
// or connection — every market shows with its own description.

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
    <Link
      href={`/countries/${c.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
    >
      <Flag name={c.name} className="h-11 w-[4.1rem] shrink-0 rounded-md shadow ring-1 ring-black/5" />
      <h3 className="mt-4 text-lg font-bold leading-snug tracking-tight">
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
  )
}

export default function CountriesPage() {
  const regions = REGIONS.map((r) => ({ ...r, countries: countriesIn(r.key) })).filter(
    (r) => r.countries.length > 0,
  )
  const total = regions.reduce((sum, r) => sum + r.countries.length, 0)

  return (
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
        <div className="container relative py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
            Our global reach
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            Overseas recruitment across{' '}
            <span className="text-[var(--gold)]">{total}+ countries</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">
            A BEOE-licensed Pakistani manpower agency (OEP 4035) placing skilled, semi-skilled and
            professional workers with employers across the Gulf, Europe, Asia and beyond — visa,
            attestation and mobilisation included.
          </p>
        </div>
      </section>

      {/* Region sections */}
      <div className="container space-y-16 pt-14 md:space-y-20 md:pt-20">
        {regions.map((region) => (
          <section key={region.key} id={region.key} className="scroll-mt-24">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                {region.label} · {region.countries.length}{' '}
                {region.countries.length === 1 ? 'country' : 'countries'}
              </p>
              <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                {region.heading}
              </h2>
              <p className="mt-3 text-muted-foreground">{region.intro}</p>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {region.countries.map((c) => (
                <CountryCard key={c.slug} c={c} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="container mt-16 md:mt-20">
        <div className="rounded-3xl bg-primary px-6 py-10 text-center text-primary-foreground shadow-xl shadow-primary/25 md:px-10 md:py-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Don’t see your country?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            We recruit for employers worldwide. Tell us your destination and manpower requirements —
            our team will source and mobilise the right Pakistani talent for you.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/hire-from-pakistan"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-primary shadow-sm transition hover:brightness-95"
            >
              Hire from Pakistan
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Contact our team
            </Link>
          </div>
        </div>
      </section>
    </div>
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
