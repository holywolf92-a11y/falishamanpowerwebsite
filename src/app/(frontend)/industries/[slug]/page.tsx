import type { Metadata } from 'next/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ArrowRight, CheckCircle2, Clock, Layers, MessageCircle, Plane, Search, ShieldCheck, Users } from 'lucide-react'
import RichText from '@/components/RichText'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Reveal from '@/components/visual/Reveal'
import { FAQAccordion } from '@/components/visual/FAQAccordion'
import { IndustryIcon } from '@/components/visual/IndustryIcon'
import { INDUSTRY_ROLES } from '@/data/industryContent'
import { INDUSTRY_DETAIL } from '@/data/industryDetail'
import { industryImage } from '@/utilities/sectionImages'
import { breadcrumbSchema } from '@/utilities/breadcrumbSchema'

export const dynamic = 'force-dynamic'

const STEPS = [
  { icon: MessageCircle, t: 'Share the requirement', d: 'Confirm the roles, numbers, destination and timeline; we agree the sourcing plan.' },
  { icon: Search, t: 'Source & screen', d: 'We shortlist pre-vetted, trade-tested candidates from our nationwide network.' },
  { icon: Users, t: 'Interview & select', d: 'You interview and select — in person, by video or by proxy.' },
  { icon: Plane, t: 'Visa & mobilise', d: 'Documentation, medicals, visa, attestation and travel — handled end-to-end.' },
]

const EMPTY = { docs: [] as Record<string, any>[], totalDocs: 0 } as const

function industryFaqs(title: string): { q: string; a: string }[] {
  const t = title
  const low = title.toLowerCase()
  return [
    {
      q: `How can I hire ${low} workers from Pakistan?`,
      a: `Share your requirement through our Fill a Vacancy form or contact our team. We source, screen and trade-test suitable candidates, arrange interviews, and manage documentation, visas and mobilisation end to end.`,
    },
    {
      q: `What ${low} roles can Falisha Manpower supply?`,
      a: `From skilled and semi-skilled trades to professional and management roles — see the list above. We also source bespoke ${low} roles on request.`,
    },
    {
      q: `Are candidates pre-screened and trade-tested?`,
      a: `Yes. Candidates are screened for experience and documents, and trade-tested where required, before you interview and select.`,
    },
    {
      q: `Which countries do you place ${low} workers in?`,
      a: `Across the Gulf (Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain), Europe, Central Asia and beyond. See our Destinations for the full list of markets.`,
    },
    {
      q: `How long does recruitment and deployment take?`,
      a: `It depends on the roles, numbers, destination and visa procedures. Our team gives you a realistic timeline once your ${t} requirement is assessed.`,
    },
  ]
}

async function getData(slug: string) {
  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'industries',
      where: { slug: { equals: slug } } as never,
      overrideAccess: false,
      depth: 0,
      limit: 1,
    })
    const industry = res.docs[0] as Record<string, any> | undefined
    if (!industry) return { industry: undefined, jobs: EMPTY, others: EMPTY }
    const [jobs, others] = await Promise.all([
      payload.find({
        collection: 'jobs',
        where: { and: [{ vacancyStatus: { equals: 'open' } }, { 'industry.slug': { equals: slug } }] } as never,
        overrideAccess: false,
        depth: 1,
        limit: 12,
        sort: '-createdAt',
      }),
      payload.find({
        collection: 'industries',
        where: { and: [{ slug: { not_equals: slug } }, { kind: { equals: industry.kind } }] } as never,
        overrideAccess: false,
        depth: 0,
        limit: 7,
        sort: 'title',
      }),
    ])
    return { industry, jobs, others }
  } catch {
    return { industry: undefined, jobs: EMPTY, others: EMPTY }
  }
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { industry, jobs, others } = await getData(slug)
  if (!industry) notFound()

  const title: string = industry.title
  const cmsRoles = Array.isArray(industry.roles)
    ? (industry.roles as { title: string }[]).map((r) => r.title).filter(Boolean)
    : []
  const roles = INDUSTRY_ROLES[slug] ?? cmsRoles
  const detail = INDUSTRY_DETAIL[slug]
  const intro: string =
    industry.summary ||
    `Skilled, semi-skilled and professional ${title.toLowerCase()} manpower from Pakistan for employers across the Gulf, Europe and Asia.`
  const faqs = industryFaqs(title)
  const related = (others.docs as Record<string, any>[]).slice(0, 6)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
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
              { name: 'Industries', path: '/industries' },
              { name: title, path: `/industries/${slug}` },
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
          <Link href="/industries" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
            ← All industries
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Manpower recruitment</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">{intro}</p>

              <ul className="mt-7 flex flex-wrap gap-2.5">
                {[
                  { icon: ShieldCheck, t: 'BEOE-licensed · OEP 4035' },
                  { icon: Clock, t: '15+ years' },
                  { icon: Layers, t: `${roles.length}+ roles` },
                ].map((p) => (
                  <li key={p.t} className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground shadow-sm">
                    <p.icon className="h-4 w-4 text-[var(--gold)]" />
                    {p.t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-6">
                  <Link href="/fill-a-vacancy">Request {title.toLowerCase()} workforce</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-6">
                  <Link href="/upload-cv">Submit your CV →</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative mx-auto w-full max-w-sm">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-black/20 ring-1 ring-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={industryImage(title)} alt="" className="block aspect-[4/3] w-full object-cover" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-white backdrop-blur">
                    <IndustryIcon name={title} className="h-6 w-6" />
                  </div>
                  <p className="absolute inset-x-5 bottom-4 text-xl font-bold text-white">{title}</p>
                </div>
                <div className="absolute -right-3 top-5 rounded-2xl border border-border bg-card/90 px-4 py-2.5 shadow-lg backdrop-blur-md">
                  <p className="text-lg font-bold leading-none text-[var(--gold)]">OEP 4035</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">BEOE licensed</p>
                </div>
                <div className="absolute -bottom-4 left-0 rounded-2xl border border-border bg-card/90 px-4 py-2.5 shadow-lg backdrop-blur-md">
                  <p className="text-lg font-bold leading-none text-foreground">End-to-end</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">Sourcing to travel</p>
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
            <h2 className="text-2xl font-bold tracking-tight">{title} recruitment from Pakistan</h2>
            {detail ? (
              <div className="mt-5 space-y-4 text-muted-foreground">
                <p>{detail.overview}</p>
                <p>
                  With a nationwide sourcing network and offices in Rawalpindi (head office), Lahore, Karachi, Peshawar
                  and Azad Jammu &amp; Kashmir (AJK), our team delivers skilled, semi-skilled and professional
                  {` ${title.toLowerCase()}`} manpower tailored to your project requirements.
                </p>
              </div>
            ) : industry.content ? (
              <div className="prose dark:prose-invert mt-5 max-w-none">
                <RichText data={industry.content} enableGutter={false} />
              </div>
            ) : (
              <div className="mt-5 space-y-4 text-muted-foreground">
                <p>
                  Falisha Manpower sources, screens and deploys {title.toLowerCase()} professionals and workers from
                  Pakistan for employers across the Gulf, Europe, Central Asia and beyond. As a Government of
                  Pakistan–licensed Overseas Employment Promoter (OEP Licence No. 4035, BEOE-registered) with over 15
                  years of experience, we manage the full journey — from candidate sourcing and trade testing to visas,
                  documentation and on-time deployment.
                </p>
                <p>
                  With a nationwide sourcing network and offices in Rawalpindi (head office), Lahore, Karachi, Peshawar
                  and Azad Jammu &amp; Kashmir (AJK), our team delivers skilled, semi-skilled and professional
                  {` ${title.toLowerCase()}`} manpower tailored to your project requirements.
                </p>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-28">
              <h3 className="font-semibold">Quick facts</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <Fact label="Sector" value={title} />
                <Fact label="Skill levels" value="Skilled, semi-skilled & professional" />
                <Fact label="Licence" value="OEP No. 4035 · BEOE-registered" />
                <Fact label="Experience" value="15+ years of overseas recruitment" />
                <Fact label="Offices" value="Rawalpindi (HO), Lahore, Karachi, Peshawar & AJK" />
              </dl>
              <Button asChild className="mt-6 w-full rounded-full">
                <Link href="/fill-a-vacancy">Request workforce</Link>
              </Button>
              <Button asChild variant="outline" className="mt-2.5 w-full rounded-full">
                <Link href="/upload-cv">Submit your CV</Link>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* Roles */}
        {roles.length > 0 && (
          <section className="mt-16 md:mt-20">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">What we recruit</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{title} roles we recruit for</h2>
              <p className="mt-3 text-muted-foreground">
                Skilled, semi-skilled and professional {title.toLowerCase()} manpower — sourced, screened and deployed
                for your projects.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map((r, i) => (
                <Reveal key={r} delay={(i % 3) * 0.05}>
                  <div className="flex h-full items-start gap-2.5 rounded-xl border border-border bg-card p-3.5 text-sm shadow-sm">
                    <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{r}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Qualifications & screening — per-industry */}
        {detail && (
          <section className="mt-16 md:mt-20">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
              <Reveal>
                <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Qualifications</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Certifications &amp; qualifications we check</h2>
                <ul className="mt-6 space-y-2.5">
                  {detail.qualifications.map((q) => (
                    <li key={q} className="flex items-start gap-2.5 text-[15px]">
                      <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Screening</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">How we screen {title.toLowerCase()} candidates</h2>
                <p className="mt-6 leading-relaxed text-muted-foreground">{detail.screening}</p>
                <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <p className="text-sm text-muted-foreground">
                    Trade-tested, document-verified and pre-screened before you interview — so you only meet candidates
                    who meet the brief.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* How we deploy */}
        <section className="mt-16 md:mt-20">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">How we deploy</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">From requirement to deployment</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-primary-foreground">
                      <s.icon className="h-5 w-5" />
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

        {/* Open roles */}
        {jobs.totalDocs > 0 && (
          <section className="mt-16 md:mt-20">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Open {title} roles</h2>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(jobs.docs as Record<string, any>[]).map((job) => {
                const country = typeof job.country === 'object' ? job.country?.name : ''
                return (
                  <Card key={job.id} className="transition-shadow hover:shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg leading-snug">
                        <Link href={`/jobs/${job.slug}`} className="hover:underline">
                          {job.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      {[job.city, country].filter(Boolean).join(', ')}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mt-16 md:mt-20">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">FAQ</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Hiring {title.toLowerCase()} staff — your questions</h2>
          </Reveal>
          <div className="mt-8 max-w-3xl">
            <FAQAccordion items={faqs} />
          </div>
        </section>

        {/* Related industries */}
        {related.length > 0 && (
          <section className="mt-16 md:mt-20">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Other sectors we recruit for</h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/industries/${r.slug}`}
                  className="group flex items-center gap-2.5 rounded-xl border border-border bg-card p-3 text-sm font-medium shadow-sm transition hover:shadow-md"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <IndustryIcon name={r.title} className="h-4 w-4" />
                  </span>
                  <span className="truncate group-hover:text-primary">{r.title}</span>
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
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Hiring {title.toLowerCase()} manpower from Pakistan?</h2>
              <p className="mt-2 text-background/70">
                Share your requirement and our team will source, screen and mobilise suitable candidates for your
                projects.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-[var(--gold)] px-6 text-[var(--navy)] hover:brightness-105">
                <Link href="/fill-a-vacancy">Request workforce</Link>
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
  const { industry } = await getData(slug)
  if (!industry) return { title: 'Industry not found | Falisha Manpower' }
  return {
    alternates: { canonical: `/industries/${slug}` },
    title: industry.meta?.title || `${industry.title} Recruitment from Pakistan | Falisha Manpower`,
    description:
      industry.meta?.description ||
      industry.summary ||
      `Hire skilled ${industry.title} manpower from Pakistan with Falisha Manpower (BEOE OEP 4035) — sourcing, screening, visas and deployment, end to end.`,
  }
}
