import type { Metadata } from 'next/types'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

type Search = { country?: string; type?: string }

function formatSalary(job: {
  salaryMin?: number | null
  salaryMax?: number | null
  salaryCurrency?: string | null
  salaryPeriod?: string | null
}): string | null {
  const { salaryMin, salaryMax, salaryCurrency, salaryPeriod } = job
  if (!salaryMin && !salaryMax) return null
  const cur = salaryCurrency || ''
  const per = salaryPeriod === 'year' ? '/yr' : '/mo'
  const range =
    salaryMin && salaryMax ? `${salaryMin.toLocaleString()}–${salaryMax.toLocaleString()}` : `${(salaryMin || salaryMax)!.toLocaleString()}`
  return `${cur} ${range}${per}`
}

export default async function JobsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { country, type } = await searchParams
  const payload = await getPayload({ config: configPromise })

  const and: Record<string, unknown>[] = [{ vacancyStatus: { equals: 'open' } }]
  if (country) and.push({ 'country.slug': { equals: country } })
  if (type) and.push({ employmentType: { equals: type } })

  const [jobs, countries] = await Promise.all([
    payload.find({
      collection: 'jobs',
      depth: 1,
      limit: 60,
      overrideAccess: false,
      sort: '-createdAt',
      where: { and } as never,
    }),
    payload.find({
      collection: 'countries',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      sort: 'name',
      select: { name: true, slug: true } as never,
    }),
  ])

  return (
    <div className="container py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Careers</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Latest overseas openings</h1>
        <p className="mt-3 text-muted-foreground">
          Live vacancies with Falisha Manpower. Every listing here is open and accepting
          applications — closed roles are removed automatically.
        </p>
      </header>

      {/* Filters */}
      <form method="get" className="mt-8 flex flex-wrap items-end gap-3">
        <div className="grid gap-1.5">
          <label htmlFor="country" className="text-xs font-medium text-muted-foreground">Country</label>
          <select
            id="country"
            name="country"
            defaultValue={country || ''}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">All countries</option>
            {countries.docs.map((c: { id: number | string; name?: string; slug?: string }) => (
              <option key={c.id} value={c.slug || ''}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="type" className="text-xs font-medium text-muted-foreground">Type</label>
          <select
            id="type"
            name="type"
            defaultValue={type || ''}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">All types</option>
            <option value="full-time">Full-time</option>
            <option value="contract">Contract</option>
            <option value="temporary">Temporary</option>
          </select>
        </div>
        <Button type="submit">Filter</Button>
        {(country || type) && (
          <Button asChild variant="outline">
            <Link href="/jobs">Reset</Link>
          </Button>
        )}
      </form>

      <p className="mt-8 text-sm text-muted-foreground">
        {jobs.totalDocs} open {jobs.totalDocs === 1 ? 'vacancy' : 'vacancies'}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.docs.map((job: Record<string, any>) => {
          const salary = formatSalary(job)
          const countryName = typeof job.country === 'object' ? job.country?.name : null
          return (
            <Card key={job.id} className="flex flex-col transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2 text-xs font-medium text-primary">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                  Open
                </div>
                <CardTitle className="mt-1 text-lg leading-snug">
                  <Link href={`/jobs/${job.slug}`} className="hover:underline">{job.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-auto grid gap-2 text-sm text-muted-foreground">
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {countryName && <span>📍 {[job.city, countryName].filter(Boolean).join(', ')}</span>}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {job.employmentType && <span className="capitalize">{job.employmentType.replace('-', ' ')}</span>}
                  {job.positions ? <span>· {job.positions} positions</span> : null}
                </div>
                {salary && <div className="font-medium text-foreground">{salary}</div>}
                <Button asChild variant="outline" size="sm" className="mt-2 w-fit">
                  <Link href={`/jobs/${job.slug}`}>View &amp; apply</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {jobs.totalDocs === 0 && (
        <p className="mt-10 rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
          No open vacancies match your filters right now. Try resetting, or{' '}
          <Link href="/upload-cv" className="text-primary underline">send us your CV</Link> for future roles.
        </p>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    alternates: { canonical: '/jobs' },
    title: 'Latest Overseas Job Openings | Falisha Manpower',
    description:
      'Browse current overseas job vacancies in Saudi Arabia, UAE, Qatar and more with Falisha Manpower.',
  }
}
