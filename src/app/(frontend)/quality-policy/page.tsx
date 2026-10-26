import type { Metadata } from 'next/types'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const LAST_UPDATED = '26 October 2026'
const CONTACT_EMAIL = 'info@falishamanpower.com'

type Section = { id: string; title: string; body: React.ReactNode }

const SECTIONS: Section[] = [
  {
    id: 'commitment',
    title: '1. Our quality commitment',
    body: (
      <>
        <p>
          Falisha Manpower is a BEOE-licensed Overseas Employment Promoter (OEP Licence No. 4035). Our
          purpose is to connect employers with the right people and to help workers reach genuine,
          lawful overseas employment — and to do both to a consistently high standard. Quality is not a
          slogan for us; it is the discipline of doing each step of recruitment correctly, every time.
        </p>
        <p className="mt-3">
          This policy sets out what quality means at Falisha Manpower and how we deliver it across
          sourcing, screening, documentation, deployment and after-placement support.
        </p>
      </>
    ),
  },
  {
    id: 'what-quality-means',
    title: '2. What quality means to us',
    body: (
      <ul>
        <li>
          <strong>The right candidates</strong> — people who genuinely match the role’s skills,
          experience and documentation requirements, verified before they reach the employer.
        </li>
        <li>
          <strong>Full legal compliance</strong> — every placement processed correctly under Pakistani
          emigration law and the requirements of the destination country.
        </li>
        <li>
          <strong>Transparency</strong> — clear, honest communication with both employers and
          candidates at every stage, with no hidden steps or costs.
        </li>
        <li>
          <strong>Reliability and timeliness</strong> — realistic timelines, kept; and workers
          mobilised when we say they will be.
        </li>
        <li>
          <strong>Ethical recruitment</strong> — fair treatment of workers in line with our{' '}
          <Link href="/anti-trafficking" className="text-primary hover:underline">
            Anti-Human-Trafficking &amp; Modern Slavery Policy
          </Link>
          .
        </li>
      </ul>
    ),
  },
  {
    id: 'how-we-deliver',
    title: '3. How we deliver quality',
    body: (
      <ul>
        <li>
          <strong>Defined processes</strong> — sourcing, screening, selection, documentation and
          deployment follow consistent, repeatable steps so nothing is missed.
        </li>
        <li>
          <strong>Screening and trade testing</strong> — candidates are assessed for experience and
          documents, and trade-tested to employer or consultant specification, before shortlisting.
        </li>
        <li>
          <strong>Document and compliance checks</strong> — qualifications, experience and
          certificates are verified, and attestation, medicals and visa requirements are managed
          correctly for the destination.
        </li>
        <li>
          <strong>A trained, accountable team</strong> — a single point of accountability for each
          engagement, across our offices in Rawalpindi (head office), Lahore, Karachi, Peshawar and
          AJK.
        </li>
      </ul>
    ),
  },
  {
    id: 'improvement',
    title: '4. Continuous improvement',
    body: (
      <p>
        We treat employer and candidate feedback as the clearest measure of our quality. We review the
        outcome of placements, learn from issues, and refine our processes so the next engagement runs
        more smoothly than the last. Our aim is steady, measurable improvement in the experience we
        deliver to both sides of every placement.
      </p>
    ),
  },
  {
    id: 'compliance',
    title: '5. Compliance and licensing',
    body: (
      <p>
        Falisha Manpower operates as a Government of Pakistan–licensed Overseas Employment Promoter
        (OEP Licence No. 4035), registered with the Bureau of Emigration &amp; Overseas Employment
        (BEOE). Every deployment is processed through Protector of Emigrants clearance and in line with
        the Emigration Ordinance 1979 and the rules of the destination country. Lawful, licensed
        recruitment is the foundation of our quality standard.
      </p>
    ),
  },
  {
    id: 'responsibility',
    title: '6. Responsibility',
    body: (
      <p>
        Responsibility for this policy sits with Falisha Manpower’s management, who are committed to
        providing the resources, training and oversight needed to maintain these standards. Every
        member of our team is expected to uphold them in their day-to-day work.
      </p>
    ),
  },
  {
    id: 'contact',
    title: '7. Contact us',
    body: (
      <p>
        For questions about this policy or our quality standards, contact us at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
          {CONTACT_EMAIL}
        </a>{' '}
        or via our{' '}
        <Link href="/contact" className="text-primary hover:underline">
          contact page
        </Link>
        .
      </p>
    ),
  },
]

export default function QualityPolicyPage() {
  return (
    <div className="container max-w-3xl py-16 md:py-24">
      <header>
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Policy</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Quality Policy</h1>
        <p className="mt-3 text-muted-foreground">Last updated: {LAST_UPDATED}</p>
      </header>

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
    alternates: { canonical: '/quality-policy' },
    title: 'Quality Policy | Falisha Manpower',
    description:
      'Falisha Manpower’s commitment to quality in overseas recruitment — the right candidates, full legal compliance, transparency and continuous improvement. BEOE OEP 4035.',
  }
}
