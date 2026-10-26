import type { Metadata } from 'next/types'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ShieldCheck, Clock, Globe2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tilt3D } from '@/components/visual/Tilt3D'
import Reveal from '@/components/visual/Reveal'
import { ServiceIcon } from '@/components/visual/ServiceIcon'
import { SERVICES } from '@/data/serviceDetail'

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
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background text-foreground">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70" style={gridBg} />
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--gold)]/20 blur-3xl" />
        <div className="container relative py-14 md:py-20">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">What we do</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Recruitment &amp; advisory services</h1>
            <p className="mt-5 text-lg text-muted-foreground">
              End-to-end overseas recruitment and the full advisory layer around it — sourcing, screening, visas,
              attestation, payroll, HR, training and travel. One BEOE-licensed partner (OEP 4035) from first requirement
              to arrival on site.
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
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{g.label}</h2>
                  <p className="mt-2 text-muted-foreground">{g.blurb}</p>
                </Reveal>
                <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((s, i) => (
                    <Reveal key={s.slug} delay={(i % 3) * 0.05}>
                      <Tilt3D max={6}>
                        <Link href={`/services/${s.slug}`} className="group block h-full">
                          <Card className="relative h-full overflow-hidden transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
                            <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-muted-foreground/40 transition group-hover:text-primary" />
                            <CardHeader>
                              <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                                <ServiceIcon name={s.title} className="h-7 w-7" />
                              </div>
                              <CardTitle className="text-lg">{s.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">{s.tagline}</CardContent>
                          </Card>
                        </Link>
                      </Tilt3D>
                    </Reveal>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA band */}
      <section className="container pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-10 text-background md:px-12 md:py-12">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--gold)]/15 blur-3xl" />
          <div className="relative flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Not sure which service you need?</h2>
              <p className="mt-2 text-background/70">
                Tell us about your requirement and our team will recommend the right approach — recruitment, advisory or both.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-[var(--gold)] px-6 text-[var(--navy)] hover:brightness-105">
                <Link href="/fill-a-vacancy">Request a service</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-background/30 bg-transparent px-6 text-background hover:bg-background/10 hover:text-background">
                <Link href="/contact">
                  Contact us <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
