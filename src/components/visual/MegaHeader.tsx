'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/ui'
import { useTheme } from '@/providers/Theme'
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Search,
  ShieldCheck,
  Sun,
  Upload,
  Users,
  X,
} from 'lucide-react'

export type MenuLink = { label: string; href: string; desc?: string }

export type MegaHeaderProps = {
  presence: MenuLink[]
  expertise: MenuLink[]
  recruitment: MenuLink[]
  advisory: MenuLink[]
}

const PHONE_DISPLAY = '+92 330 3333335'
const PHONE_HREF = 'tel:+923303333335'
const WHATSAPP_HREF = 'https://wa.me/923303333335'

type Group = { heading?: string; links: MenuLink[]; viewAll?: MenuLink }
type Mega = {
  key: string
  label: string
  featured?: { icon: React.ReactNode; title: string; desc: string; cta: MenuLink }
  groups: Group[]
  /** render a single group's links as a wide multi-column grid (used for data-driven menus) */
  wide?: boolean
}

export function MegaHeader({ presence, expertise, recruitment, advisory }: MegaHeaderProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false) // mobile drawer
  const [openMenu, setOpenMenu] = useState<string | null>(null) // desktop mega
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Build the menu model from live Payload data.
  const menus: Mega[] = [
    {
      key: 'employers',
      label: 'For Employers',
      featured: {
        icon: <Building2 className="h-5 w-5" />,
        title: 'Hire from Pakistan',
        desc: 'Source, screen and mobilise skilled manpower with a BEOE-licensed OEP (No. 4035).',
        cta: { label: 'Request workforce', href: '/fill-a-vacancy' },
      },
      groups: [
        {
          heading: 'Get started',
          links: [
            { label: 'Fill a Vacancy', href: '/fill-a-vacancy', desc: 'Share your requirement' },
            { label: 'Hire from Pakistan', href: '/hire-from-pakistan', desc: 'How our process works' },
            { label: 'Partner With Us', href: '/partner-with-us', desc: 'For agents & recruiters' },
          ],
        },
        {
          heading: 'Recruitment Services',
          links: recruitment.slice(0, 6),
          viewAll: recruitment.length ? { label: 'All services', href: '/services' } : undefined,
        },
        ...(advisory.length
          ? [{ heading: 'Advisory Services', links: advisory.slice(0, 6) } as Group]
          : []),
      ],
    },
    {
      key: 'candidates',
      label: 'For Candidates',
      featured: {
        icon: <Users className="h-5 w-5" />,
        title: 'Find your overseas job',
        desc: 'Browse verified vacancies and get deployed through a licensed Overseas Employment Promoter.',
        cta: { label: 'Browse jobs', href: '/jobs' },
      },
      groups: [
        {
          heading: 'Your next step',
          links: [
            { label: 'Browse Jobs', href: '/jobs', desc: 'Current openings' },
            { label: 'Upload Your CV', href: '/upload-cv', desc: 'Join our talent pool' },
            { label: 'Contact Us', href: '/contact', desc: 'Talk to our team' },
          ],
        },
        {
          heading: 'Where you can work',
          links: presence.slice(0, 8),
          viewAll: presence.length ? { label: 'All destinations', href: '/countries' } : undefined,
        },
        {
          heading: 'By industry',
          links: expertise.slice(0, 6),
          viewAll: expertise.length ? { label: 'All industries', href: '/industries' } : undefined,
        },
      ],
    },
    {
      key: 'industries',
      label: 'Industries',
      wide: true,
      groups: [
        {
          links: expertise.slice(0, 12),
          viewAll: { label: 'All industries & professions', href: '/industries' },
        },
      ],
    },
    {
      key: 'destinations',
      label: 'Destinations',
      wide: true,
      groups: [
        {
          links: presence.slice(0, 12),
          viewAll: { label: 'All destination countries', href: '/countries' },
        },
      ],
    },
    {
      key: 'about',
      label: 'About',
      groups: [
        {
          links: [
            { label: 'Our Team', href: '/our-team', desc: 'The people behind Falisha' },
            { label: 'Our Services', href: '/services', desc: 'Recruitment & advisory' },
            { label: 'Insights', href: '/posts', desc: 'News & articles' },
            { label: 'FAQ', href: '/faq', desc: 'Common questions' },
            { label: 'Contact', href: '/contact', desc: 'Get in touch' },
          ],
        },
      ],
    },
  ]

  const active = menus.find((m) => m.key === openMenu) || null

  // Close menus on navigation.
  useEffect(() => {
    setOpen(false)
    setOpenMenu(null)
  }, [pathname])

  // Condense-on-scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Escape closes the desktop mega-menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }
  const openNow = (key: string) => {
    cancelClose()
    setOpenMenu(key)
  }
  const closeSoon = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120)
  }

  return (
    <>
    <header
      className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
      onMouseLeave={closeSoon}
    >
      {/* Utility strip */}
      <div
        className={cn(
          'hidden overflow-hidden border-b border-border/60 bg-secondary/50 transition-all duration-300 lg:block',
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100',
        )}
      >
        <div className="container flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-2.5 py-1 font-semibold text-foreground/80 ring-1 ring-border">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              BEOE Licensed · OEP No. 4035
            </span>
            <a href={PHONE_HREF} className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Phone className="h-3.5 w-3.5" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Link href="/posts" className="transition-colors hover:text-foreground">Insights</Link>
            <Link href="/our-team" className="transition-colors hover:text-foreground">Our Team</Link>
            <span className="h-4 w-px bg-border" />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className={cn('container flex items-center justify-between gap-4 transition-all duration-300', scrolled ? 'py-2.5' : 'py-3.5')}>
        <Link href="/" className="shrink-0 text-foreground" aria-label="Falisha Manpower — home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {menus.map((m) => {
            const isOpen = openMenu === m.key
            return (
              <div key={m.key} onMouseEnter={() => openNow(m.key)} onMouseLeave={closeSoon}>
                <button
                  type="button"
                  onClick={() => setOpenMenu(isOpen ? null : m.key)}
                  aria-expanded={isOpen}
                  className={cn(
                    'flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                    isOpen ? 'bg-accent text-accent-foreground' : 'text-foreground/80 hover:bg-accent/60 hover:text-foreground',
                  )}
                >
                  {m.label}
                  <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')} />
                </button>
              </div>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden rounded-full p-2 text-foreground/70 transition-colors hover:bg-accent hover:text-foreground lg:inline-flex"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/upload-cv"
            className="hidden items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent sm:inline-flex"
          >
            <Upload className="h-4 w-4" />
            Upload CV
          </Link>
          <Link
            href="/fill-a-vacancy"
            className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/25 transition hover:brightness-110 md:inline-flex"
          >
            Request workforce
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 text-foreground transition-colors hover:bg-accent lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Desktop mega panel (shared, full-width) */}
      {active && (
        <div
          className="absolute inset-x-0 top-full hidden lg:block"
          onMouseEnter={cancelClose}
          onMouseLeave={closeSoon}
        >
          <div className="container">
            <div className="overflow-hidden rounded-b-2xl border-x border-b border-border bg-popover text-popover-foreground shadow-2xl shadow-black/10">
              <div className="flex gap-8 p-6">
                {active.featured && (
                  <div className="flex w-64 shrink-0 flex-col justify-between rounded-xl bg-accent p-5">
                    <div>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        {active.featured.icon}
                      </span>
                      <p className="mt-3 text-base font-bold text-accent-foreground">{active.featured.title}</p>
                      <p className="mt-1 text-sm text-accent-foreground/80">{active.featured.desc}</p>
                    </div>
                    <Link
                      href={active.featured.cta.href}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                    >
                      {active.featured.cta.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}

                {active.wide ? (
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 sm:grid-cols-3 xl:grid-cols-4">
                      {active.groups[0].links.map((l) => (
                        <PanelLink key={l.href + l.label} link={l} />
                      ))}
                    </div>
                    {active.groups[0].viewAll && <ViewAll link={active.groups[0].viewAll} />}
                  </div>
                ) : (
                  <div
                    className={cn(
                      'grid flex-1 gap-6',
                      active.groups.length >= 3 ? 'grid-cols-3' : active.groups.length === 2 ? 'grid-cols-2' : 'grid-cols-1',
                    )}
                  >
                    {active.groups.map((g, i) => (
                      <div key={g.heading ?? i}>
                        {g.heading && (
                          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            {g.heading}
                          </p>
                        )}
                        <div className="flex flex-col">
                          {g.links.map((l) => (
                            <PanelLink key={l.href + l.label} link={l} />
                          ))}
                        </div>
                        {g.viewAll && <ViewAll link={g.viewAll} />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </header>

      {/* Mobile drawer (sibling of <header> so the header's backdrop-filter doesn't trap this fixed overlay) */}
      {open && (
        <div className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-background px-5 pb-24 pt-20 lg:hidden">
          <div className="flex flex-col gap-2.5">
            <Link href="/fill-a-vacancy" className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-3 text-center font-semibold text-primary-foreground">
              Request workforce <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/upload-cv" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-4 py-3 text-center font-semibold text-foreground">
              <Upload className="h-4 w-4" /> Upload CV
            </Link>
          </div>

          <div className="mt-5 border-t border-border">
            {menus.map((m) => (
              <details key={m.key} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 font-semibold text-foreground">
                  {m.label}
                  <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="pb-3">
                  {m.featured && (
                    <Link
                      href={m.featured.cta.href}
                      className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground"
                    >
                      {m.featured.cta.label} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                  {m.groups.map((g, i) => (
                    <div key={g.heading ?? i} className="mb-1">
                      {g.heading && (
                        <p className="mb-1 mt-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                          {g.heading}
                        </p>
                      )}
                      {g.links.map((l) => (
                        <Link key={l.href + l.label} href={l.href} className="block py-2 text-sm text-foreground/80">
                          {l.label}
                        </Link>
                      ))}
                      {g.viewAll && (
                        <Link href={g.viewAll.href} className="block py-2 text-sm font-semibold text-primary">
                          {g.viewAll.label} →
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 font-semibold text-foreground/80 ring-1 ring-border">
              <ShieldCheck className="h-4 w-4 text-gold" /> BEOE Licensed · OEP No. 4035
            </span>
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 text-foreground">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-foreground">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <div className="flex items-center gap-2 pt-1">
              <span>Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function PanelLink({ link }: { link: MenuLink }) {
  return (
    <Link
      href={link.href}
      className="rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <span className="block text-sm font-medium">{link.label}</span>
      {link.desc && <span className="block text-xs text-muted-foreground">{link.desc}</span>}
    </Link>
  )
}

function ViewAll({ link }: { link: MenuLink }) {
  return (
    <Link
      href={link.href}
      className="mt-2 inline-flex items-center gap-1 px-3 text-sm font-semibold text-primary hover:underline"
    >
      {link.label} <ArrowRight className="h-4 w-4" />
    </Link>
  )
}

function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={mounted ? (isDark ? 'Switch to light theme' : 'Switch to dark theme') : 'Toggle theme'}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-full text-foreground/70 ring-1 ring-border transition-colors hover:bg-accent hover:text-foreground',
        className,
      )}
    >
      {mounted ? (
        isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  )
}
