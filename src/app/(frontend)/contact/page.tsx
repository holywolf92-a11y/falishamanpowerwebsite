import type { Metadata } from 'next/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

const EMPLOYER_EMAIL = 'info@falishamanpower.com'
const CAREERS_EMAIL = 'info@falishamanpower.com'
const PHONE = '+92 330 3333335'
const LANDLINE = '+92 51 4927145-6'
const WHATSAPP = 'https://wa.me/923005547806'
const ADDRESS = 'Umer Farooq Plaza, Offices 10, 11 & 12, First Floor, Murree Road, Chandni Chowk, Rawalpindi, Pakistan'
const BRANCHES = 'Lahore · Karachi · Peshawar · AJK'

export default function ContactPage() {
  return (
    <div className="container py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Get in touch</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Let’s talk</h1>
        <p className="mt-3 text-muted-foreground">
          Whether you’re an employer looking to hire or a candidate seeking an overseas role, we’re here to help.
        </p>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-8">
          <h2 className="text-xl font-semibold">For employers</h2>
          <p className="mt-2 text-muted-foreground">
            Tell us about the roles you need to fill and we’ll build a sourcing plan.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <p><span className="text-muted-foreground">Email:</span>{' '}
              <a href={`mailto:${EMPLOYER_EMAIL}`} className="text-primary hover:underline">{EMPLOYER_EMAIL}</a>
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full"><Link href="/fill-a-vacancy">Request talent</Link></Button>
            <Button asChild variant="outline" className="rounded-full"><Link href="/partner-with-us">Partner with us</Link></Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-8">
          <h2 className="text-xl font-semibold">For candidates</h2>
          <p className="mt-2 text-muted-foreground">
            Browse current openings or send us your CV for future opportunities.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <p><span className="text-muted-foreground">Email:</span>{' '}
              <a href={`mailto:${CAREERS_EMAIL}`} className="text-primary hover:underline">{CAREERS_EMAIL}</a>
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full"><Link href="/jobs">Browse jobs</Link></Button>
            <Button asChild variant="outline" className="rounded-full"><Link href="/upload-cv">Send your CV</Link></Button>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-xl border border-border bg-secondary/40 p-6 text-sm">
        <a href={`tel:${PHONE.replace(/[\s-]/g, '')}`} className="font-medium text-foreground hover:text-primary">📞 {PHONE}</a>
        <a href={`tel:${LANDLINE.replace(/[\s-]/g, '')}`} className="font-medium text-foreground hover:text-primary">☎️ {LANDLINE}</a>
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary">💬 WhatsApp</a>
        <a href={`mailto:${CAREERS_EMAIL}`} className="font-medium text-foreground hover:text-primary">✉️ {CAREERS_EMAIL}</a>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-6 text-sm">
        <h2 className="font-semibold text-foreground">Head office</h2>
        <p className="mt-2 text-muted-foreground">{ADDRESS}</p>
        <p className="mt-3">
          <span className="font-semibold text-foreground">Branch offices:</span>{' '}
          <span className="text-muted-foreground">{BRANCHES}</span>
        </p>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Contact | Falisha Manpower',
    description: 'Contact Falisha Manpower — for employers hiring overseas talent and candidates seeking overseas jobs.',
  }
}
