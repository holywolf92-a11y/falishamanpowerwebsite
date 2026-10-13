import type { Metadata } from 'next/types'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Clock, MessageCircle, Plane, Search, ShieldCheck, Users } from 'lucide-react'
import Reveal from '@/components/visual/Reveal'
import { EmployerEnquiryForm } from '@/components/EmployerEnquiryForm'
import { TalentPool } from '@/components/TalentPool'

export const dynamic = 'force-dynamic'

const EMPLOYER_EMAIL = 'info@falishamanpower.com'
const WHATSAPP = 'https://wa.me/923005547806'

const TRUST = [
  { icon: ShieldCheck, label: 'BEOE-licensed', sub: 'OEP No. 4035' },
  { icon: BadgeCheck, label: '22+ years', sub: 'Since 2004' },
  { icon: Clock, label: 'Reply in 1 day', sub: 'Business days' },
]

const STEPS = [
  {
    icon: MessageCircle,
    n: '01',
    t: 'Share your requirement',
    d: 'Tell us the roles, numbers and destination. We confirm the scope and details with you.',
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
      {/* Hero — value prop + the request form, above the fold */}
      <section className="relative overflow-hidden bg-[var(--navy)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--gold)]/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-[var(--primary)]/25 blur-3xl"
        />
        <div className="container relative py-14 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
            {/* Left — value proposition */}
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">For employers</p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                Hire skilled, <span className="text-[var(--gold)]">work-ready talent</span> from Pakistan
              </h1>
              <p className="mt-5 max-w-xl text-lg text-white/70">
                Share your workforce requirement and our BEOE-licensed team sources, screens and mobilises your
                team end-to-end — from shortlisting to visas and travel.
              </p>

              <ul className="mt-7 flex flex-wrap gap-2.5">
                {TRUST.map((t) => (
                  <li
                    key={t.label}
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm"
                  >
                    <t.icon className="h-4 w-4 text-[var(--gold)]" />
                    <span className="font-medium">{t.label}</span>
                    <span className="text-white/45">· {t.sub}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#browse"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Browse available talent
                </a>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </div>
            </Reveal>

            {/* Right — the request form, prominent */}
            <Reveal delay={0.1}>
              <div id="request" className="scroll-mt-28 rounded-2xl shadow-2xl shadow-black/30">
                <EmployerEnquiryForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="container py-16 md:py-20">
        {/* How we deliver */}
        <section>
          <Reveal className="max-w-2xl">
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

        {/* Browse the live talent pool */}
        <section id="browse" className="mt-16 scroll-mt-28 md:mt-24">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Available now</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Browse our live talent pool</h2>
            <p className="mt-3 text-muted-foreground">
              Explore pre-screened candidates by profession, nationality and destination. Found who you need?
              Enquire and we handle screening, documentation, visas and mobilisation.
            </p>
          </Reveal>
          <div className="mt-8">
            <TalentPool />
          </div>
        </section>

        {/* Closing contact strip */}
        <section className="mt-16 md:mt-24">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-[var(--navy)] px-6 py-10 text-center text-white md:px-12 md:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--gold)]/15 blur-3xl"
            />
            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Prefer to talk it through first?</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/70">
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
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
                >
                  {EMPLOYER_EMAIL}
                </a>
                <Link
                  href="/hire-from-pakistan"
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:text-white"
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
      'Employers: request skilled manpower from Pakistan. Share your workforce requirement and Falisha Manpower (BEOE OEP 4035) will source, screen and mobilise your team end-to-end.',
  }
}
