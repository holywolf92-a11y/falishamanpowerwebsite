import type { Metadata } from 'next/types'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  Download,
  Globe2,
  HardHat,
  Hotel,
  Mail,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Reveal from '@/components/visual/Reveal'
import { WorldPresence } from '@/components/visual/WorldPresence'

export const dynamic = 'force-dynamic'

const PDF_HREF = '/profile/falisha-company-profile.pdf'

const STATS = [
  { value: '15+', label: 'Years of experience' },
  { value: '50+', label: 'Countries served' },
  { value: '28', label: 'Core destination markets' },
  { value: 'ISO', label: '9001:2015 certified' },
]

const CREDENTIALS = [
  {
    logo: '/logos/credentials/beoe.webp',
    title: 'Government Registered',
    desc: 'Registered Overseas Employment Promoter in Pakistan — OEP Licence: H.R.D. 4035/RWP.',
  },
  {
    logo: '/logos/credentials/iso.webp',
    title: 'ISO Certified',
    desc: 'ISO 9001:2015 certified manpower recruitment agency in Pakistan.',
  },
  {
    logo: '/logos/credentials/fpcci.webp',
    title: 'PCCI Member',
    desc: 'PCCI-certified manpower recruitment agency in Pakistan.',
  },
]

const VALUES = [
  { t: 'Collaboration', d: 'We work hand-in-hand with employers and candidates as genuine, long-term partners.' },
  { t: 'Responsibility', d: 'Legal, ethical and transparent recruitment, with accountability at every step.' },
  { t: 'Customer Service', d: 'Clear communication and dedicated support from first contact through to deployment.' },
]

const WHY_US = [
  { t: 'Complete HR solutions', d: 'From executive-level professionals to skilled labour, we manage the entire recruitment cycle.' },
  { t: 'Legal & certified operations', d: 'ISO 9001:2015 certified and licensed by the Bureau of Emigration & Overseas Employment (Licence No. 4035/RWP).' },
  { t: 'Industry experience', d: 'We serve construction, healthcare, security, hospitality, oil & gas and many more sectors.' },
  { t: 'Streamlined process', d: 'A clear step-by-step system: advertising, shortlisting, interviewing, medical testing, visas and deployment.' },
]

const PROMISES = [
  'Clear communication, always',
  'Reliable, screened candidates',
  'Fast, transparent processing',
  'Global-standard compliance',
  'Ongoing support after placement',
  'A partnership you can count on',
]

const DIVISIONS = [
  {
    img: '/profile/trades.svg',
    Icon: HardHat,
    title: 'Skilled Trades & Construction',
    desc: 'Skilled and semi-skilled workers for construction, civil, oil & gas and industrial projects — pre-screened, medically cleared and internationally compliant.',
    roles: [
      'Civil Workers', 'Welders & Fabricators', 'Masons & Steel Fixers', 'Electricians & Plumbers',
      'Heavy Equipment Operators', 'Scaffolders & Riggers', 'General Labourers', 'Site Supervisors',
      'Safety Officers', 'Foremen', 'Project Engineers', 'Quantity Surveyors', 'Construction Managers',
      'QA/QC Inspectors', 'HVAC Technicians', 'Superintendents',
    ],
  },
  {
    img: '/profile/professionals.svg',
    Icon: Briefcase,
    title: 'The Professionals',
    desc: 'Mid- to senior-level professionals across diverse industries, matched through targeted sourcing, rigorous screening and market insight.',
    roles: [
      'Accountancy & Finance', 'Banking & Insurance', 'Contact Centre Operations', 'Human Resources',
      'Information Technology', 'Legal Services', 'Office & Administrative Support', 'Property & Real Estate',
      'Retail Management', 'Sales & Marketing', 'Engineering & Technical', 'Operations & Supply Chain',
      'Executive Leadership Roles', 'Healthcare & Medical Administration',
    ],
  },
  {
    img: '/profile/hospitality.svg',
    Icon: Hotel,
    title: 'Hospitality & Hotel Staffing',
    desc: 'Skilled professionals for hotels, restaurants and tourism services overseas, supported by our licensed and ISO-certified operations.',
    roles: [
      'Hotel Managers & Front-Office', 'Chefs & Kitchen Hands', 'Housekeeping Supervisors',
      'Waiters & Bar Staff', 'Receptionists & Restaurant Hosts', 'Event Planners & Banquet Staff',
      'Mini-Site Hospitality Staff', 'Camp-Site Managers',
    ],
  },
]

const STEPS = [
  { t: 'The Role', d: 'We start by understanding your requirement — the skills, experience and fit the role needs.' },
  { t: 'The Search', d: 'We source and shortlist candidates on qualifications, experience and role fit.' },
  { t: 'Interviews', d: 'Technical assessments, presentations or group exercises to evaluate skills and fit.' },
  { t: 'Reference & Checks', d: 'Document verification, references and medical screening for overseas/GCC requirements.' },
  { t: 'Placement', d: 'A formal offer, full visa processing, onboarding and post-placement follow-up.' },
]

const REGIONS = ['Gulf / GCC', 'Europe', 'Africa', 'Asia']

const CONTACT = {
  address: 'Umer Farooq Plaza, Murree Road, Chandni Chowk, Office No 10-11-12, 1st Floor, Rawalpindi',
  branches: 'Islamabad · Lahore · Karachi · AJK',
  phones: [
    { display: '+92 51 4927145-6', href: 'tel:+92514927145' },
    { display: '+92 330 3333335', href: 'tel:+923303333335' },
    { display: '+92 346 5028305', href: 'tel:+923465028305' },
  ],
  emails: ['info@falishamanpower.com', 'ceo@falishamanpower.com'],
}

const gridOverlay = {
  backgroundImage:
    'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
  backgroundSize: '44px 44px',
  maskImage: 'radial-gradient(130% 100% at 20% 0%, black, transparent 72%)',
  WebkitMaskImage: 'radial-gradient(130% 100% at 20% 0%, black, transparent 72%)',
} as const

export default function ProfilePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-14 text-white md:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60" style={gridOverlay} />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 h-[32rem] w-[32rem] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(79,121,255,0.28), transparent 70%)' }}
        />
        <div className="container relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Company Profile</p>
              <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
                Falisha Manpower Recruitment Group
              </h1>
              <p className="mt-4 max-w-xl text-lg text-white/70">
                A BEOE-licensed Overseas Employment Promoter (OEP 4035), ISO 9001:2015 certified —
                placing skilled, professional and technical Pakistani talent with employers across the
                Gulf, Europe, Africa and Asia. Trusted since 2004.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-semibold text-white/80 ring-1 ring-white/15">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--gold)]" /> BEOE Licensed · OEP 4035
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-semibold text-white/80 ring-1 ring-white/15">
                  <BadgeCheck className="h-3.5 w-3.5 text-[var(--gold)]" /> ISO 9001:2015 Certified
                </span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-6">
                  <a href={PDF_HREF} download><Download className="mr-1.5 h-4 w-4" /> Download brochure</a>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white">
                  <Link href="/fill-a-vacancy">Request workforce <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-white p-5 shadow-2xl shadow-black/40 ring-1 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/profile/hero.svg" alt="Global overseas recruitment — Falisha Manpower connects Pakistani talent to the Gulf, Europe and Asia" className="block w-full" width={560} height={420} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-background">
        <div className="container grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className={`px-4 py-8 text-center ${i < 2 ? 'border-b md:border-b-0' : ''} ${i % 2 === 0 ? 'border-r' : ''} ${i === 2 ? 'md:border-l' : ''} border-border`}>
              <p className="text-3xl font-bold tracking-tight text-primary md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="border-b border-border py-16 md:py-20">
        <div className="container max-w-3xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">About us</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Who we are</h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Falisha Manpower is a licensed and ISO 9001:2015 certified overseas employment promoter
                based in Rawalpindi, Pakistan. With over 15 years of experience, we specialise in providing
                skilled and unskilled workforce to employers across the Gulf, Europe, Africa and Asia.
              </p>
              <p>
                Approved by the Ministry of Overseas Pakistanis &amp; Human Resource Development (OEP Licence
                No. 4035), we ensure legal, ethical and efficient recruitment — managing the full journey
                from candidate selection to visa processing and deployment. Whether you’re an employer adding
                top talent or a job seeker looking for expert guidance, our network becomes your advantage.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-primary">Our mission</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  To connect Pakistani skilled and semi-skilled workers with global job opportunities
                  through reliable, certified recruitment services — since 2004.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-primary">Our purpose</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  To simplify hiring by connecting employers with the right talent, promoting Pakistan’s
                  skilled workforce globally through trusted and efficient recruitment.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Accreditations */}
          <Reveal>
            <div className="mt-12">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Accredited &amp; registered
              </p>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                {CREDENTIALS.map((c) => (
                  <div
                    key={c.title}
                    className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center"
                  >
                    <div className="grid h-20 w-20 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.logo} alt={c.title} className="h-14 w-14 object-contain" width={56} height={56} />
                    </div>
                    <h3 className="mt-4 font-semibold">{c.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Global presence */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-16 text-white md:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50" style={gridOverlay} />
        <div className="container relative">
          <Reveal>
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                <Globe2 className="h-4 w-4" /> Global presence
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                Deploying talent to 50+ countries
              </h2>
              <p className="mt-3 text-white/70">
                From our head office in Rawalpindi, we place Pakistani workers across the Gulf, Europe,
                Africa and Asia — with 28 core destination markets and a nationwide sourcing network.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <WorldPresence className="mt-8 w-full" />
          </Reveal>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            <span className="inline-flex items-center gap-2 text-white/75">
              <span className="h-3 w-3 rounded-sm bg-[#4f79ff]" /> Destination markets
            </span>
            <span className="inline-flex items-center gap-2 text-white/75">
              <span className="h-3 w-3 rounded-full bg-[var(--gold)]" /> Pakistan — our home base
            </span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            {REGIONS.map((r) => (
              <span key={r} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/15">
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Divisions */}
      <section className="border-b border-border py-16 md:py-20">
        <div className="container">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">What we recruit</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Three specialist divisions</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              From site to boardroom to front-of-house — we source, screen and deploy across the full
              spectrum of overseas manpower needs.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {DIVISIONS.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.08}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={d.img} alt={`${d.title} — illustration`} className="mx-auto block h-48 w-full object-contain p-5" width={420} height={315} loading="lazy" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <d.Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-lg font-bold tracking-tight">{d.title}</h3>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{d.desc}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {d.roles.map((r) => (
                        <li key={r} className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground/80">
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-border bg-secondary/30 py-16 md:py-20">
        <div className="container">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Our process</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">How we work — five simple steps</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              A clear, honest process designed to make hiring smooth, transparent and successful for both
              clients and candidates.
            </p>
          </Reveal>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.06}>
                <li className="relative h-full rounded-xl border border-border bg-card p-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 ring-4 ring-primary/10">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-semibold">{s.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership */}
      <section className="border-b border-border py-16 md:py-20">
        <div className="container max-w-4xl">
          <Reveal>
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
              <div className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/profile/ceo.webp" alt="Raja Abid Ayoub, Founder & CEO of Falisha Manpower" width={420} height={420} className="h-40 w-40 rounded-full object-cover shadow-xl ring-4 ring-primary/20" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Leadership</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Raja Abid Ayoub</h2>
                <p className="mt-0.5 text-sm font-medium text-muted-foreground">Founder &amp; CEO</p>
                <Quote className="mt-4 h-6 w-6 text-primary/40" aria-hidden />
                <div className="mt-2 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
                  <p>
                    With a background in law (LLB) and more than 15 years in international recruitment, I
                    founded Falisha Manpower in 2004 with a simple vision — to bridge the gap between
                    talented individuals and valuable employment opportunities worldwide.
                  </p>
                  <p>
                    Having travelled extensively across Europe and the Gulf, we’ve built this company on
                    professionalism, innovation and customer satisfaction. We’re not just a recruitment
                    agency — we’re a bridge to new opportunities and brighter futures.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-border bg-secondary/30 py-16 md:py-20">
        <div className="container">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Our values</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">What we stand for</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.08}>
                <div className="h-full rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold">{v.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="border-b border-border py-16 md:py-20">
        <div className="container">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Why Falisha Manpower</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Why employers choose us</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {WHY_US.map((w, i) => (
              <Reveal key={w.t} delay={i * 0.06}>
                <div className="flex h-full gap-4 rounded-xl border border-border bg-card p-6">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold">{w.t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{w.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment & promises */}
      <section className="border-b border-border bg-secondary/30 py-16 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Our commitment</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">We stand by clients and workers</h2>
              <p className="mt-4 text-muted-foreground">
                Our agency goes beyond hiring — we ensure compliance, training and quality at every step.
                From candidate screening to post-deployment support, we value long-term partnerships, clear
                communication and ethical hiring practices that reflect our deep commitment to quality and
                trust.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {PROMISES.map((p) => (
                <li key={p} className="flex items-center gap-2.5 rounded-lg border border-border bg-card p-3.5 text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-16 text-white md:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50" style={gridOverlay} />
        <div className="container relative grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Get in touch</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Let’s build your workforce</h2>
              <p className="mt-4 max-w-md text-white/70">
                Hiring skilled manpower from Pakistan, or seeking an overseas role? Our team is ready to
                help — from your first enquiry to on-site deployment.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-6"><Link href="/fill-a-vacancy">Request workforce</Link></Button>
                <Button asChild variant="outline" className="rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"><Link href="/contact">Contact us</Link></Button>
                <Button asChild variant="outline" className="rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"><a href={PDF_HREF} download><Download className="mr-1.5 h-4 w-4" /> Brochure</a></Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-sm backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold)]" />
                <div>
                  <p className="font-semibold">Head office</p>
                  <p className="mt-1 text-white/70">{CONTACT.address}</p>
                  <p className="mt-1 text-white/55">Branches: {CONTACT.branches}</p>
                </div>
              </div>
              <div className="mt-5 flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold)]" />
                <div className="flex flex-col gap-1">
                  {CONTACT.phones.map((p) => (
                    <a key={p.href} href={p.href} className="text-white/80 transition-colors hover:text-white">{p.display}</a>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold)]" />
                <div className="flex flex-col gap-1">
                  {CONTACT.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="text-white/80 transition-colors hover:text-white">{e}</a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    alternates: { canonical: '/profile' },
    title: 'Company Profile | Falisha Manpower',
    description:
      'The Falisha Manpower company profile — who we are, our global presence, leadership, values, the sectors and roles we recruit for (trades & construction, professionals, hospitality) and our 5-step process. BEOE-licensed (OEP 4035), ISO 9001:2015 certified overseas recruitment group in Pakistan.',
  }
}
