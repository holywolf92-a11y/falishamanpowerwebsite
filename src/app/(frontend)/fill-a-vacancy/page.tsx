import type { Metadata } from 'next/types'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Plane, Search, ShieldCheck, Users } from 'lucide-react'
import Reveal from '@/components/visual/Reveal'
import LiveTalentCount from '@/components/visual/LiveTalentCount'
import { EmployerActionPanel } from '@/components/EmployerActionPanel'

export const dynamic = 'force-dynamic'

const EMPLOYER_EMAIL = 'info@falishamanpower.com'
const WHATSAPP = 'https://wa.me/923005547806'

const TRUST = ['BEOE-licensed · OEP No. 4035', '22+ years · since 2004', 'End-to-end service']

const STEPS = [
  {
    icon: MessageCircle,
    n: '01',
    t: 'Share your requirement',
    d: 'Browse and enquire, or send us the roles, numbers and destination. We confirm the scope with you.',
  },
  {
    icon: Search,
    n: '02',
    t: 'We source & screen',
    d: 'We shortlist pre-vetted, trade-tested candidates from our nationwide network.',
  },
  {
    icon: Users,
    n: '03',
    t: 'You interview & select',
    d: 'Review profiles and interview your shortlist — in person, by video or by proxy.',
  },
  {
    icon: Plane,
    n: '04',
    t: 'We mobilise',
    d: 'Documentation, medicals, visa, attestation and travel — all handled end-to-end.',
  },
]

export default function FillAVacancyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background text-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--gold)]/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 left-1/4 h-80 w-80 rounded-full bg-[var(--primary)]/25 blur-3xl"
        />
        <div className="container relative pb-28 pt-14 text-center md:pb-32 md:pt-20">
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">For employers</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Hire skilled, <span className="text-[var(--gold)]">work-ready talent</span> from Pakistan
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Browse <LiveTalentCount className="font-semibold text-foreground" /> pre-screened candidates, or tell us
              exactly what you need. Our BEOE-licensed team handles sourcing, screening, visas and mobilisation —
              end to end.
            </p>
            <ul className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
              {TRUST.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground shadow-sm"
                >
                  <ShieldCheck className="h-4 w-4 text-[var(--gold)]" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Action panel — floats over the hero: Browse (default) or Request */}
      <div className="container relative -mt-16 md:-mt-20">
        <Reveal>
          <EmployerActionPanel />
        </Reveal>
      </div>

      <div className="container py-16 md:py-24">
        {/* How we deliver */}
        <section>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">How we deliver</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">From requirement to mobilisation</h2>
            <p className="mt-3 text-muted-foreground">
              One licensed partner for the entire process — you stay in control, we do the heavy lifting.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-primary-foreground">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span className="text-2xl font-bold text-muted-foreground/25">{s.n}</span>
                  </div>
                  <h3 className="mt-4 font-semibold">{s.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Closing contact strip */}
        <section className="mt-16 md:mt-24">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-foreground px-6 py-10 text-center text-background md:px-12 md:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--gold)]/15 blur-3xl"
            />
            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Prefer to talk it through first?</h2>
              <p className="mx-auto mt-3 max-w-xl text-background/70">
                Tell us about your project and we&apos;ll recommend the right sourcing approach — no obligation.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-[var(--navy)] transition hover:brightness-105"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp us
                </a>
                <a
                  href={`mailto:${EMPLOYER_EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-full border border-background/25 px-6 py-3 text-sm font-semibold transition hover:bg-background/10"
                >
                  {EMPLOYER_EMAIL}
                </a>
                <Link
                  href="/hire-from-pakistan"
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-background/80 transition hover:text-background"
                >
                  Employer services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    alternates: { canonical: '/fill-a-vacancy' },
    title: 'Fill a Vacancy | Falisha Manpower',
    description:
      'Employers: browse 5,000+ pre-screened candidates or request skilled manpower from Pakistan. Falisha Manpower (BEOE OEP 4035) sources, screens and mobilises your team end-to-end.',
  }
}
