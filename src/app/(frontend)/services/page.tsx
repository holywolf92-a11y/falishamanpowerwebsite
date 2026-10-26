import type { Metadata } from 'next/types'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ShieldCheck, Clock, Globe2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Reveal from '@/components/visual/Reveal'
import { ReadMore } from '@/components/visual/ReadMore'
import { SmoothScrollProvider } from '@/components/visual/SmoothScrollProvider'
import { ScrollProgress } from '@/components/visual/ScrollProgress'
import { KineticHeading } from '@/components/visual/KineticHeading'
import { SpotlightCard } from '@/components/visual/SpotlightCard'
import { Magnetic } from '@/components/visual/Magnetic'
import { ServiceIcon } from '@/components/visual/ServiceIcon'
import { SERVICES } from '@/data/serviceDetail'

const display = 'font-display'

const GROUPS: { key: string; label: string; blurb: string }[] = [
  { key: 'recruitment', label: 'Recruitment', blurb: 'Sourcing and placing the right people — from a single executive to a project-scale workforce.' },
  { key: 'advisory', label: 'Advisory & Support', blurb: 'Everything around the hire — visas, attestation, payroll, HR, training and travel, handled end to end.' },
]

export const metadata: Metadata = {
  alternates: { canonical: '/services' },
  title: 'Recruitment & Advisory Services in Pakistan | Falisha Manpower',
  description:
    'End-to-end overseas recruitment plus visas, attestation, payroll, HR, training and travel — one BEOE-licensed partner (OEP 4035) from first requirement to arrival on site.',
}

export default function ServicesPage() {
  const gridBg = {
    backgroundImage:
      'linear-gradient(to right, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px)',
    backgroundSize: '44px 44px',
    maskImage: 'radial-gradient(120% 90% at 85% 10%, black, transparent 72%)',
    WebkitMaskImage: 'radial-gradient(120% 90% at 85% 10%, black, transparent 72%)',
  } as const

  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <div>
        {/* Hero */}
        <section className="relative overflow-hidden bg-background text-foreground">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70" style={gridBg} />
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--gold)]/20 blur-3xl" />
          <div className="container relative py-16 md:py-24">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">What we do</p>
            </Reveal>
            <KineticHeading
              as="h1"
              igniteWord="advisory"
              lines={['Recruitment &', 'advisory services']}
              className={`${display} mt-3 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.25rem]`}
            />
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
                End-to-end overseas recruitment and the full advisory layer around it — sourcing, screening, visas,
                attestation, payroll, HR, training and travel. One BEOE-licensed partner (OEP 4035) from first requirement
                to arrival on site.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
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
            </Reveal>
          </div>
        </section>

        <div className="container py-16 md:py-20">
          <div className="space-y-14">
            {GROUPS.map((g) => {
              const list = SERVICES.filter((s) => s.serviceType === g.key)
              if (list.length === 0) return null
              return (
                <div key={g.key}>
                  <Reveal className="max-w-2xl">
                    <KineticHeading
                      as="h2"
                      lines={[g.label]}
                      className={`${display} text-2xl font-semibold tracking-tight md:text-3xl`}
                    />
                    <p className="mt-2 text-muted-foreground">{g.blurb}</p>
                  </Reveal>
                  <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {list.map((s, i) => (
                      <Reveal key={s.slug} delay={(i % 3) * 0.05} className="h-full">
                        <SpotlightCard className="h-full">
                          <Link href={`/services/${s.slug}`} className="flex h-full flex-col p-6">
                            <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-muted-foreground/40 transition group-hover:text-primary" />
                            <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                              <ServiceIcon name={s.title} className="h-7 w-7" />
                            </div>
                            <h3 className="text-lg font-semibold">{s.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>
                          </Link>
                        </SpotlightCard>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* SEO content */}
        <section className="border-t border-border bg-secondary/30">
          <div className="container max-w-4xl py-16 md:py-20">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Why Falisha</p>
              <h2 className={`${display} mt-2 text-2xl font-semibold leading-snug tracking-tight md:text-3xl`}>
                One licensed partner for overseas recruitment from Pakistan
              </h2>
              <ReadMore className="mt-4" collapsedHeight={116}>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Falisha Manpower is a BEOE-licensed Overseas Employment Promoter (OEP Licence No. 4035) providing
                    complete recruitment and advisory services from Pakistan. Whether you are hiring a single specialist
                    or a project-scale workforce of several hundred, we cover the entire journey in one place — workforce
                    planning, nationwide sourcing, screening and trade testing, interviews, medicals, work visa
                    processing, document attestation, Protector of Emigrants clearance, ticketing and on-time
                    mobilisation.
                  </p>
                  <p>
                    Our{' '}
                    <Link href="/services/bulk--mass-recruitment" className="font-medium text-primary hover:underline">bulk &amp; mass recruitment</Link>,{' '}
                    <Link href="/services/permanent-recruitment" className="font-medium text-primary hover:underline">permanent recruitment</Link> and{' '}
                    <Link href="/services/executive-search" className="font-medium text-primary hover:underline">executive search</Link>{' '}
                    services place skilled, semi-skilled and professional Pakistani workers across construction, oil
                    &amp; gas, engineering, healthcare, hospitality, IT, transport and manufacturing — for employers in
                    the Gulf, Türkiye and Europe. Around every hire, our advisory team handles{' '}
                    <Link href="/services/work-visa-processing" className="font-medium text-primary hover:underline">work visa processing</Link>,{' '}
                    <Link href="/services/document-attestation" className="font-medium text-primary hover:underline">document attestation</Link>,{' '}
                    <Link href="/services/payroll-outsourcing" className="font-medium text-primary hover:underline">payroll outsourcing</Link> and{' '}
                    <Link href="/services/hr-management" className="font-medium text-primary hover:underline">HR management</Link>.
                  </p>
                  <p>
                    Every placement is ethical, transparent and fully compliant — built on the Employer Pays Principle,
                    with no hidden fees and no passport retention. Explore the{' '}
                    <Link href="/countries" className="font-medium text-primary hover:underline">countries we recruit for</Link> and the{' '}
                    <Link href="/industries" className="font-medium text-primary hover:underline">industries we serve</Link>, or{' '}
                    <Link href="/hire-from-pakistan" className="font-medium text-primary hover:underline">request a workforce</Link> today.
                  </p>
                </div>
              </ReadMore>
            </Reveal>
          </div>
        </section>

        {/* CTA band */}
        <section className="container pb-20">
          <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-10 text-background md:px-12 md:py-14">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--gold)]/15 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-[var(--primary)]/15 blur-3xl" />
            <div className="relative flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className={`${display} text-2xl font-semibold tracking-tight md:text-3xl`}>Not sure which service you need?</h2>
                <p className="mt-2 text-background/70">
                  Tell us about your requirement and our team will recommend the right approach — recruitment, advisory or both.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Magnetic>
                  <Button asChild size="lg" className="rounded-full bg-[var(--gold)] px-6 text-[var(--navy)] hover:brightness-105">
                    <Link href="/fill-a-vacancy">Request a service</Link>
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button asChild size="lg" variant="outline" className="rounded-full border-background/30 bg-transparent px-6 text-background hover:bg-background/10 hover:text-background">
                    <Link href="/contact">
                      Contact us <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                </Magnetic>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SmoothScrollProvider>
  )
}
