import type { Metadata } from 'next/types'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const LAST_UPDATED = '26 October 2026'
const CONTACT_EMAIL = 'info@falishamanpower.com'

type Section = { id: string; title: string; body: React.ReactNode }

const SECTIONS: Section[] = [
  {
    id: 'commitment',
    title: '1. Our zero-tolerance commitment',
    body: (
      <>
        <p>
          Falisha Manpower is committed to ethical, lawful recruitment and has{' '}
          <strong>zero tolerance for human trafficking, forced labour, bonded labour, child labour
          and any form of modern slavery</strong>. As a BEOE-licensed Overseas Employment Promoter (OEP
          Licence No. 4035), we place workers in overseas employment only through legal, transparent
          and consensual processes.
        </p>
        <p className="mt-3">
          This policy applies to everyone we work with — our own staff, the employers and partners we
          deal with, and the agents and service providers in our supply chain.
        </p>
      </>
    ),
  },
  {
    id: 'principles',
    title: '2. Our ethical-recruitment principles',
    body: (
      <ul>
        <li>
          <strong>The Employer Pays Principle</strong> — no worker should pay for a job. Recruitment
          costs are borne by the employer, not recovered from the worker through unlawful fees or
          wage deductions.
        </li>
        <li>
          <strong>No debt bondage</strong> — we do not place workers into arrangements that tie them
          to an employer through debt.
        </li>
        <li>
          <strong>Clear, written contracts</strong> — workers receive terms they understand, in a
          language they understand, before they travel; the job on arrival matches the job offered.
        </li>
        <li>
          <strong>No passport or document retention</strong> — workers keep their own passports and
          identity documents; these must never be withheld to control a worker.
        </li>
        <li>
          <strong>Freedom and informed consent</strong> — every deployment is voluntary and
          consensual, with no coercion, deception or withholding of information.
        </li>
        <li>
          <strong>No child labour</strong> — we recruit only adults who are legally entitled to work.
        </li>
      </ul>
    ),
  },
  {
    id: 'practice',
    title: '3. How we prevent exploitation in practice',
    body: (
      <ul>
        <li>We deal with employers and partners through lawful, documented engagements.</li>
        <li>Terms, roles and conditions are made transparent to candidates before they commit.</li>
        <li>Identity, age and documents are verified as part of our screening.</li>
        <li>
          Candidates are briefed before departure on their role, their rights and how to raise a
          concern.
        </li>
        <li>
          Every deployment is processed through Protector of Emigrants clearance, giving each worker a
          lawful, recorded emigration route.
        </li>
      </ul>
    ),
  },
  {
    id: 'legal',
    title: '4. Legal and regulatory framework',
    body: (
      <>
        <p>We operate in line with Pakistani law and recognised international standards, including:</p>
        <ul className="mt-3">
          <li>the Prevention of Trafficking in Persons Act, 2018;</li>
          <li>the Prevention of Smuggling of Migrants Act, 2018;</li>
          <li>the Emigration Ordinance, 1979 and the rules of the Bureau of Emigration &amp; Overseas Employment (BEOE);</li>
          <li>the requirements and labour laws of each destination country; and</li>
          <li>internationally recognised fair-recruitment principles (including the ILO’s general principles and operational guidelines for fair recruitment).</li>
        </ul>
      </>
    ),
  },
  {
    id: 'worker-rights',
    title: '5. Worker rights and grievances',
    body: (
      <p>
        Every worker we place is entitled to lawful treatment, the agreed terms of employment, and the
        return of their own documents. If a worker, candidate or anyone else believes these standards
        have not been met, we want to hear about it — promptly and in confidence. We take every
        concern seriously and act on it.
      </p>
    ),
  },
  {
    id: 'reporting',
    title: '6. Reporting a concern',
    body: (
      <>
        <p>
          To report a concern about trafficking, forced labour, unlawful fees or any breach of this
          policy, contact us directly at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
            {CONTACT_EMAIL}
          </a>{' '}
          or through our{' '}
          <Link href="/contact" className="text-primary hover:underline">
            contact page
          </Link>
          . Concerns can be raised confidentially.
        </p>
        <p className="mt-3">
          Suspected human trafficking or smuggling can also be reported to Pakistan’s{' '}
          <strong>Federal Investigation Agency (FIA)</strong>, and recruitment-related complaints to
          the <strong>Bureau of Emigration &amp; Overseas Employment (BEOE)</strong>. See also our{' '}
          <Link href="/report-a-fraud" className="text-primary hover:underline">
            Report a Fraud
          </Link>{' '}
          page.
        </p>
      </>
    ),
  },
  {
    id: 'responsibility',
    title: '7. Responsibility and review',
    body: (
      <p>
        Responsibility for this policy sits with Falisha Manpower’s management. We review it to keep it
        aligned with the law and with good practice in ethical recruitment, and we expect every member
        of our team and every partner to uphold it.
      </p>
    ),
  },
]

export default function AntiTraffickingPage() {
  return (
    <div className="container max-w-3xl py-16 md:py-24">
      <header>
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Ethical recruitment</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Anti-Human-Trafficking &amp; Modern Slavery Policy</h1>
        <p className="mt-3 text-muted-foreground">Last updated: {LAST_UPDATED}</p>
      </header>

      <div className="mt-6 rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/10 p-4 text-sm text-muted-foreground">
        <strong className="text-foreground">In short:</strong> no worker pays for a job, no documents
        are withheld, and every placement is lawful, voluntary and transparent.
      </div>

      <nav aria-label="Contents" className="mt-8 rounded-xl border border-border bg-secondary/40 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">On this page</p>
        <ol className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-primary hover:underline">
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-28">
            <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
            <div className="prose-policy mt-3 text-muted-foreground [&_a]:break-words [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5">
              {s.body}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    alternates: { canonical: '/anti-trafficking' },
    title: 'Anti-Human-Trafficking & Modern Slavery Policy | Falisha Manpower',
    description:
      'Falisha Manpower’s zero-tolerance policy on human trafficking, forced labour and modern slavery — the Employer Pays Principle, no document retention, lawful and consensual recruitment. BEOE OEP 4035.',
  }
}
