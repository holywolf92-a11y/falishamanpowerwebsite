import type { Metadata } from 'next/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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

      <div className="mt-10 rounded-xl border border-border bg-secondary/50 p-8">
        <h2 className="text-xl font-semibold">Ready to apply?</h2>
        <p className="mt-2 text-muted-foreground">
          Apply to a live role for the fastest response, or email your CV to{' '}
          <a href={`mailto:${CAREERS_EMAIL}`} className="text-primary hover:underline">{CAREERS_EMAIL}</a>.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild><Link href="/jobs">Browse open jobs</Link></Button>
          <Button asChild variant="outline"><a href={`mailto:${CAREERS_EMAIL}`}>Email your CV</a></Button>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Tip: an in-browser CV upload form can be added here later (it needs cloud file storage once you deploy).
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
