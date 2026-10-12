import type { Metadata } from 'next/types'
import { PartnerApplicationForm } from '@/components/PartnerApplicationForm'

export const dynamic = 'force-dynamic'

const EMAIL = 'info@falishamanpower.com'

const POINTS = [
  'Sub-agents & local recruitment partners across Pakistan',
  'Overseas recruiters and foreign agencies',
  'Companies seeking a licensed deployment partner',
]

export default function PartnerWithUsPage() {
  return (
    <div className="container py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Partnerships</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Partner with us</h1>
        <p className="mt-3 text-muted-foreground">
          Work with a BEOE-licensed Overseas Employment Promoter (OEP No. 4035). Apply below and our team
          will be in touch about how we can collaborate.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <PartnerApplicationForm />

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-semibold">Who we partner with</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {POINTS.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-secondary/40 p-6">
            <h2 className="font-semibold">Questions?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Email{' '}
              <a href={`mailto:${EMAIL}`} className="text-primary hover:underline">{EMAIL}</a>{' '}
              or reach us on{' '}
              <a href="https://wa.me/923005547806" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp</a>.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Partner With Us | Falisha Manpower',
    description:
      'Become a recruitment partner of Falisha Manpower (BEOE OEP 4035) — for sub-agents, overseas recruiters and companies. Apply online.',
  }
}
