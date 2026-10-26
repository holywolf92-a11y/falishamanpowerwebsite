import type { Metadata } from 'next/types'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export const dynamic = 'force-dynamic'

const CONTACT_EMAIL = 'info@falishamanpower.com'
const WHATSAPP = 'https://wa.me/923005547806'

type Section = { id: string; title: string; body: React.ReactNode }

const SECTIONS: Section[] = [
  {
    id: 'why',
    title: '1. Protect yourself from recruitment fraud',
    body: (
      <>
        <p>
          Overseas job seekers are often targeted by fraudsters who impersonate genuine agencies,
          advertise jobs that don’t exist, and demand money for fake visas, &ldquo;processing&rdquo; or
          guaranteed selection. These scams can cost people their savings and their documents.
        </p>
        <p className="mt-3">
          Falisha Manpower is a BEOE-licensed Overseas Employment Promoter (OEP Licence No. 4035). This
          page explains how we really operate, the warning signs of fraud, and how to verify and report
          it — so you can tell a genuine Falisha offer from an imposter.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-work',
    title: '2. How Falisha Manpower really works',
    body: (
      <ul>
        <li>We recruit only through our official channels (below) — never through random social-media accounts or unknown agents claiming to represent us.</li>
        <li>We do <strong>not</strong> guarantee visas or jobs in exchange for money, and we do not ask candidates to pay fees into personal bank accounts or mobile wallets.</li>
        <li>Genuine selection is based on your skills, documents and the employer’s requirement — never on an upfront payment.</li>
        <li>Every lawful deployment is processed through Protector of Emigrants (BEOE) clearance.</li>
        <li>We will never pressure you to decide or pay &ldquo;immediately&rdquo;, and we will never ask you to hand over your passport to secure a job.</li>
      </ul>
    ),
  },
  {
    id: 'red-flags',
    title: '3. Warning signs of a scam',
    body: (
      <ul>
        <li>A demand for an <strong>upfront fee</strong> for a visa, &ldquo;processing&rdquo;, a medical or &ldquo;guaranteed&rdquo; selection — especially into a <strong>personal</strong> account or wallet.</li>
        <li>An offer that seems too good to be true — unusually high salary for little experience.</li>
        <li>Pressure and urgency — &ldquo;pay today or lose the seat&rdquo;.</li>
        <li>Contact from unofficial numbers, personal email addresses or lookalike domains instead of our official channels.</li>
        <li>A request for your passport <em>and</em> a payment before any verified employer or contract exists.</li>
        <li>Offer letters, visas or BEOE documents that you cannot independently verify.</li>
      </ul>
    ),
  },
  {
    id: 'verify',
    title: '4. How to verify a genuine Falisha offer',
    body: (
      <ul>
        <li>Check the website — our only official site is <strong>falishamanpower.com</strong>.</li>
        <li>Check the email — official emails come from <strong>@falishamanpower.com</strong> (for example {CONTACT_EMAIL}).</li>
        <li>
          Contact us directly through our{' '}
          <Link href="/contact" className="text-primary hover:underline">
            contact page
          </Link>
          , our official email, or our{' '}
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            official WhatsApp
          </a>{' '}
          to confirm whether a message or offer really came from us.
        </li>
        <li>Verify our licence — <strong>OEP Licence No. 4035</strong> is registered with the Bureau of Emigration &amp; Overseas Employment (BEOE); licensed promoters can be checked on the BEOE’s official records.</li>
        <li>When in doubt, visit our head office in Rawalpindi or a branch office in person.</li>
      </ul>
    ),
  },
  {
    id: 'report',
    title: '5. How to report fraud',
    body: (
      <>
        <p>
          If someone is using our name fraudulently, or you suspect a recruitment scam, please tell us
          so we can warn others and act on it:
        </p>
        <ul className="mt-3">
          <li>
            Email us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>{' '}
            or message our{' '}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              official WhatsApp
            </a>
            , with any screenshots, numbers or documents involved.
          </li>
          <li>
            Report recruitment-related complaints to the <strong>Bureau of Emigration &amp; Overseas
            Employment (BEOE)</strong>.
          </li>
          <li>
            Report online fraud or impersonation to the <strong>FIA Cyber Crime Wing</strong>, and
            suspected human trafficking to the <strong>Federal Investigation Agency (FIA)</strong>.
          </li>
        </ul>
        <p className="mt-3">
          See also our{' '}
          <Link href="/anti-trafficking" className="text-primary hover:underline">
            Anti-Human-Trafficking &amp; Modern Slavery Policy
          </Link>
          .
        </p>
      </>
    ),
  },
]

export default function ReportAFraudPage() {
  return (
    <div className="container max-w-3xl py-16 md:py-24">
      <header>
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Candidate safety</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Report a Fraud</h1>
        <p className="mt-3 text-muted-foreground">Spot, verify and report recruitment fraud.</p>
      </header>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-muted-foreground">
        <AlertTriangle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
        <p>
          <strong className="text-foreground">Never pay for a job.</strong> Falisha Manpower does not
          charge candidates upfront fees for visas, &ldquo;processing&rdquo; or guaranteed selection,
          and never asks for payment into personal accounts. If someone claims otherwise in our name,
          it is a scam — please report it.
        </p>
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
    alternates: { canonical: '/report-a-fraud' },
    title: 'Report a Fraud | Falisha Manpower',
    description:
      'Protect yourself from recruitment fraud. How Falisha Manpower (BEOE OEP 4035) really operates, the warning signs of scams, how to verify a genuine offer, and how to report fraud.',
  }
}
