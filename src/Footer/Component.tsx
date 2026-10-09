import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import React from 'react'
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone } from 'lucide-react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Logo } from '@/components/Logo/Logo'
import { Flag } from '@/components/visual/Flag'

const CANDIDATE_LINKS = [
  { label: 'Latest job openings', href: '/jobs' },
  { label: 'Submit your CV', href: '/upload-cv' },
  { label: 'Our team', href: '/our-team' },
  { label: 'Blog & insights', href: '/blog' },
  { label: 'Contact us', href: '/contact' },
]

const SOCIALS = [
  { label: 'Facebook', href: 'https://facebook.com/falishamanpower', Icon: Facebook },
  { label: 'Instagram', href: 'https://instagram.com/falishamanpower', Icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/111465919/', Icon: Linkedin },
  { label: 'WhatsApp', href: 'https://wa.me/923303333335', Icon: MessageCircle },
]

const EMPTY: { docs: Record<string, any>[] } = { docs: [] }

export async function Footer() {
  let services: { docs: Record<string, any>[] } = EMPTY
  let countries: { docs: Record<string, any>[] } = EMPTY
  try {
    const payload = await getPayload({ config: configPromise })
    const [s, c] = (await Promise.all([
      payload.find({ collection: 'services', overrideAccess: false, limit: 6, depth: 0, sort: 'title', select: { title: true, slug: true } as never }),
      payload.find({ collection: 'countries', overrideAccess: false, limit: 6, depth: 0, sort: 'name', select: { name: true, slug: true } as never }),
    ])) as any[]
    services = s
    countries = c
  } catch {
    // DB unavailable (e.g. during build) — render the footer without dynamic columns.
  }

  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-[var(--navy)] text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-block text-white">
            <Logo />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Overseas recruitment agency connecting skilled Pakistani professionals with employers
            across the Gulf and beyond — sourcing, visas, attestation and mobilisation, end to end.
          </p>
          <div className="mt-5 flex flex-col gap-2 text-sm">
            <a href="mailto:support@falishajobs.com" className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white">
              <Mail className="h-4 w-4 text-primary" /> support@falishajobs.com
            </a>
            <a href="tel:+923303333335" className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white">
              <Phone className="h-4 w-4 text-primary" /> +92 330 3333335
            </a>
            <a href="https://wa.me/923303333335" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white">
              <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp us
            </a>
          </div>
          <div className="mt-5 flex gap-2.5">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-primary hover:text-primary"
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
                <Link href={`/services/${s.slug}`} className="text-white/70 transition-colors hover:text-white">
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
            {(countries.docs as Record<string, any>[]).map((c) => (
              <li key={c.id}>
                <Link
                  href={`/countries/${c.slug}`}
                  className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
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
                <Link href={l.href} className="text-white/70 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-start justify-between gap-4 py-5 text-sm text-white/55 md:flex-row md:items-center">
          <p>© {year} Falisha Manpower. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-white/60 transition-colors hover:text-white">
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
