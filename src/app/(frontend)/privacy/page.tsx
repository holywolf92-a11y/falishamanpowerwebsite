import type { Metadata } from 'next/types'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const LAST_UPDATED = '26 September 2026'
const PRIVACY_EMAIL = 'support@falishajobs.com'

type Section = { id: string; title: string; body: React.ReactNode }

const SECTIONS: Section[] = [
  {
    id: 'who-we-are',
    title: '1. Who we are',
    body: (
      <>
        <p>
          Falisha Manpower is a BEOE-licensed Overseas Employment Promoter (OEP Licence No. 4035),
          registered in Pakistan, providing overseas recruitment and manpower services to
          international employers and candidates. In this policy, &ldquo;we&rdquo;, &ldquo;us&rdquo;
          and &ldquo;our&rdquo; refer to Falisha Manpower.
        </p>
        <p className="mt-3">
          This policy explains what personal data we collect, how we use it, who we share it with,
          and the choices and rights available to you. It applies to this website and to our
          recruitment activities.
        </p>
      </>
    ),
  },
  {
    id: 'data-we-collect',
    title: '2. Personal data we collect',
    body: (
      <ul>
        <li>
          <strong>Candidate data</strong> — name, contact details (email, phone/WhatsApp), city,
          the role applied for, and any experience, qualifications or message you provide. If you
          send a CV, it may include employment history, education, passport/ID and other details you
          choose to include.
        </li>
        <li>
          <strong>Employer enquiry data</strong> — the name, organisation and contact details of
          employers who contact us about workforce requirements.
        </li>
        <li>
          <strong>Technical data</strong> — basic information your browser sends automatically (such
          as IP address, device and browser type) used to operate and secure the site.
        </li>
      </ul>
    ),
  },
  {
    id: 'how-we-use',
    title: '3. How we use your data and our legal basis',
    body: (
      <ul>
        <li>To assess applications and match candidates to suitable overseas roles.</li>
        <li>To provide recruitment services to employers and coordinate interviews and selection.</li>
        <li>
          To process documentation, medical, visa and Protector of Emigrants / BEOE formalities
          required for overseas deployment.
        </li>
        <li>To respond to enquiries and communicate with you about opportunities.</li>
        <li>To operate, secure and improve this website, and to comply with legal obligations.</li>
        <li className="mt-3 list-none">
          Where required, we rely on your <strong>consent</strong> (which you may withdraw at any
          time), the <strong>performance of a service</strong> you have requested, our{' '}
          <strong>legitimate interests</strong> in operating a recruitment business, and{' '}
          <strong>compliance with legal and regulatory obligations</strong>.
        </li>
      </ul>
    ),
  },
  {
    id: 'sharing',
    title: '4. Who we share your data with',
    body: (
      <>
        <p>We share personal data only as needed to provide our services, including with:</p>
        <ul className="mt-3">
          <li>
            <strong>Prospective employers</strong> you are being considered for (candidate profiles
            and CVs).
          </li>
          <li>
            <strong>Government and regulatory authorities</strong> where required, including the
            Bureau of Emigration &amp; Overseas Employment (BEOE) and Protector of Emigrants.
          </li>
          <li>
            <strong>Service providers</strong> who support recruitment, documentation, medical, visa
            and travel processing, and our IT/hosting providers.
          </li>
        </ul>
        <p className="mt-3">We do not sell your personal data.</p>
      </>
    ),
  },
  {
    id: 'international',
    title: '5. International transfers',
    body: (
      <p>
        Because we place candidates in overseas roles, your data may be transferred to, and processed
        by, employers and authorities in other countries (for example across the Gulf, Europe and
        beyond). Where such transfers take place, we take reasonable steps to protect your data in
        line with applicable law.
      </p>
    ),
  },
  {
    id: 'retention',
    title: '6. How long we keep your data',
    body: (
      <p>
        We keep personal data only for as long as necessary for the purposes described above —
        including matching you to future opportunities — and to meet legal, regulatory and
        record-keeping requirements. You may ask us to delete your data at any time (see your rights
        below).
      </p>
    ),
  },
  {
    id: 'your-rights',
    title: '7. Your rights',
    body: (
      <>
        <p>Subject to applicable law, you may have the right to:</p>
        <ul className="mt-3">
          <li>access the personal data we hold about you;</li>
          <li>ask us to correct inaccurate or incomplete data;</li>
          <li>ask us to delete your data or restrict how we use it;</li>
          <li>withdraw consent where we rely on it; and</li>
          <li>object to certain processing.</li>
        </ul>
        <p className="mt-3">
          To exercise any of these, contact us at{' '}
          <a href={`mailto:${PRIVACY_EMAIL}`} className="text-primary hover:underline">
            {PRIVACY_EMAIL}
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: '8. Cookies & similar technologies',
    body: (
      <>
        <p>
          We keep our use of cookies and local storage to a minimum. At present this site uses only:
        </p>
        <ul className="mt-3">
          <li>
            <strong>Strictly necessary cookies</strong> — a secure session cookie
            (&ldquo;payload-token&rdquo;) is set only when an administrator signs in to manage the
            site. It is required for that function and is not used for tracking.
          </li>
          <li>
            <strong>Functional storage</strong> — your light/dark theme preference and your cookie
            choice are stored in your browser&rsquo;s local storage so the site remembers them.
          </li>
        </ul>
        <p className="mt-3">
          We do <strong>not</strong> currently use analytics, advertising or third-party tracking
          cookies. If we introduce analytics or marketing technologies in future, we will update this
          policy and ask for your consent before any such cookies are set. You can also control
          cookies through your browser settings; blocking essential cookies may affect how the site
          works.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: '9. Security',
    body: (
      <p>
        We take reasonable technical and organisational measures to protect personal data against
        loss, misuse and unauthorised access. No method of transmission or storage is completely
        secure, but we work to safeguard the information you share with us.
      </p>
    ),
  },
  {
    id: 'children',
    title: '10. Children',
    body: (
      <p>
        Our services are intended for adults seeking lawful overseas employment. We do not knowingly
        collect data from children.
      </p>
    ),
  },
  {
    id: 'changes',
    title: '11. Changes to this policy',
    body: (
      <p>
        We may update this policy from time to time. The &ldquo;last updated&rdquo; date at the top
        of this page shows when it was last revised. Please check back periodically.
      </p>
    ),
  },
  {
    id: 'contact',
    title: '12. Contact us',
    body: (
      <p>
        For any questions about this policy or your personal data, contact us at{' '}
        <a href={`mailto:${PRIVACY_EMAIL}`} className="text-primary hover:underline">
          {PRIVACY_EMAIL}
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

export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-16 md:py-24">
      <header>
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Legal</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Privacy &amp; Cookie Policy</h1>
        <p className="mt-3 text-muted-foreground">Last updated: {LAST_UPDATED}</p>
      </header>

      <div className="mt-6 rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/10 p-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Note:</strong> This is a template drafted for Falisha
        Manpower and should be reviewed by qualified legal counsel before launch to confirm it meets
        the requirements of every jurisdiction in which the company operates.
      </div>

      {/* On-page contents */}
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
    title: 'Privacy & Cookie Policy | Falisha Manpower',
    description:
      'How Falisha Manpower collects, uses, shares and protects personal data, and how we use cookies on this website.',
  }
}
