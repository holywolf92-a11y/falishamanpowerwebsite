import type { Metadata } from 'next/types'
import Link from 'next/link'
import { EmployerEnquiryForm } from '@/components/EmployerEnquiryForm'
import { TalentPool } from '@/components/TalentPool'

export const dynamic = 'force-dynamic'

const EMPLOYER_EMAIL = 'info@falishamanpower.com'

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

      {/* Live talent pool — browse available workforce before enquiring */}
      <section className="mt-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight">Browse our available workforce</h2>
          <p className="mt-2 text-muted-foreground">
            Explore live, pre-screened candidates by profession, nationality and destination. Found who you
            need? Enquire and our team handles the rest — screening, documentation, visas and mobilisation.
          </p>
        </div>
        <div className="mt-6">
          <TalentPool />
        </div>
      </section>

      <div className="mt-16 max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight">Or tell us exactly what you need</h2>
        <p className="mt-2 text-muted-foreground">
          Share your requirement and we&apos;ll build a sourcing plan for your project.
        </p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <EmployerEnquiryForm />

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-secondary/40 p-6">
            <h2 className="font-semibold">Prefer to talk first?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Email us at{' '}
              <a href={`mailto:${EMPLOYER_EMAIL}`} className="text-primary hover:underline">{EMPLOYER_EMAIL}</a>{' '}
              or message us on{' '}
              <a href="https://wa.me/923005547806" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp</a>.
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
