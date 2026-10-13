import type { Metadata } from 'next/types'
import Link from 'next/link'
import { UploadCvForm } from '@/components/UploadCvForm'

export const dynamic = 'force-dynamic'

const CAREERS_EMAIL = 'info@falishamanpower.com'

const STEPS = [
  { n: 1, t: 'Upload your CV', d: 'It takes under a minute — just a few details and your CV.' },
  { n: 2, t: 'We review & match', d: 'Our team matches you to suitable, upcoming overseas roles.' },
  { n: 3, t: 'We handle the rest', d: 'Shortlisting, interviews, visa, attestation and mobilisation — all managed.' },
]

export default function UploadCvPage() {
  return (
    <div className="container py-12 md:py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">For candidates</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Submit your CV</h1>
        <p className="mt-3 text-muted-foreground">
          Upload your CV in under a minute — we’ll review it and match you to suitable overseas roles.
        </p>
      </header>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:gap-12">
        <UploadCvForm />

        <aside className="space-y-6 lg:sticky lg:top-28">
          <div className="rounded-2xl border border-border bg-secondary/40 p-6">
            <h2 className="font-semibold">What happens next</h2>
            <ol className="mt-5 space-y-5">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-semibold">{s.t}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 text-sm">
            <p className="text-muted-foreground">
              Prefer email? Send your CV to{' '}
              <a href={`mailto:${CAREERS_EMAIL}`} className="font-medium text-primary hover:underline">
                {CAREERS_EMAIL}
              </a>
              .
            </p>
            <p className="mt-3">
              <Link href="/jobs" className="font-medium text-primary hover:underline">
                Browse open jobs →
              </Link>
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    alternates: { canonical: '/upload-cv' },
    title: 'Submit Your CV | Falisha Manpower',
    description: 'Upload your CV to Falisha Manpower in under a minute to be considered for overseas job opportunities.',
  }
}
