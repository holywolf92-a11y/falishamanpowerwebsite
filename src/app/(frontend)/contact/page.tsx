import type { Metadata } from 'next/types'
import Link from 'next/link'
import { ArrowRight, Mail, MapPin, MessageCircle, Phone, Plane, Search, ShieldCheck, Users } from 'lucide-react'
import Reveal from '@/components/visual/Reveal'
import LiveTalentCount from '@/components/visual/LiveTalentCount'
import { EmployerActionPanel } from '@/components/EmployerActionPanel'

export const dynamic = 'force-dynamic'

const EMAIL = 'info@falishamanpower.com'
const PHONE = '+92 330 3333335'
const LANDLINE = '+92 51 4927145-6'
const WHATSAPP = 'https://wa.me/923005547806'
const ADDRESS = 'Umer Farooq Plaza, Offices 10, 11 & 12, First Floor, Murree Road, Chandni Chowk, Rawalpindi, Pakistan'
const BRANCHES = 'Lahore · Karachi · Peshawar · AJK'

const TRUST = ['BEOE-licensed · OEP No. 4035', '15+ years · since 2011', 'End-to-end service']

const STEPS = [
  { icon: MessageCircle, n: '01', t: 'Share your requirement', d: 'Browse and enquire, or send us the roles, numbers and destination. We confirm the scope with you.' },
  { icon: Search, n: '02', t: 'We source & screen', d: 'We shortlist pre-vetted, trade-tested candidates from our nationwide network.' },
  { icon: Users, n: '03', t: 'You interview & select', d: 'Review profiles and interview your shortlist — in person, by video or by proxy.' },
  { icon: Plane, n: '04', t: 'We mobilise', d: 'Documentation, medicals, visa, attestation and travel — all handled end-to-end.' },
]

const CONTACT: { icon: typeof Phone; label: string; value: string; href: string; ext?: boolean }[] = [
  { icon: Phone, label: 'Mobile', value: PHONE, href: `tel:${PHONE.replace(/[\s-]/g, '')}` },
  { icon: Phone, label: 'Landline', value: LANDLINE, href: `tel:${LANDLINE.replace(/[\s-]/g, '')}` },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: WHATSAPP, ext: true },
  { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
]

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background text-foreground">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--gold)]/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-10 left-1/4 h-80 w-80 rounded-full bg-[var(--primary)]/25 blur-3xl" />
        <div className="container relative pb-28 pt-14 text-center md:pb-32 md:pt-20">
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Get in touch</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Let&rsquo;s talk — hire <span className="text-[var(--gold)]">work-ready talent</span> from Pakistan
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Whether you&rsquo;re hiring from Pakistan or seeking an overseas role, we&rsquo;re here to help. Browse{' '}
              <LiveTalentCount className="font-semibold text-foreground" /> pre-screened candidates, or tell us exactly
              what you need — our BEOE-licensed team handles sourcing, screening, visas and mobilisation end to end.
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

        {/* Contact details */}
        <section className="mt-16 grid gap-6 md:mt-24 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-foreground px-6 py-10 text-background md:px-10 md:py-12">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--gold)]/15 blur-3xl" />
              <div className="relative">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Talk to our team</h2>
                <p className="mt-3 max-w-xl text-background/70">
                  Tell us about your requirement and we&rsquo;ll recommend the right approach — no obligation.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {CONTACT.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="flex items-center gap-3 rounded-2xl border border-background/15 bg-background/[0.06] px-4 py-3 transition hover:bg-background/10"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-background/10 text-[var(--gold)]">
                        <c.icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] uppercase tracking-wide text-background/55">{c.label}</span>
                        <span className="block truncate font-semibold">{c.value}</span>
                      </span>
                    </a>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/fill-a-vacancy"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-[var(--navy)] transition hover:brightness-105"
                  >
                    Request workforce <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/upload-cv"
                    className="inline-flex items-center gap-2 rounded-full border border-background/25 px-6 py-3 text-sm font-semibold transition hover:bg-background/10"
                  >
                    Upload CV
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Head office */}
          <Reveal delay={0.1} className="h-full">
            <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">Head office</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ADDRESS}</p>
              <p className="mt-4 text-sm">
                <span className="font-semibold">Branch offices:</span>{' '}
                <span className="text-muted-foreground">{BRANCHES}</span>
              </p>
              <div className="mt-auto pt-6">
                <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  Looking for a job? Browse overseas openings <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    alternates: { canonical: '/contact' },
    title: 'Contact | Falisha Manpower',
    description:
      'Contact Falisha Manpower — browse pre-screened candidates or request skilled manpower from Pakistan. Phone, WhatsApp, email and head-office details.',
  }
}
