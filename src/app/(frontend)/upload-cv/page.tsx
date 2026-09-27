import type { Metadata } from 'next/types'
import { UploadCvForm } from '@/components/UploadCvForm'

export const dynamic = 'force-dynamic'

const CAREERS_EMAIL = 'support@falishajobs.com'

const STEPS = [
  { n: 1, t: 'Browse openings', d: 'Check our live vacancies and apply directly to any open role.' },
  { n: 2, t: 'Or send your CV', d: 'Not seeing the right role? Email your CV and we’ll match you to upcoming vacancies.' },
  { n: 3, t: 'We handle the rest', d: 'Shortlisting, interviews, visa, attestation and mobilisation — all managed for you.' },
]

export default function UploadCvPage() {
  return (
    <div className="container py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">For candidates</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Submit your CV</h1>
        <p className="mt-3 text-muted-foreground">
          Register your interest with Falisha Manpower and we’ll consider you for suitable overseas roles.
        </p>
      </header>

      <ol className="mt-12 grid gap-4 md:grid-cols-3">
        {STEPS.map((s) => (
          <li key={s.n} className="rounded-xl border border-border bg-card p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {s.n}
            </div>
            <h2 className="mt-4 font-semibold">{s.t}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <UploadCvForm />
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Prefer email? You can also send your CV to{' '}
        <a href={`mailto:${CAREERS_EMAIL}`} className="text-primary hover:underline">{CAREERS_EMAIL}</a>.
      </p>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Submit Your CV | Falisha Manpower',
    description: 'Register your CV with Falisha Manpower to be considered for overseas job opportunities.',
  }
}
