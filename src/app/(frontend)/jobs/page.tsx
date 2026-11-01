import type { Metadata } from 'next/types'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { JOBS, JOB_COUNTRIES, jobSalaryLabel } from '@/data/jobsData'

export const dynamic = 'force-dynamic'

type Search = { country?: string; type?: string }

export default async function JobsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { country, type } = await searchParams

  const jobs = JOBS.filter(
    (j) => (!country || j.countrySlug === country) && (!type || j.employmentType === type),
  )

  return (
    <div className="container py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Careers</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Latest overseas openings</h1>
        <p className="mt-3 text-muted-foreground">
          Live vacancies with Falisha Manpower across the Gulf, Türkiye and beyond. Every role is handled
          end to end — trade testing, visa, attestation and mobilisation included.
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
            {JOB_COUNTRIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
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
        {jobs.length} open {jobs.length === 1 ? 'vacancy' : 'vacancies'}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card key={job.slug} className="flex flex-col transition-shadow hover:shadow-md">
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
              <div>📍 {job.city}, {job.country}</div>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <span className="capitalize">{job.employmentType.replace('-', ' ')}</span>
                <span>· {job.positions} positions</span>
              </div>
              <div className="font-medium text-foreground">{jobSalaryLabel(job)}</div>
              <Button asChild variant="outline" size="sm" className="mt-2 w-fit">
                <Link href={`/jobs/${job.slug}`}>View &amp; apply</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="mt-10 rounded-2xl border border-border bg-secondary/40 p-8 text-center md:p-12">
          <h2 className="text-xl font-semibold">No vacancies match your filters</h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Try resetting the filters, or register your interest and we’ll match you to roles as they open.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline"><Link href="/jobs">Reset filters</Link></Button>
            <Button asChild><Link href="/upload-cv">Register your interest</Link></Button>
          </div>
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    alternates: { canonical: '/jobs' },
    title: 'Latest Overseas Job Openings | Falisha Manpower',
    description:
      'Browse current overseas job vacancies in Saudi Arabia, the UAE, Qatar and Türkiye with Falisha Manpower — welders, electricians, drivers, nurses, hospitality and more.',
  }
}
