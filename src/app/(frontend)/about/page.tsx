import type { Metadata } from 'next/types'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Compass,
  Download,
  Eye,
  Globe2,
  HeartHandshake,
  Plane,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  UserSearch,
  Users,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Reveal, { CountUp } from '@/components/visual/Reveal'
import { Tilt3D } from '@/components/visual/Tilt3D'
import { SmoothScrollProvider } from '@/components/visual/SmoothScrollProvider'
import { ScrollProgress } from '@/components/visual/ScrollProgress'
import { KineticHeading } from '@/components/visual/KineticHeading'
import { SpotlightCard } from '@/components/visual/SpotlightCard'
import { Magnetic } from '@/components/visual/Magnetic'
import { WorldJourney } from '@/components/visual/WorldJourney'
import { breadcrumbSchema } from '@/utilities/breadcrumbSchema'

export const dynamic = 'force-dynamic'

const PDF_HREF = '/profile/falisha-company-profile.pdf'
const display = 'font-display'

const STATS: { num?: number; suffix?: string; unit?: string; text?: string; sub: string }[] = [
  { num: 15, suffix: '+', unit: 'Years', sub: 'Recruitment experience' },
  { num: 50, suffix: '+', unit: 'Countries', sub: 'Global reach' },
  { num: 28, unit: 'Markets', sub: 'Core destinations' },
  { text: 'End-to-End', sub: 'Sourcing to deployment' },
]

const VALUES = [
  { Icon: ShieldCheck, t: 'Integrity & compliance', d: 'Lawful, licensed recruitment — ethical at every step, with nothing hidden.' },
  { Icon: HeartHandshake, t: 'People first', d: 'Fair treatment of workers and genuine, honest service to employers.' },
  { Icon: Eye, t: 'Transparency', d: 'Clear terms, clear timelines and clear communication on both sides.' },
  { Icon: BadgeCheck, t: 'Quality', d: 'The right candidates, verified and trade-tested, delivered to specification.' },
  { Icon: Route, t: 'Accountability', d: 'One partner owning the whole journey, from requirement to arrival on site.' },
]

const WHY = [
  { Icon: ShieldCheck, t: 'Government-licensed & compliant', d: 'A registered Overseas Employment Promoter (OEP Licence No. 4035, BEOE). Every deployment is processed lawfully through Protector of Emigrants clearance.' },
  { Icon: Users, t: 'A deep, nationwide talent pool', d: 'A standing candidate network sourced across Pakistan, with offices in Rawalpindi, Lahore, Karachi, Peshawar and AJK.' },
  { Icon: CheckCircle2, t: 'Vetted, trade-tested candidates', d: 'Experience, documents and references verified, and workers trade-tested to your specification before you interview.' },
  { Icon: Route, t: 'End-to-end, from sourcing to site', d: 'Sourcing, screening, documentation, medicals, visas, attestation, ticketing and on-time mobilisation — one accountable partner.' },
  { Icon: Zap, t: 'Speed at scale', d: 'From a single specialist to a project-scale workforce of several hundred, mobilised quickly without cutting corners.' },
  { Icon: HeartHandshake, t: 'Ethical recruitment', d: 'The Employer Pays Principle, no document retention and zero tolerance for forced labour.' },
]

const PROCESS = [
  { Icon: ClipboardList, t: 'Requirement', d: 'We map your exact needs — roles, skills, volumes, destination and compliance.' },
  { Icon: UserSearch, t: 'Source & screen', d: 'Nationwide sourcing and shortlisting from our standing candidate network.' },
  { Icon: ClipboardCheck, t: 'Assess & select', d: 'Trade testing, technical assessment and interviews — you select your hires.' },
  { Icon: ShieldCheck, t: 'Document & verify', d: 'Medicals, references, document attestation and Protector of Emigrants clearance.' },
  { Icon: Plane, t: 'Deploy', d: 'Visas, ticketing and on-time mobilisation — workers arrive ready to work.' },
]

const CREDENTIALS = [
  { logo: '/logos/credentials/beoe.webp', title: 'Government Registered', desc: 'Registered Overseas Employment Promoter in Pakistan — OEP Licence H.R.D. 4035/RWP.' },
  { logo: '/logos/credentials/iso.webp', title: 'ISO 9001:2015 Certified', desc: 'Quality-management certified for overseas manpower services.' },
  { logo: '/logos/credentials/fpcci.webp', title: 'Chamber Member', desc: 'Member of the chamber of commerce & industry — a recognised recruitment group.' },
]

const REACH = [
  { from: 'Pakistan', to: 'The Gulf', note: 'Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain' },
  { from: 'Pakistan', to: 'Europe', note: 'Türkiye, Romania, Poland & more' },
  { from: 'Pakistan', to: 'Asia', note: 'Japan, South Korea, Malaysia, Central Asia' },
  { from: 'Pakistan', to: 'Africa', note: 'Libya & North-African projects' },
]

const OFFICES = ['Rawalpindi (HO)', 'Lahore', 'Karachi', 'Peshawar', 'AJK']

const gridOverlay = {
  backgroundImage:
    'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
  backgroundSize: '48px 48px',
  maskImage: 'radial-gradient(130% 100% at 25% 0%, black, transparent 72%)',
  WebkitMaskImage: 'radial-gradient(130% 100% at 25% 0%, black, transparent 72%)',
} as const

export default function AboutPage() {
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'About us', path: '/about' },
            ]),
          ),
        }}
      />

      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden bg-[var(--navy)] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70" style={gridOverlay} />
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-24 h-[40rem] w-[40rem] rounded-full" style={{ background: 'radial-gradient(circle, rgba(79,121,255,0.3), transparent 70%)' }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 left-10 h-[30rem] w-[30rem] rounded-full" style={{ background: 'radial-gradient(circle, rgba(244,183,64,0.14), transparent 70%)' }} />
        <div className="container relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.08fr_1fr]">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 ring-1 ring-white/15">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" /> About Falisha Manpower
              </p>
            </Reveal>
            <KineticHeading
              as="h1"
              lines={['One of the most trusted', 'recruitment agencies for', 'Pakistani manpower.']}
              igniteWord="Pakistani"
              className={`${display} mt-5 text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl md:text-[3.5rem]`}
            />
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                A Government-licensed overseas recruitment agency in Pakistan (OEP Licence No. 4035, BEOE-registered),
                connecting international employers with skilled, dependable Pakistani workers — and connecting Pakistani
                talent with genuine overseas employment, end to end.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-wrap gap-2.5 text-xs">
                {[
                  { Icon: ShieldCheck, t: 'BEOE Licensed · OEP 4035' },
                  { Icon: BadgeCheck, t: 'ISO 9001:2015' },
                  { Icon: Clock, t: 'Established 2011' },
                ].map((b) => (
                  <span key={b.t} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-semibold text-white/80 ring-1 ring-white/15">
                    <b.Icon className="h-3.5 w-3.5 text-[var(--gold)]" /> {b.t}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Magnetic>
                  <Button asChild size="lg" className="rounded-full px-7">
                    <Link href="/hire-from-pakistan">Hire from Pakistan <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white">
                    <a href={PDF_HREF} download><Download className="mr-1.5 h-4 w-4" /> Company profile</a>
                  </Button>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <Tilt3D max={8} className="relative mx-auto w-full max-w-md">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-black/50 ring-1 ring-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/profile/hero.webp" alt="Falisha Manpower — overseas recruitment from Pakistan" className="block aspect-[4/3] w-full object-cover" width={1200} height={900} />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -left-5 rounded-2xl bg-primary px-5 py-4 text-primary-foreground shadow-xl shadow-primary/25" style={{ transform: 'translateZ(60px)' }}>
                <p className={`${display} text-2xl font-bold leading-none`}>Since 2011</p>
                <p className="mt-1 text-xs text-primary-foreground/80">Global careers from Pakistan.</p>
              </div>
            </Tilt3D>
          </Reveal>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/10 bg-white/[0.03]">
          <div className="container grid grid-cols-2 divide-white/10 md:grid-cols-4 md:divide-x">
            {STATS.map((s, i) => (
              <Reveal key={s.sub} delay={i * 0.08}>
                <div className="px-4 py-8 text-center md:py-10">
                  <p className={`${display} text-4xl font-bold tracking-tight text-white md:text-5xl`}>
                    {s.num != null ? <CountUp to={s.num} suffix={s.suffix ?? ''} /> : s.text}
                    {s.unit && <span className="ml-1.5 text-xl font-semibold text-white/55 md:text-2xl">{s.unit}</span>}
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
        <div className="container grid items-start gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Who we are</p>
            <KineticHeading
              as="h2"
              lines={['A trusted overseas recruitment', 'partner, built over 15+ years']}
              className={`${display} mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-[2.6rem]`}
            />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p className="first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-[var(--gold)]">
                As industries around the world shift toward sustainable, long-term growth, companies increasingly rely on
                overseas recruitment partners to secure skilled and dependable workers. This is where Falisha Manpower
                stands out as one of the most trusted recruitment agencies in Pakistan for hiring Pakistani manpower.
              </p>
              <p>
                Founded in 2011 and headquartered in Rawalpindi — with branches in Lahore, Karachi, Peshawar and Azad
                Jammu &amp; Kashmir — we are a Government of Pakistan–licensed Overseas Employment Promoter (OEP Licence
                No. 4035) and ISO 9001:2015 certified. We run a nationwide sourcing network that reaches skilled,
                semi-skilled and professional talent across the country.
              </p>
            </div>

            <Reveal className="mt-8 border-l-2 border-[var(--gold)] pl-5">
              <p className={`${display} text-2xl font-medium leading-snug text-foreground md:text-[1.75rem]`}>
                &ldquo;One accountable partner, from your first requirement to a worker on site.&rdquo;
              </p>
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Button asChild className="rounded-full px-6">
                  <Link href="/profile">Company profile &amp; brochure</Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="outline" className="rounded-full px-6">
                  <Link href="/our-team">Meet our team →</Link>
                </Button>
              </Magnetic>
            </div>
          </div>

          <Reveal delay={0.1}>
            <SpotlightCard className="p-6 lg:sticky lg:top-28">
              <h3 className="font-semibold">At a glance</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <Fact label="Licence" value="OEP No. 4035 · BEOE-registered" />
                <Fact label="Certification" value="ISO 9001:2015" />
                <Fact label="Established" value="2011 · 15+ years" />
                <Fact label="Head office" value="Rawalpindi, Pakistan" />
                <Fact label="Branches" value="Lahore, Karachi, Peshawar & AJK" />
                <Fact label="Reach" value="Gulf, Europe, Central Asia, Asia & Africa" />
              </dl>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      {/* ───────── Mission / Vision / Values ───────── */}
      <section className="border-y border-border bg-secondary/30 py-20 md:py-24">
        <div className="container">
          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal>
              <SpotlightCard className="h-full bg-background/70 p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Target className="h-6 w-6" />
                </span>
                <h3 className={`${display} mt-5 text-2xl font-semibold tracking-tight`}>Our mission</h3>
                <p className="mt-3 text-muted-foreground">
                  To connect Pakistan&rsquo;s skilled workforce with global opportunities — reliably, lawfully and
                  ethically — while giving employers a single, accountable partner for every overseas hire.
                </p>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={0.08}>
              <SpotlightCard className="h-full bg-background/70 p-8" spotlight="var(--primary)">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold)]/15 text-[var(--gold)]">
                  <Compass className="h-6 w-6" />
                </span>
                <h3 className={`${display} mt-5 text-2xl font-semibold tracking-tight`}>Our vision</h3>
                <p className="mt-3 text-muted-foreground">
                  To be the most trusted name in overseas recruitment from Pakistan — known for quality, compliance and
                  genuine care for the workers we place and the employers we serve.
                </p>
              </SpotlightCard>
            </Reveal>
          </div>

          <Reveal className="mt-12 max-w-2xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
              <Sparkles className="h-4 w-4" /> Our values
            </p>
            <h2 className={`${display} mt-2 text-2xl font-semibold tracking-tight md:text-3xl`}>What we stand for</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={(i % 5) * 0.05}>
                <SpotlightCard className="h-full bg-background/70 p-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <v.Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold">{v.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{v.d}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Why choose us ───────── */}
      <section className="py-20 md:py-24">
        <div className="container">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Why choose Falisha</p>
            <h2 className={`${display} mt-2 text-3xl font-semibold tracking-tight md:text-4xl`}>Why employers trust us for Pakistani manpower</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.t} delay={(i % 3) * 0.06}>
                <SpotlightCard className="h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <w.Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{w.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{w.d}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Process ───────── */}
      <section className="border-y border-border bg-secondary/30 py-20 md:py-24">
        <div className="container">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">How we work</p>
            <h2 className={`${display} mt-2 text-3xl font-semibold tracking-tight md:text-4xl`}>From your requirement to arrival on site</h2>
            <p className="mt-3 text-muted-foreground">One accountable, compliant process — handled in-house, end to end.</p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.07}>
                <SpotlightCard className="h-full bg-background/70 p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-primary-foreground">
                      <s.Icon className="h-5 w-5" />
                    </span>
                    <span className={`${display} text-2xl font-bold text-[var(--gold)]/50`}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-4 font-semibold">{s.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Global presence (SIGNATURE) ───────── */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-20 text-white md:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50" style={gridOverlay} />
        <div className="container relative">
          <Reveal>
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                <Globe2 className="h-4 w-4" /> Global presence
              </p>
              <h2 className={`${display} mt-3 text-3xl font-semibold tracking-tight md:text-5xl`}>Pakistan, to the world.</h2>
              <p className="mt-4 text-white/70">
                From our head office in Rawalpindi, we deploy Pakistani talent across 28 core markets in four regions —
                combining a worldwide employer network with on-the-ground sourcing at home. Scroll to trace the routes.
              </p>
            </div>
          </Reveal>
          <div className="mt-10">
            <WorldJourney className="w-full" />
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {REACH.map((c, i) => (
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
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/countries">View all destinations</Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white">
                  <Link href="/industries">Industries we serve →</Link>
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Credentials ───────── */}
      <section className="py-20 md:py-24">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Credentials</p>
              <h2 className={`${display} mt-3 text-3xl font-semibold tracking-tight md:text-4xl`}>Licensed. Certified. Trusted.</h2>
              <p className="mt-3 text-muted-foreground">
                Government-registered and quality-certified — the assurance overseas employers look for.
              </p>
            </div>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-3">
            {CREDENTIALS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <SpotlightCard className="flex h-full flex-col items-center p-7 text-center">
                  <div className="grid h-24 w-24 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.logo} alt={c.title} className="h-16 w-16 object-contain" width={64} height={64} />
                  </div>
                  <h3 className="mt-5 font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>

          {/* Nationwide footprint */}
          <Reveal className="mt-14">
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-secondary/30 px-6 py-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Nationwide footprint</p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-foreground">
                {OFFICES.map((o, i) => (
                  <span key={o} className="inline-flex items-center gap-2">
                    {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--gold)]" />}
                    {o}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── CTA finale ───────── */}
      <section className="container pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-12 text-background md:px-12 md:py-16">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--gold)]/15 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-[var(--primary)]/15 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                <Users className="h-4 w-4" /> The people behind Falisha
              </p>
              <h2 className={`${display} mt-3 text-2xl font-semibold tracking-tight md:text-4xl`}>Hiring from Pakistan, or looking to work abroad?</h2>
              <p className="mt-2 text-background/70">
                Our experienced team manages every placement personally — meet them, or tell us your requirement and
                we&rsquo;ll source, screen and mobilise the right people.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Magnetic>
                <Button asChild size="lg" className="rounded-full bg-[var(--gold)] px-6 text-[var(--navy)] hover:brightness-105">
                  <Link href="/fill-a-vacancy">Request workforce</Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild size="lg" variant="outline" className="rounded-full border-background/30 bg-transparent px-6 text-background hover:bg-background/10 hover:text-background">
                  <Link href="/our-team">Meet the team <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </SmoothScrollProvider>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-dashed border-border pb-3 last:border-0 last:pb-0">
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    alternates: { canonical: '/about' },
    title: 'About Us | Falisha Manpower — Overseas Recruitment Agency in Pakistan',
    description:
      'Falisha Manpower is one of the most trusted overseas recruitment agencies in Pakistan (BEOE OEP 4035, ISO 9001:2015) — 15+ years supplying skilled Pakistani manpower to the Gulf, Europe and Asia, end to end.',
  }
}
