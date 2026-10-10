import type { Metadata } from 'next/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FAQAccordion } from '@/components/visual/FAQAccordion'
import { FAQ_GROUPS, faqSchema } from '@/data/faqs'

// Rendered at runtime (the shared layout reads live CMS data that is not
// reachable during the container build).
export const dynamic = 'force-dynamic'

export default function FAQPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-[var(--navy)] py-16 text-white md:py-20">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Help centre</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Frequently asked questions</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Everything candidates and employers ask about overseas recruitment with Falisha Manpower — a
            BEOE-licensed Overseas Employment Promoter (OEP Licence No. 4035).
          </p>
        </div>
      </section>

      {/* FAQ groups */}
      <section className="container py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-12">
          {FAQ_GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="mb-5 text-2xl font-bold tracking-tight">{group.title}</h2>
              <FAQAccordion items={group.items} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-secondary/40">
        <div className="container flex flex-col items-start gap-4 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Still have a question?</h2>
            <p className="mt-1 text-muted-foreground">
              Talk to our team, browse current openings, or send us your CV.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <Link href="/contact">Contact us</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/jobs">Browse jobs</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/upload-cv">Upload CV</Link>
            </Button>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }} />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'FAQs | Overseas Recruitment from Pakistan — Falisha Manpower',
    description:
      'Answers to common questions about overseas recruitment, OEP licensing, the BEOE & Protector process, fees, Gulf & Europe jobs, and hiring skilled Pakistani workers through Falisha Manpower (OEP 4035).',
  }
}
