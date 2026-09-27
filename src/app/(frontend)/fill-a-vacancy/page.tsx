import type { Metadata } from 'next/types'
import Link from 'next/link'
import { EmployerEnquiryForm } from '@/components/EmployerEnquiryForm'

export const dynamic = 'force-dynamic'

const EMPLOYER_EMAIL = 'support@falishajobs.com'

export default function FillAVacancyPage() {
  return (
    <div className="container py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">For employers</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Fill a vacancy</h1>
        <p className="mt-3 text-muted-foreground">
          Share your workforce requirement and our team will build a sourcing, assessment and mobilisation
          plan. BEOE-licensed OEP No. 4035.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <EmployerEnquiryForm />

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-secondary/40 p-6">
            <h2 className="font-semibold">Prefer to talk first?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Email us at{' '}
              <a href={`mailto:${EMPLOYER_EMAIL}`} className="text-primary hover:underline">{EMPLOYER_EMAIL}</a>{' '}
              or message us on{' '}
              <a href="https://wa.me/923303333335" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp</a>.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-semibold">What happens next</h2>
            <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>1. We review your requirement and confirm details.</li>
              <li>2. We source, screen and assess suitable candidates.</li>
              <li>3. You interview and select; we handle documentation, visas and mobilisation.</li>
            </ol>
            <Link href="/hire-from-pakistan" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
              See our full employer services →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Fill a Vacancy | Falisha Manpower',
    description:
      'Employers: request skilled manpower from Pakistan. Share your workforce requirement and Falisha Manpower (BEOE OEP 4035) will source, screen and mobilise your team.',
  }
}
