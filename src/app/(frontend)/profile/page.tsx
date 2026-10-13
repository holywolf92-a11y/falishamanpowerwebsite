import type { Metadata } from 'next/types'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Download,
  Globe2,
  HardHat,
  HeartHandshake,
  Hotel,
  Mail,
  MapPin,
  Phone,
  Plane,
  Quote,
  Route,
  ShieldCheck,
  UserSearch,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Reveal, { CountUp } from '@/components/visual/Reveal'
import { WorldPresence } from '@/components/visual/WorldPresence'
import { LogoMarquee } from '@/components/visual/LogoMarquee'
import { ExpandableRoles } from '@/components/visual/ExpandableRoles'
import { CLIENT_LOGOS } from '@/utilities/sectionImages'

export const dynamic = 'force-dynamic'

const PDF_HREF = '/profile/falisha-company-profile.pdf'

const STATS: { num?: number; suffix?: string; unit?: string; text?: string; sub: string }[] = [
  { num: 22, suffix: '+', unit: 'Years', sub: 'Recruitment experience' },
  { num: 50, suffix: '+', unit: 'Countries', sub: 'Global reach' },
  { num: 28, unit: 'Markets', sub: 'Core destinations' },
  { text: 'End-to-End', sub: 'Recruitment & deployment' },
]

const CREDENTIALS = [
  {
    logo: '/logos/credentials/beoe.webp',
    title: 'Government Registered',
    desc: 'Registered Overseas Employment Promoter in Pakistan — OEP Licence H.R.D. 4035/RWP.',
  },
  {
    logo: '/logos/credentials/iso.webp',
    title: 'ISO 9001:2015 Certified',
    desc: 'Quality-management certified for overseas manpower services.',
  },
  {
    logo: '/logos/credentials/fpcci.webp',
    title: 'PCCI Member',
    desc: 'Member of the chamber of commerce & industry — a recognised recruitment group.',
  },
]

const CORRIDORS = [
  { from: 'Pakistan', to: 'GCC', note: 'Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain' },
  { from: 'Pakistan', to: 'Europe', note: 'Türkiye, Romania, Poland, Germany, Italy & more' },
  { from: 'Pakistan', to: 'Asia', note: 'Japan, South Korea, Malaysia, Central Asia' },
  { from: 'Pakistan', to: 'Africa', note: 'Libya & North-African projects' },
]

const DIVISIONS = [
  {
    img: '/profile/trades.webp',
    Icon: HardHat,
    title: 'Skilled Trades & Construction',
    desc: 'Pre-screened, medically-cleared workers for construction, civil, oil & gas and industrial projects — ready to meet your timelines and quality standards.',
    roles: [
      'Civil Workers', 'Welders & Fabricators', 'Masons & Steel Fixers', 'Electricians & Plumbers',
      'Heavy Equipment Operators', 'Scaffolders & Riggers', 'General Labourers', 'Site Supervisors',
      'Safety Officers', 'Foremen', 'Project Engineers', 'Quantity Surveyors', 'Construction Managers',
      'QA/QC Inspectors', 'HVAC Technicians', 'Superintendents',
    ],
  },
  {
    img: '/profile/professionals.webp',
    Icon: Briefcase,
    title: 'Professional Recruitment',
    desc: 'Mid- to senior-level professionals across diverse industries, matched through targeted sourcing, rigorous screening and market insight.',
    roles: [
      'Accountancy & Finance', 'Banking & Insurance', 'Information Technology', 'Human Resources',
      'Legal Services', 'Sales & Marketing', 'Engineering & Technical', 'Operations & Supply Chain',
      'Office & Administrative Support', 'Property & Real Estate', 'Retail Management',
      'Executive Leadership Roles', 'Healthcare & Medical Administration', 'Contact Centre Operations',
    ],
  },
  {
    img: '/profile/hospitality.webp',
    Icon: Hotel,
    title: 'Hospitality & Services',
    desc: 'Skilled professionals for hotels, restaurants and tourism services overseas — polished, service-ready and internationally compliant.',
    roles: [
      'Hotel Managers & Front-Office', 'Chefs & Kitchen Hands', 'Housekeeping Supervisors',
      'Waiters & Bar Staff', 'Receptionists & Restaurant Hosts', 'Event Planners & Banquet Staff',
      'Mini-Site Hospitality Staff', 'Camp-Site Managers',
    ],
  },
]

const STEPS = [
  { Icon: ClipboardList, t: 'Requirement', d: 'We map your exact workforce needs — skills, volumes, timelines and compliance.' },
  { Icon: UserSearch, t: 'Search', d: 'We source and shortlist from a nationwide talent pool and our databases.' },
  { Icon: ClipboardCheck, t: 'Assessment', d: 'Technical assessment, trade testing and interviews to confirm the right fit.' },
  { Icon: ShieldCheck, t: 'Verification', d: 'Document verification, references and medical screening for GCC & overseas rules.' },
  { Icon: Plane, t: 'Deployment', d: 'Visas, Protector formalities, onboarding and on-time mobilisation.' },
]

const WHY = [
  { Icon: ShieldCheck, t: 'Licensed & Compliant', d: 'BEOE-licensed OEP (4035/RWP) and ISO 9001:2015 certified — legal and ethical at every step.' },
  { Icon: Clock, t: '22+ Years Experience', d: 'A trusted overseas recruitment partner since 2004.' },
  { Icon: Globe2, t: 'Global Recruitment Network', d: 'Employer relationships across the Gulf, Europe, Africa and Asia.' },
  { Icon: Users, t: 'Nationwide Talent Sourcing', d: 'Professional, technical, skilled and general manpower from across Pakistan.' },
  { Icon: Route, t: 'End-to-End Deployment', d: 'Sourcing, screening, visas, attestation and mobilisation — all in one place.' },
  { Icon: HeartHandshake, t: 'Long-Term Employer Support', d: 'Post-deployment support and a partnership you can count on.' },
]

const ACTIVITIES = [
  { Icon: ClipboardCheck, label: 'Trade testing' },
  { Icon: Users, label: 'Interviews' },
  { Icon: Building2, label: 'Our offices' },
  { Icon: Plane, label: 'Deployment' },
]

const CONTACT = {
  address: 'Umer Farooq Plaza, Murree Road, Chandni Chowk, Office 10-11-12, 1st Floor, Rawalpindi',
  branches: 'Lahore · Karachi · Peshawar · AJK',
  phones: [
    { display: '+92 51 4927145-6', href: 'tel:+92514927145' },
    { display: '+92 330 3333335', href: 'tel:+923303333335' },
    { display: '+92 346 5028305', href: 'tel:+923465028305' },
  ],
  emails: ['info@falishamanpower.com', 'ceo@falishamanpower.com'],
}

const gridOverlay = {
  backgroundImage:
    'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
  backgroundSize: '48px 48px',
  maskImage: 'radial-gradient(130% 100% at 25% 0%, black, transparent 72%)',
  WebkitMaskImage: 'radial-gradient(130% 100% at 25% 0%, black, transparent 72%)',
} as const

export default function ProfilePage() {
  return (
    <div>
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden bg-[var(--navy)] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70" style={gridOverlay} />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-24 h-[40rem] w-[40rem] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(79,121,255,0.3), transparent 70%)' }}
        />
        <div className="container relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.08fr_1fr]">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 ring-1 ring-white/15">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" /> International Recruitment Group
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">
                Connecting Pakistan’s Talent
                <br />
                <span className="text-[var(--gold)]">with the World.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                Falisha Manpower is a licensed, ISO-certified overseas recruitment group placing skilled,
                professional and technical Pakistani talent with employers across the Gulf, Europe, Africa
                and Asia — managing sourcing, screening, visas and deployment, end to end.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-wrap gap-2.5 text-xs">
                {[
                  { Icon: ShieldCheck, t: 'BEOE Licensed · OEP 4035' },
                  { Icon: BadgeCheck, t: 'ISO 9001:2015' },
                  { Icon: Clock, t: 'Established 2004' },
                ].map((b) => (
                  <span key={b.t} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-semibold text-white/80 ring-1 ring-white/15">
                    <b.Icon className="h-3.5 w-3.5 text-[var(--gold)]" /> {b.t}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full px-7">
                  <Link href="/fill-a-vacancy">Request Workforce <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white">
                  <a href={PDF_HREF} download><Download className="mr-1.5 h-4 w-4" /> Download Company Profile</a>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/profile/hero.webp" alt="Falisha Manpower — a skilled Pakistani engineer at an overseas construction project" className="block aspect-[4/3] w-full object-cover" width={1200} height={900} />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/10 bg-white/[0.03]">
          <div className="container grid grid-cols-2 divide-white/10 md:grid-cols-4 md:divide-x">
            {STATS.map((s, i) => (
              <Reveal key={s.sub} delay={i * 0.08}>
                <div className="px-4 py-8 text-center md:py-10">
                  <p className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                    {s.num != null ? <CountUp to={s.num} suffix={s.suffix ?? ''} /> : s.text}
                    {s.unit && <span className="ml-1.5 text-xl font-semibold text-white/60 md:text-2xl">{s.unit}</span>}
                  </p>
                  <p className="mt-2 text-sm text-white/55">{s.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Who we are ───────── */}
      <section className="py-20 md:py-28">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Who we are</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Two decades of trusted overseas recruitment
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  Founded in 2004 and headquartered in Rawalpindi, Falisha Manpower has grown into a
                  recognised international recruitment group. We specialise in sourcing skilled and
                  unskilled workforce for employers across the Gulf, Europe, Africa and Asia.
                </p>
                <p>
                  Approved by the Ministry of Overseas Pakistanis &amp; Human Resource Development (OEP
                  Licence 4035) and ISO 9001:2015 certified, we manage the complete journey — from
                  candidate sourcing and trade testing to visas, documentation and on-time deployment.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-8">
                <div>
                  <p className="text-2xl font-bold text-primary">Our mission</p>
                  <p className="mt-1 max-w-xs text-sm text-muted-foreground">Connecting Pakistan’s skilled workforce with global opportunities, reliably and ethically.</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">Our purpose</p>
                  <p className="mt-1 max-w-xs text-sm text-muted-foreground">Simplifying hiring for employers while building better futures for candidates.</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                {ACTIVITIES.map((a, i) => (
                  <div
                    key={a.label}
                    className={`flex aspect-[4/3] flex-col justify-end rounded-2xl p-5 ${
                      i % 3 === 0 ? 'bg-[var(--navy)] text-white' : 'border border-border bg-secondary/50'
                    }`}
                  >
                    <a.Icon className={`h-6 w-6 ${i % 3 === 0 ? 'text-[var(--gold)]' : 'text-primary'}`} />
                    <p className={`mt-3 text-sm font-semibold ${i % 3 === 0 ? 'text-white' : 'text-foreground'}`}>{a.label}</p>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-5 -left-5 rounded-2xl bg-primary px-5 py-4 text-primary-foreground shadow-xl shadow-primary/25">
                <p className="text-2xl font-bold leading-none">Since 2004</p>
                <p className="mt-1 text-xs text-primary-foreground/80">Building global careers from Pakistan.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Accreditations ───────── */}
      <section className="border-y border-border bg-secondary/30 py-20 md:py-24">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Credentials</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Licensed. Certified. Trusted.</h2>
              <p className="mt-3 text-muted-foreground">
                Government-registered and quality-certified — the assurance overseas employers look for.
              </p>
            </div>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-3">
            {CREDENTIALS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="group flex h-full flex-col items-center rounded-2xl border border-border bg-background p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="grid h-24 w-24 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.logo} alt={c.title} className="h-16 w-16 object-contain" width={64} height={64} />
                  </div>
                  <h3 className="mt-5 font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Global presence ───────── */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-20 text-white md:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50" style={gridOverlay} />
        <div className="container relative">
          <Reveal>
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                <Globe2 className="h-4 w-4" /> Global presence
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Global reach. Local expertise.</h2>
              <p className="mt-4 text-white/70">
                From our head office in Rawalpindi, we deploy Pakistani talent across 28 core markets in
                four regions — combining a worldwide employer network with on-the-ground sourcing at home.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <WorldPresence className="mt-10 w-full" />
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CORRIDORS.map((c, i) => (
              <Reveal key={c.to} delay={i * 0.06}>
                <div className="rounded-2xl border border-white/12 bg-white/5 p-5">
                  <p className="flex items-center gap-2 text-lg font-semibold">
                    {c.from} <ArrowRight className="h-4 w-4 text-[var(--gold)]" /> {c.to}
                  </p>
                  <p className="mt-1.5 text-xs text-white/55">{c.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Divisions ───────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">What we recruit</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Three specialist divisions</h2>
              <p className="mt-3 text-muted-foreground">
                From site to boardroom to front-of-house — dedicated teams source, screen and deploy across
                the full spectrum of overseas manpower.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {DIVISIONS.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.08}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={d.img} alt={`${d.title} — Falisha Manpower`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" width={900} height={600} loading="lazy" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <d.Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-lg font-bold tracking-tight">{d.title}</h3>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{d.desc}</p>
                    <div className="mt-5">
                      <ExpandableRoles roles={d.roles} initial={6} />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── How we work (timeline) ───────── */}
      <section className="border-y border-border bg-secondary/30 py-20 md:py-24">
        <div className="container">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">How we work</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">The full recruitment lifecycle</h2>
              <p className="mt-3 text-muted-foreground">
                One accountable process — from your first requirement to a worker on site.
              </p>
            </div>
          </Reveal>
          <div className="relative mt-12">
            {/* connecting line (desktop) */}
            <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-border lg:block" />
            <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
              {STEPS.map((s, i) => (
                <Reveal key={s.t} delay={i * 0.08}>
                  <li className="relative">
                    <div className="relative z-10 flex items-center gap-4 lg:block">
                      <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm">
                        <s.Icon className="h-6 w-6" />
                      </span>
                      <span className="text-sm font-bold text-primary/50 lg:mt-4 lg:block">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-2 font-semibold lg:mt-1">{s.t}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────── Leadership ───────── */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-20 text-white md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50" style={gridOverlay} />
        <div className="container relative grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/profile/ceo.webp" alt="Raja Abid Ayoub, Founder & CEO of Falisha Manpower" width={440} height={520} className="w-full rounded-2xl object-cover shadow-2xl shadow-black/50 ring-1 ring-white/10" />
              <div className="absolute -bottom-5 -right-5 rounded-xl bg-[var(--gold)] px-4 py-3 text-navy shadow-xl" style={{ color: '#1a1333' }}>
                <p className="text-sm font-bold leading-none">Raja Abid Ayoub</p>
                <p className="mt-1 text-xs font-medium opacity-80">Founder &amp; CEO</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Leadership</p>
              <Quote className="mt-5 h-10 w-10 text-white/20" aria-hidden />
              <blockquote className="mt-3 text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
                “We don’t simply fill positions. We connect people with opportunities that can change their
                lives.”
              </blockquote>
              <div className="mt-6 space-y-3 text-[15px] leading-relaxed text-white/65">
                <p>
                  With a background in law and more than two decades in international recruitment, our
                  founder built Falisha Manpower on professionalism, integrity and customer satisfaction —
                  travelling extensively across Europe and the Gulf to build lasting employer relationships.
                </p>
              </div>
              <p className="mt-6 text-lg font-semibold">Raja Abid Ayoub</p>
              <p className="text-sm text-white/55">Founder &amp; Chief Executive Officer</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Why Falisha ───────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Why Falisha</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Built for serious employers</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.t} delay={i * 0.05}>
                <div className="flex gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-primary">
                    <w.Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-semibold">{w.t}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{w.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Social proof ───────── */}
      <section className="border-y border-border bg-secondary/30 py-16">
        <div className="container">
          <Reveal>
            <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Trusted by employers across the Gulf, Europe &amp; Asia
            </p>
          </Reveal>
          <div className="mt-8">
            <LogoMarquee logos={CLIENT_LOGOS} />
          </div>
        </div>
      </section>

      {/* ───────── Final CTA ───────── */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-20 text-white md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60" style={gridOverlay} />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(79,121,255,0.25), transparent 70%)' }}
        />
        <div className="container relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Building your next workforce?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
              Let’s find the people who will move your business forward — sourced, screened and deployed
              with a licensed partner you can trust.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-7">
                <Link href="/fill-a-vacancy">Request Workforce <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white">
                <Link href="/contact">Talk to Our Team</Link>
              </Button>
            </div>
          </Reveal>

          {/* slim contact strip */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-14 grid max-w-4xl gap-5 border-t border-white/10 pt-8 text-left text-sm sm:grid-cols-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                <div>
                  <p className="font-semibold">Head office</p>
                  <p className="mt-1 text-white/60">{CONTACT.address}</p>
                  <p className="mt-1 text-white/45">Branches: {CONTACT.branches}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                <div className="flex flex-col gap-1">
                  {CONTACT.phones.map((p) => (
                    <a key={p.href} href={p.href} className="text-white/70 hover:text-white">{p.display}</a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                <div className="flex flex-col gap-1">
                  {CONTACT.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="text-white/70 hover:text-white">{e}</a>
                  ))}
                  <a href={PDF_HREF} download className="mt-1 inline-flex items-center gap-1 font-semibold text-[var(--gold)] hover:underline">
                    <Download className="h-3.5 w-3.5" /> Company profile (PDF)
                  </a>
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
    robots: { index: false, follow: true },
    title: 'Company Profile | Falisha Manpower',
    description:
      'Falisha Manpower — a licensed (OEP 4035), ISO 9001:2015 certified international recruitment group connecting Pakistan’s skilled, professional and technical talent with employers across the Gulf, Europe, Africa and Asia since 2004.',
  }
}
