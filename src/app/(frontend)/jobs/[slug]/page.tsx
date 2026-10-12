import type { Metadata } from 'next/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RichText from '@/components/RichText'
import { ApplyForm } from '@/components/ApplyForm'
import { getServerSideURL } from '@/utilities/getURL'

export const dynamic = 'force-dynamic'

const EMPLOYMENT_TYPE: Record<string, string> = {
  'full-time': 'FULL_TIME',
  'part-time': 'PART_TIME',
  contract: 'CONTRACTOR',
  temporary: 'TEMPORARY',
  internship: 'INTERN',
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Minimal Lexical-richtext → HTML for the JobPosting description (Google accepts HTML).
function richTextToHtml(data: any): string {
  const root = data?.root
  if (!root?.children) return ''
  const walk = (nodes: any[]): string =>
    nodes
      .map((n) => {
        if (n?.type === 'text') return escapeHtml(n.text || '')
        if (n?.type === 'linebreak') return '<br/>'
        if (Array.isArray(n?.children)) {
          const inner = walk(n.children)
          switch (n.type) {
            case 'paragraph':
              return `<p>${inner}</p>`
            case 'heading':
              return `<p><strong>${inner}</strong></p>`
            case 'list':
              return `<ul>${inner}</ul>`
            case 'listitem':
              return `<li>${inner}</li>`
            default:
              return inner
          }
        }
        return ''
      })
      .join('')
  return walk(root.children)
}

function jobPostingSchema(job: Record<string, any>, countryName: string | null, serverUrl: string) {
  const reqs: string[] = Array.isArray(job.requirements)
    ? job.requirements
        .map((r: { item?: string }) => r?.item)
        .filter((x: string | undefined): x is string => Boolean(x))
    : []
  let description = richTextToHtml(job.description)
  if (reqs.length) {
    description += `<p><strong>Requirements</strong></p><ul>${reqs
      .map((r) => `<li>${escapeHtml(r)}</li>`)
      .join('')}</ul>`
  }
  if (!description) {
    description = `<p>${escapeHtml(
      `${job.title}${countryName ? ` in ${countryName}` : ''} — overseas placement via Falisha Manpower, with full visa, documentation and mobilisation support.`,
    )}</p>`
  }

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description,
    datePosted: job.createdAt,
    employmentType: EMPLOYMENT_TYPE[String(job.employmentType)] || 'FULL_TIME',
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
        ...(job.city ? { addressLocality: job.city } : {}),
        ...(countryName ? { addressCountry: countryName } : {}),
      },
    },
    identifier: {
      '@type': 'PropertyValue',
      name: 'Falisha Manpower',
      value: job.slug || String(job.id),
    },
    directApply: true,
  }
  if (job.deadline) schema.validThrough = new Date(job.deadline).toISOString()
  if (job.salaryMin || job.salaryMax) {
    schema.baseSalary = {
      '@type': 'MonetaryAmount',
      ...(job.salaryCurrency ? { currency: job.salaryCurrency } : {}),
      value: {
        '@type': 'QuantitativeValue',
        ...(job.salaryMin ? { minValue: job.salaryMin } : {}),
        ...(job.salaryMax ? { maxValue: job.salaryMax } : {}),
        unitText: String(job.salaryPeriod || 'month').toUpperCase(),
      },
    }
  }
  return schema
}

async function getJob(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'jobs',
    depth: 1,
    limit: 1,
    overrideAccess: false,
    where: { slug: { equals: slug } } as never,
  })
  return res.docs[0] as Record<string, any> | undefined
}

function formatSalary(job: Record<string, any>): string | null {
  const { salaryMin, salaryMax, salaryCurrency, salaryPeriod } = job
  if (!salaryMin && !salaryMax) return null
  const per = salaryPeriod === 'year' ? '/yr' : '/mo'
  const range =
    salaryMin && salaryMax
      ? `${salaryMin.toLocaleString()}–${salaryMax.toLocaleString()}`
      : `${(salaryMin || salaryMax).toLocaleString()}`
  return `${salaryCurrency || ''} ${range}${per}`
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = await getJob(slug)
  if (!job) notFound()

  const isOpen = job.vacancyStatus === 'open'
  const countryName = typeof job.country === 'object' ? job.country?.name : null
  const industryName = typeof job.industry === 'object' ? job.industry?.title : null
  const salary = formatSalary(job)
  const schema = isOpen ? jobPostingSchema(job, countryName, getServerSideURL()) : null

  const facts: [string, string | null][] = [
    ['Location', [job.city, countryName].filter(Boolean).join(', ') || null],
    ['Industry', industryName],
    ['Type', job.employmentType ? String(job.employmentType).replace('-', ' ') : null],
    ['Workplace', job.workplace ? String(job.workplace).replace('-', ' ') : null],
    ['Positions', job.positions ? String(job.positions) : null],
    ['Salary', salary],
  ]

  return (
    <div className="container py-16 md:py-24">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <Link href="/jobs" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to all jobs
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_380px]">
        <article>
          <div className="flex items-center gap-2 text-xs font-medium">
            {isOpen ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-green-700 dark:text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-500" /> Open — accepting applications
              </span>
            ) : (
              <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">Closed</span>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{job.title}</h1>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 rounded-lg border border-border bg-card p-5 sm:grid-cols-3">
            {facts
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
                  <dd className="mt-0.5 font-medium capitalize">{v}</dd>
                </div>
              ))}
          </dl>

          {job.description && (
            <div className="prose dark:prose-invert mt-8 max-w-none">
              <RichText data={job.description} enableGutter={false} />
            </div>
          )}

          {Array.isArray(job.requirements) && job.requirements.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold">Requirements</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
                {job.requirements.map((r: { id?: string; item: string }, i: number) => (
                  <li key={r.id || i}>{r.item}</li>
                ))}
              </ul>
            </div>
          )}
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          {isOpen ? (
            <ApplyForm jobId={job.id} jobTitle={job.title} />
          ) : (
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">This role is closed</h3>
              <p className="mt-2 text-muted-foreground">
                Applications are no longer being accepted. Browse{' '}
                <Link href="/jobs" className="text-primary underline">other open roles</Link> or send
                us your CV.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const job = await getJob(slug)
  if (!job) return { title: 'Job not found | Falisha Manpower' }
  const countryName = typeof job.country === 'object' ? job.country?.name : ''
  return {
    alternates: { canonical: `/jobs/${slug}` },
    title: job.meta?.title || `${job.title}${countryName ? ` in ${countryName}` : ''} | Falisha Manpower`,
    description:
      job.meta?.description ||
      `Apply for ${job.title}${countryName ? ` in ${countryName}` : ''} with Falisha Manpower.`,
  }
}
