import type { Metadata } from 'next/types'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Globe2,
  HeartHandshake,
  Layers,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Reveal from '@/components/visual/Reveal'
import { WORKERS_PHOTO } from '@/utilities/sectionImages'
import { breadcrumbSchema } from '@/utilities/breadcrumbSchema'

export const dynamic = 'force-dynamic'

const WHY = [
  { icon: ShieldCheck, t: 'Government-licensed & compliant', d: 'A registered Overseas Employment Promoter (OEP Licence No. 4035, BEOE). Every deployment is processed lawfully through Protector of Emigrants clearance.' },
  { icon: Users, t: 'A deep, nationwide talent pool', d: 'A standing candidate network sourced from across Pakistan, with offices in Rawalpindi, Lahore, Karachi, Peshawar and AJK.' },
  { icon: CheckCircle2, t: 'Vetted, trade-tested candidates', d: 'Experience, documents and references verified, and workers trade-tested to your specification before you interview.' },
  { icon: Layers, t: 'End-to-end, from sourcing to site', d: 'Sourcing, screening, documentation, medicals, visas, attestation, ticketing and on-time mobilisation — one accountable partner.' },
  { icon: Zap, t: 'Speed at scale', d: 'From a single specialist to a project-scale workforce of several hundred, mobilised quickly without cutting corners.' },
  { icon: HeartHandshake, t: 'Ethical recruitment', d: 'The Employer Pays Principle, no document retention and zero tolerance for forced labour — see our Anti-Trafficking Policy.' },
]

const REACH = [
  { t: 'The Gulf (GCC)', d: 'Saudi Arabia, UAE, Qatar, Kuwait, Oman and Bahrain — our core manpower corridor.' },
  { t: 'Europe', d: 'Türkiye, Romania, Poland and other European labour markets.' },
  { t: 'Asia & Central Asia', d: 'Japan, South Korea, Malaysia and the Central Asian republics.' },
  { t: 'Africa', d: 'Libya and North-African projects.' },
]

export default function AboutPage() {
  const gridBg = {
    backgroundImage:
      'linear-gradient(to right, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px)',
    backgroundSize: '44px 44px',
    maskImage: 'radial-gradient(120% 90% at 85% 10%, black, transparent 72%)',
    WebkitMaskImage: 'radial-gradient(120% 90% at 85% 10%, black, transparent 72%)',
  } as const

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'About us', path: '/about' },
            ]),
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background text-foreground">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70" style={gridBg} />
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--gold)]/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-[var(--primary)]/25 blur-3xl" />
        <div className="container relative py-14 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">About us</p>
              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                One of the most trusted recruitment agencies for{' '}
                <span className="text-primary">Pakistani manpower</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                Falisha Manpower is a Government-licensed overseas recruitment agency in Pakistan (OEP Licence
                No. 4035, BEOE-registered), connecting international employers with skilled, dependable Pakistani
                workers — and connecting Pakistani talent with genuine overseas employment.
              </p>

              <ul className="mt-7 flex flex-wrap gap-2.5">
                {[
                  { icon: ShieldCheck, t: 'BEOE-licensed · OEP 4035' },
                  { icon: Clock, t: '15+ years' },
                  { icon: Globe2, t: 'Gulf · Europe · Asia' },
                ].map((p) => (
                  <li key={p.t} className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground shadow-sm">
                    <p.icon className="h-4 w-4 text-[var(--gold)]" />
                    {p.t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-6">
                  <Link href="/hire-from-pakistan">Hire from Pakistan</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-6">
                  <Link href="/profile">Company profile &amp; brochure →</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative mx-auto w-full max-w-sm">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-black/20 ring-1 ring-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={WORKERS_PHOTO} alt="Falisha Manpower — overseas recruitment from Pakistan" className="block aspect-[4/3] w-full object-cover" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                <div className="absolute -right-3 top-5 rounded-2xl border border-border bg-card/90 px-4 py-2.5 shadow-lg backdrop-blur-md">
                  <p className="text-lg font-bold leading-none text-[var(--gold)]">OEP 4035</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">BEOE licensed</p>
                </div>
                <div className="absolute -bottom-4 left-0 rounded-2xl border border-border bg-card/90 px-4 py-2.5 shadow-lg backdrop-blur-md">
                  <p className="text-lg font-bold leading-none text-foreground">15+ years</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">Overseas recruitment</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="container py-16 md:py-20">
        {/* Who we are */}
        <section className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Who we are</h2>
            <div className="mt-5 space-y-4 text-muted-foreground">
              <p>
                As industries around the world shift toward sustainable, long-term growth, companies increasingly
                rely on overseas recruitment partners to secure skilled and dependable workers. This is where
                Falisha Manpower stands out as one of the most trusted recruitment agencies in Pakistan for
                hiring Pakistani manpower.
              </p>
              <p>
                We are a Government of Pakistan–licensed Overseas Employment Promoter (OEP Licence No. 4035,
                registered with the Bureau of Emigration &amp; Overseas Employment) with over 15 years of
                experience. From our head office in Rawalpindi and branches in Lahore, Karachi, Peshawar and Azad
                Jammu &amp; Kashmir, we run a nationwide sourcing network that reaches skilled, semi-skilled and
                professional talent across the country.
              </p>
              <p>
                Our mission is simple: supply the right people, lawfully and on time, and give Pakistani workers a
                safe, genuine route to overseas employment. We manage the full journey end to end — sourcing,
                screening, trade testing, documentation, medicals, visas, attestation and mobilisation — so
                employers deal with a single, accountable partner from the first requirement to arrival on site.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-28">
              <h3 className="font-semibold">At a glance</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <Fact label="Licence" value="OEP No. 4035 · BEOE-registered" />
                <Fact label="Experience" value="15+ years of overseas recruitment" />
                <Fact label="Head office" value="Rawalpindi, Pakistan" />
                <Fact label="Branches" value="Lahore, Karachi, Peshawar & AJK" />
                <Fact label="Reach" value="Gulf, Europe, Central Asia, Asia & Africa" />
              </dl>
              <Button asChild className="mt-6 w-full rounded-full">
                <Link href="/fill-a-vacancy">Request workforce</Link>
              </Button>
              <Button asChild variant="outline" className="mt-2.5 w-full rounded-full">
                <Link href="/our-team">Meet our team</Link>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* What we do */}
        <section className="mt-16 md:mt-20">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">What we do</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Complete overseas recruitment &amp; manpower services</h2>
            <p className="mt-3 text-muted-foreground">
              From high-volume manpower supply to confidential executive search — and the full advisory layer
              around every hire.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-semibold">Recruitment</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Bulk &amp; mass recruitment, permanent and contract hiring, executive search, staffing solutions
                and global mobility — skilled, semi-skilled and professional workers for your projects.
              </p>
              <Link href="/services" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                Explore recruitment services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-semibold">Advisory &amp; support</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Work visa processing, document attestation, payroll outsourcing, HR management, skills training
                and group ticketing — everything around the hire, handled in-house.
              </p>
              <Link href="/services" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                Explore advisory services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="mt-16 md:mt-20">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Why choose Falisha</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Why employers trust us for Pakistani manpower</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.t} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <w.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{w.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{w.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Reach */}
        <section className="mt-16 md:mt-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Our global reach</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Where we place Pakistani workers</h2>
              <p className="mt-4 text-muted-foreground">
                We supply manpower from Pakistan to employers across the Gulf, Europe, Central Asia, Asia and
                Africa. The Gulf remains our core corridor, with growing demand in Türkiye and Europe.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-6">
                  <Link href="/countries">View all destinations</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-6">
                  <Link href="/industries">Industries we serve →</Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid gap-3 sm:grid-cols-2">
                {REACH.map((r) => (
                  <div key={r.t} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold">{r.t}</h3>
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">{r.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </div>

      {/* CTA band */}
      <section className="container pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-10 text-background md:px-12 md:py-12">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--gold)]/15 blur-3xl" />
          <div className="relative flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Hiring from Pakistan, or looking to work abroad?</h2>
              <p className="mt-2 text-background/70">
                Tell us your requirement and our team will source, screen and mobilise the right people — or submit
                your CV to be considered for overseas roles.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-[var(--gold)] px-6 text-[var(--navy)] hover:brightness-105">
                <Link href="/fill-a-vacancy">Request workforce</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-background/30 bg-transparent px-6 text-background hover:bg-background/10 hover:text-background">
                <Link href="/upload-cv">
                  Submit your CV <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
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

export function generateMetadata(): Metadata {
  return {
    alternates: { canonical: '/about' },
    title: 'About Us | Falisha Manpower — Overseas Recruitment Agency in Pakistan',
    description:
      'Falisha Manpower is one of the most trusted overseas recruitment agencies in Pakistan (BEOE OEP 4035) — 15+ years supplying skilled Pakistani manpower to the Gulf, Europe and Asia, end to end.',
  }
}
