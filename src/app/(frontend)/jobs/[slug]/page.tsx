import type { Metadata } from 'next/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ApplyForm } from '@/components/ApplyForm'
import { getServerSideURL } from '@/utilities/getURL'
import { breadcrumbSchema } from '@/utilities/breadcrumbSchema'
import { JOBS, JOBS_BY_SLUG, jobSalaryLabel, type JobEntry } from '@/data/jobsData'

export const dynamic = 'force-dynamic'

const EMPLOYMENT_TYPE: Record<string, string> = {
  'full-time': 'FULL_TIME',
  contract: 'CONTRACTOR',
  temporary: 'TEMPORARY',
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function jobPostingSchema(job: JobEntry, serverUrl: string) {
  const now = Date.now()
  const datePosted = new Date(now - 10 * 86400000).toISOString()
  const validThrough = new Date(now + 55 * 86400000).toISOString()
  const description =
    `<p>${escapeHtml(job.summary)}</p>` +
    job.description.map((p) => `<p>${escapeHtml(p)}</p>`).join('') +
    `<p><strong>Requirements</strong></p><ul>${job.requirements.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>`

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description,
    datePosted,
    validThrough,
    employmentType: EMPLOYMENT_TYPE[job.employmentType] || 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Falisha Manpower',
      sameAs: serverUrl,
      logo: `${serverUrl}/icon.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.city,
        addressCountry: job.country,
      },
    },
    identifier: { '@type': 'PropertyValue', name: 'Falisha Manpower', value: job.slug },
    directApply: true,
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: job.salaryCurrency,
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salaryMin,
        maxValue: job.salaryMax,
        unitText: job.salaryPeriod.toUpperCase(),
      },
    },
  }
}

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }))
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = JOBS_BY_SLUG[slug]
  if (!job) notFound()

  const facts: [string, string][] = [
    ['Location', `${job.city}, ${job.country}`],
    ['Industry', job.category],
    ['Type', job.employmentType.replace('-', ' ')],
    ['Positions', String(job.positions)],
    ['Salary', jobSalaryLabel(job)],
  ]

  return (
    <div className="container py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema(job, getServerSideURL())) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Jobs', path: '/jobs' },
              { name: job.title, path: `/jobs/${slug}` },
            ]),
          ),
        }}
      />
      <Link href="/jobs" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to all jobs
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_380px]">
        <article>
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-green-700 dark:text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-500" /> Open — accepting applications
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{job.title}</h1>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 rounded-lg border border-border bg-card p-5 sm:grid-cols-3">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
                <dd className="mt-0.5 font-medium capitalize">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 space-y-4 text-muted-foreground">
            <p className="text-lg font-medium text-foreground">{job.summary}</p>
            {job.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Requirements</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
              {job.requirements.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ApplyForm jobId={job.slug} jobTitle={job.title} />
        </aside>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const job = JOBS_BY_SLUG[slug]
  if (!job) return { title: 'Job not found | Falisha Manpower' }
  return {
    alternates: { canonical: `/jobs/${slug}` },
    title: `${job.title} in ${job.country} | Falisha Manpower`,
    description: `Apply for ${job.title} in ${job.city}, ${job.country} with Falisha Manpower — ${jobSalaryLabel(job)}. Visa, attestation and mobilisation handled end to end.`,
  }
}
