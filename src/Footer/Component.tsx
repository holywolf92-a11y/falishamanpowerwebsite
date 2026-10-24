import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import React from 'react'
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Logo } from '@/components/Logo/Logo'
import { Flag } from '@/components/visual/Flag'
import { COUNTRY_CONTENT } from '@/data/countryContent'

const CANDIDATE_LINKS = [
  { label: 'Latest job openings', href: '/jobs' },
  { label: 'Submit your CV', href: '/upload-cv' },
  { label: 'Company profile', href: '/profile' },
  { label: 'Our team', href: '/our-team' },
  { label: 'Blog & insights', href: '/posts' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Contact us', href: '/contact' },
]

const SOCIALS = [
  { label: 'Facebook', href: 'https://facebook.com/falishamanpower', Icon: Facebook },
  { label: 'Instagram', href: 'https://instagram.com/falishamanpower', Icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/111465919/', Icon: Linkedin },
  { label: 'WhatsApp', href: 'https://wa.me/923005547806', Icon: MessageCircle },
]

const EMPTY: { docs: Record<string, any>[] } = { docs: [] }

// Footer destinations — the markets we're known for (Türkiye + the Gulf).
const FOOTER_DESTINATIONS = ['turkey', 'saudi-arabia', 'united-arab-emirates', 'qatar', 'kuwait', 'oman']
  .filter((slug) => COUNTRY_CONTENT[slug]?.name)
  .map((slug) => ({ slug, name: COUNTRY_CONTENT[slug]!.name as string }))

export async function Footer() {
  let services: { docs: Record<string, any>[] } = EMPTY
  try {
    const payload = await getPayload({ config: configPromise })
    services = (await payload.find({
      collection: 'services',
      overrideAccess: false,
      limit: 6,
      depth: 0,
      sort: 'title',
      select: { title: true, slug: true } as never,
    })) as any
  } catch {
    // DB unavailable (e.g. during build) — render the footer without the services column.
  }

  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border bg-secondary/40 text-foreground">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-block text-foreground">
            <Logo />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Overseas recruitment agency connecting skilled Pakistani professionals with employers
            across the Gulf and beyond — sourcing, visas, attestation and mobilisation, end to end.
          </p>
          <div className="mt-5 flex flex-col gap-2 text-sm">
            <a href="mailto:info@falishamanpower.com" className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
              <Mail className="h-4 w-4 text-primary" /> info@falishamanpower.com
            </a>
            <a href="tel:+923303333335" className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
              <Phone className="h-4 w-4 text-primary" /> +92 330 3333335
            </a>
            <a href="tel:+92514927145" className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
              <Phone className="h-4 w-4 text-primary" /> +92 51 4927145-6
            </a>
            <a href="https://wa.me/923005547806" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
              <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp us
            </a>
            <p className="mt-1 flex items-start gap-2 text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Umer Farooq Plaza, Murree Road, Chandni Chowk, Rawalpindi · Branches: Lahore, Karachi, Peshawar, AJK
            </p>
          </div>
          <div className="mt-5 flex gap-2.5">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <nav aria-label="Services">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Services</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {(services.docs as Record<string, any>[]).map((s) => (
              <li key={s.id}>
                <Link href={`/services/${s.slug}`} className="text-muted-foreground transition-colors hover:text-foreground">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="font-medium text-primary hover:underline">
                All services →
              </Link>
            </li>
          </ul>
        </nav>

        {/* Destinations */}
        <nav aria-label="Destinations">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Destinations</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FOOTER_DESTINATIONS.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/countries/${c.slug}`}
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Flag name={c.name} className="h-3.5 w-5 rounded-[2px]" />
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/countries" className="font-medium text-primary hover:underline">
                All countries →
              </Link>
            </li>
          </ul>
        </nav>

        {/* Candidates & company */}
        <nav aria-label="Company">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Quick links</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {CANDIDATE_LINKS.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container flex flex-col items-start justify-between gap-4 py-5 text-sm text-muted-foreground md:flex-row md:items-center">
          <div className="space-y-1">
            <p>© {year} Falisha Manpower. All rights reserved.</p>
            <p className="text-xs text-muted-foreground/80">
              Powered by{' '}
              <a
                href="https://summitautomates.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Summit Systems Pvt Ltd
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
              Privacy &amp; Cookies
            </Link>
            <span className="hidden font-medium text-gold sm:inline">OEP Licence No. 4035</span>
            <ThemeSelector />
          </div>
        </div>
      </div>
    </footer>
  )
}
