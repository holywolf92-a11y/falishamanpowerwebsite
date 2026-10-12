import type { Metadata } from 'next/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RichText from '@/components/RichText'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Flag } from '@/components/visual/Flag'
import { CheckCircle2 } from 'lucide-react'
import { COUNTRY_CONTENT } from '@/data/countryContent'

export const dynamic = 'force-dynamic'

async function getData(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'countries',
    where: { slug: { equals: slug } } as never,
    overrideAccess: false,
    depth: 1,
    limit: 1,
  })
  const country = res.docs[0] as Record<string, any> | undefined
  if (!country) return { country: undefined, jobs: { docs: [], totalDocs: 0 } }
  const jobs = await payload.find({
    collection: 'jobs',
    where: { and: [{ vacancyStatus: { equals: 'open' } }, { 'country.slug': { equals: slug } }] } as never,
    overrideAccess: false,
    depth: 1,
    limit: 12,
    sort: '-createdAt',
  })
  return { country, jobs }
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { country, jobs } = await getData(slug)
  if (!country) notFound()
  const extra = COUNTRY_CONTENT[slug]

  return (
    <div className="container py-16 md:py-24">
      <Link href="/countries" className="text-sm text-muted-foreground hover:text-foreground">← All countries</Link>
      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Recruitment for</p>
        <div className="mt-2 flex items-center gap-4">
          <Flag name={country.name} className="h-10 w-[3.75rem] rounded-md shadow-md" />
          <h1 className="text-4xl font-bold tracking-tight">{country.name}</h1>
        </div>
        {country.intro && <p className="mt-3 text-lg text-muted-foreground">{country.intro}</p>}
      </header>

      {extra?.lead ? (
        <div className="mt-8 max-w-3xl space-y-4">
          {extra.lead.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      ) : country.content ? (
        <div className="prose dark:prose-invert mt-8 max-w-3xl">
          <RichText data={country.content} enableGutter={false} />
        </div>
      ) : null}

      {extra?.categories && extra.categories.length > 0 && (
        <section className="mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight">
            {extra.categoriesTitle || `Manpower categories we recruit for ${country.name}`}
          </h2>
          <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {extra.categories.map((c) => (
              <div
                key={c}
                className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-3 text-sm"
              >
                <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Open roles in {country.name}</h2>
          <Button asChild variant="outline" size="sm"><Link href={`/jobs?country=${country.slug}`}>See all</Link></Button>
        </div>
        {jobs.totalDocs === 0 ? (
          <p className="mt-4 rounded-lg border border-dashed border-border p-6 text-muted-foreground">
            No open roles right now. <Link href="/upload-cv" className="text-primary underline">Send your CV</Link> for upcoming vacancies.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(jobs.docs as Record<string, any>[]).map((job) => (
              <Card key={job.id} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg leading-snug">
                    <Link href={`/jobs/${job.slug}`} className="hover:underline">{job.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {[job.city, country.name].filter(Boolean).join(', ')}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {extra?.partnership && (
        <section className="mt-12 overflow-hidden rounded-2xl bg-primary px-6 py-8 text-primary-foreground md:px-10">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight">Hiring from Pakistan for {country.name}?</h2>
              <p className="mt-2 text-primary-foreground/80">{extra.partnership}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link href="/fill-a-vacancy">Request workforce</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { country } = await getData(slug)
  if (!country) return { title: 'Country not found | Falisha Manpower' }
  return {
    title: country.meta?.title || `Recruitment Agency in Pakistan for ${country.name} | Falisha Manpower`,
    description: country.meta?.description || country.intro || `Hire or find work in ${country.name} with Falisha Manpower.`,
  }
}
