import type { Metadata } from 'next/types'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Download, Mail, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

// The 24 company-profile brochure pages (migrated from profile.falishamanpower.com,
// optimised to WebP in /public/profile). Heights vary, so they are stored per page to
// reserve layout space and avoid content shift as they lazy-load.
const PAGES: { w: number; h: number }[] = [
  { w: 1076, h: 1524 },
  { w: 1076, h: 1600 },
  { w: 1076, h: 1788 },
  { w: 1076, h: 1856 },
  { w: 1076, h: 1600 },
  { w: 1076, h: 1868 },
  { w: 1076, h: 1600 },
  { w: 1076, h: 1600 },
  { w: 1076, h: 1856 },
  { w: 1076, h: 1600 },
  { w: 1076, h: 1600 },
  { w: 1076, h: 1600 },
  { w: 1076, h: 1600 },
  { w: 1076, h: 1704 },
  { w: 1076, h: 1704 },
  { w: 1076, h: 1704 },
  { w: 1076, h: 1704 },
  { w: 1076, h: 1704 },
  { w: 1076, h: 1704 },
  { w: 1076, h: 1856 },
  { w: 807, h: 1392 },
  { w: 1076, h: 1856 },
  { w: 1076, h: 1856 },
  { w: 1076, h: 1704 },
]

const PDF_HREF = '/profile/falisha-company-profile.pdf'

export default function ProfilePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-16 text-white md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(120% 90% at 15% 0%, black, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(120% 90% at 15% 0%, black, transparent 72%)',
          }}
        />
        <div className="container relative max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
            Company Profile
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Falisha Manpower — Company Profile
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            An introduction to Falisha Manpower Recruitment Group — who we are, our values and
            purpose, the sectors we serve, our consultants and our end-to-end recruitment process.
            A BEOE-licensed Overseas Employment Promoter (OEP 4035), ISO 9001:2015 certified.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-semibold text-white/80 ring-1 ring-white/15">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--gold)]" /> BEOE Licensed · OEP 4035
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-semibold text-white/80 ring-1 ring-white/15">
              <BadgeCheck className="h-3.5 w-3.5 text-[var(--gold)]" /> ISO 9001:2015 Certified
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-6">
              <a href={PDF_HREF} download>
                <Download className="mr-1.5 h-4 w-4" /> Download PDF
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">
                <Mail className="mr-1.5 h-4 w-4" /> Contact us
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/fill-a-vacancy">
                Request workforce <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brochure pages */}
      <section className="bg-secondary/30 py-10 md:py-14">
        <div className="mx-auto flex max-w-[840px] flex-col gap-5 px-4 sm:gap-6">
          {PAGES.map((p, i) => {
            const n = String(i + 1).padStart(2, '0')
            return (
              <figure
                key={n}
                className="overflow-hidden rounded-xl border border-border bg-white shadow-xl shadow-black/5 ring-1 ring-black/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/profile/p${n}.webp`}
                  alt={`Falisha Manpower company profile — page ${i + 1} of ${PAGES.length}`}
                  width={p.w}
                  height={p.h}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  className="block h-auto w-full"
                />
              </figure>
            )
          })}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-border bg-background py-14">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Let’s build your workforce
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Whether you’re an employer hiring skilled manpower from Pakistan or a candidate seeking
            an overseas role, our team is ready to help.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-full px-6">
              <Link href="/fill-a-vacancy">Request workforce</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
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
      'The Falisha Manpower company profile — who we are, our values, purpose, clients, consultants and the full recruitment process. A BEOE-licensed (OEP 4035), ISO 9001:2015 certified overseas recruitment group in Pakistan.',
  }
}
