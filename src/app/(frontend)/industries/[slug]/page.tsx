import type { Metadata } from 'next/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RichText from '@/components/RichText'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

async function getData(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'industries',
    where: { slug: { equals: slug } } as never,
    overrideAccess: false,
    depth: 0,
    limit: 1,
  })
  const industry = res.docs[0] as Record<string, any> | undefined
  if (!industry) return { industry: undefined, jobs: { docs: [], totalDocs: 0 } }
  const jobs = await payload.find({
    collection: 'jobs',
    where: { and: [{ vacancyStatus: { equals: 'open' } }, { 'industry.slug': { equals: slug } }] } as never,
    overrideAccess: false,
    depth: 1,
    limit: 12,
    sort: '-createdAt',
  })
  return { industry, jobs }
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { industry, jobs } = await getData(slug)
  if (!industry) notFound()

  return (
    <div className="container py-16 md:py-24">
      <Link href="/industries" className="text-sm text-muted-foreground hover:text-foreground">← All industries</Link>
      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)] capitalize">
          {industry.kind}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{industry.title}</h1>
        {industry.summary && <p className="mt-3 text-lg text-muted-foreground">{industry.summary}</p>}
      </header>

      {industry.content && (
        <div className="prose dark:prose-invert mt-8 max-w-3xl">
          <RichText data={industry.content} enableGutter={false} />
        </div>
      )}

      {Array.isArray(industry.roles) && industry.roles.length > 0 && (
        <div className="mt-8 max-w-3xl">
          <h2 className="text-lg font-semibold">Typical roles</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {industry.roles.map((r: { id?: string; title: string }, i: number) => (
              <span key={r.id || i} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                {r.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {jobs.totalDocs > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight">Open {industry.title} roles</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(jobs.docs as Record<string, any>[]).map((job) => {
              const country = typeof job.country === 'object' ? job.country?.name : ''
              return (
                <Card key={job.id} className="transition-shadow hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg leading-snug">
                      <Link href={`/jobs/${job.slug}`} className="hover:underline">{job.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {[job.city, country].filter(Boolean).join(', ')}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { industry } = await getData(slug)
  if (!industry) return { title: 'Industry not found | Falisha Manpower' }
  return {
    alternates: { canonical: `/industries/${slug}` },
    title: industry.meta?.title || `${industry.title} Recruitment | Falisha Manpower`,
    description: industry.meta?.description || industry.summary || `${industry.title} recruitment from Falisha Manpower.`,
  }
}
