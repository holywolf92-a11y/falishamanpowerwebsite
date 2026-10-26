import type { Metadata } from 'next/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2, Clock, Globe2, ListChecks, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Reveal from '@/components/visual/Reveal'
import { FAQAccordion } from '@/components/visual/FAQAccordion'
import { ServiceIcon } from '@/components/visual/ServiceIcon'
import { SERVICES, SERVICE_BY_SLUG } from '@/data/serviceDetail'
import { breadcrumbSchema } from '@/utilities/breadcrumbSchema'

const TYPE_LABEL: Record<string, string> = {
  recruitment: 'Recruitment service',
  advisory: 'Advisory service',
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = SERVICE_BY_SLUG[slug]
  if (!service) notFound()

  const title = service.title
  const typeLabel = TYPE_LABEL[service.serviceType] ?? 'Service'
  const related = SERVICES.filter((s) => s.serviceType === service.serviceType && s.slug !== slug).slice(0, 6)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const gridBg = {
    backgroundImage:
      'linear-gradient(to right, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px)',
    backgroundSize: '44px 44px',
    maskImage: 'radial-gradient(120% 90% at 85% 10%, black, transparent 72%)',
    WebkitMaskImage: 'radial-gradient(120% 90% at 85% 10%, black, transparent 72%)',
  } as const

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
              { name: title, path: `/services/${slug}` },
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
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
            ← All services
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">{typeLabel}</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">{service.tagline}</p>

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
                  <Link href="/fill-a-vacancy">Request this service</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-6">
                  <Link href="/contact">Talk to our team →</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative mx-auto w-full max-w-sm">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-black/20 ring-1 ring-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={service.image} alt="" className="block aspect-[4/3] w-full object-cover" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <div className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-white backdrop-blur">
                    <ServiceIcon name={title} className="h-6 w-6" />
                  </div>
                  <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
                    {typeLabel}
                  </span>
                  <p className="absolute inset-x-5 bottom-4 text-xl font-bold text-white">{title}</p>
                </div>
                <div className="absolute -right-3 top-5 rounded-2xl border border-border bg-card/90 px-4 py-2.5 shadow-lg backdrop-blur-md">
                  <p className="text-lg font-bold leading-none text-[var(--gold)]">OEP 4035</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">BEOE licensed</p>
                </div>
                <div className="absolute -bottom-4 left-0 rounded-2xl border border-border bg-card/90 px-4 py-2.5 shadow-lg backdrop-blur-md">
                  <p className="text-lg font-bold leading-none text-foreground">End-to-end</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">Handled in-house</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="container py-16 md:py-20">
        {/* Overview + quick facts */}
        <section className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight">What {title} means at Falisha Manpower</h2>
            <div className="mt-5 space-y-4 text-muted-foreground">
              {service.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-28">
              <h3 className="font-semibold">Service at a glance</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <Fact label="Service type" value={typeLabel} />
                <Fact label="Licence" value="OEP No. 4035 · BEOE-registered" />
                <Fact label="Experience" value="15+ years of overseas recruitment" />
                <Fact label="Coverage" value="Gulf, Europe, Central Asia & Asia" />
                <Fact label="Offices" value="Rawalpindi (HO), Lahore, Karachi, Peshawar & AJK" />
              </dl>
              <Button asChild className="mt-6 w-full rounded-full">
                <Link href="/fill-a-vacancy">Request this service</Link>
              </Button>
              <Button asChild variant="outline" className="mt-2.5 w-full rounded-full">
                <Link href="/contact">Contact our team</Link>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* What's included */}
        <section className="mt-16 md:mt-20">
          <Reveal className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
              <ListChecks className="h-4 w-4" /> What&apos;s included
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">What this service covers</h2>
          </Reveal>
          <div className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {service.included.map((item, i) => (
              <Reveal key={item} delay={(i % 3) * 0.05}>
                <div className="flex h-full items-start gap-2.5 rounded-xl border border-border bg-card p-3.5 text-sm shadow-sm">
                  <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mt-16 md:mt-20">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">How it works</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Our process</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-primary-foreground">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <span className="text-2xl font-bold text-muted-foreground/25">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-4 font-semibold">{s.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Why Falisha */}
        <section className="mt-16 md:mt-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                <Sparkles className="h-4 w-4" /> Why Falisha
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Why employers choose us for {title.toLowerCase()}</h2>
              <p className="mt-4 text-muted-foreground">
                A BEOE-licensed team, a nationwide sourcing network and a single, accountable process — so this service is
                handled correctly, compliantly and on schedule.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-2.5">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-[15px] shadow-sm">
                    <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16 md:mt-20">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">FAQ</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{title} — your questions</h2>
          </Reveal>
          <div className="mt-8 max-w-3xl">
            <FAQAccordion items={service.faqs} />
          </div>
        </section>

        {/* Related services */}
        {related.length > 0 && (
          <section className="mt-16 md:mt-20">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Related services</h2>
            </Reveal>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition hover:shadow-md"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <ServiceIcon name={r.title} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-medium group-hover:text-primary">{r.title}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{r.summary}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* CTA band */}
      <section className="container pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-10 text-background md:px-12 md:py-12">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--gold)]/15 blur-3xl" />
          <div className="relative flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Need {title.toLowerCase()}?</h2>
              <p className="mt-2 text-background/70">
                Tell us what you need and our team will put together the right plan — compliant, documented and on schedule.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-[var(--gold)] px-6 text-[var(--navy)] hover:brightness-105">
                <Link href="/fill-a-vacancy">Request this service</Link>
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

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-dashed border-border pb-3 last:border-0 last:pb-0">
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICE_BY_SLUG[slug]
  if (!service) return { title: 'Service not found | Falisha Manpower' }
  return {
    alternates: { canonical: `/services/${slug}` },
    title: service.metaTitle || `${service.title} | Falisha Manpower`,
    description: service.metaDescription || service.tagline || service.summary,
  }
}
