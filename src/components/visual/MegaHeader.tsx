'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/ui'
import { ArrowRight, ChevronDown, Menu, Search, Upload, X } from 'lucide-react'

export type MenuLink = { label: string; href: string; desc?: string }

export type MegaHeaderProps = {
  presence: MenuLink[]
  expertise: MenuLink[]
  recruitment: MenuLink[]
  advisory: MenuLink[]
}

function Dropdown({
  label,
  links,
  width = 'w-[36rem]',
  cols = 'grid-cols-2',
  viewAll,
}: {
  label: string
  links: MenuLink[]
  width?: string
  cols?: string
  viewAll?: MenuLink
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 whitespace-nowrap font-medium text-white/85 transition-colors hover:text-white"
      >
        {label}
        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-1 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className={cn('rounded-2xl border border-border bg-popover p-3 text-popover-foreground shadow-2xl', width)}>
          <div className={cn('grid gap-1', cols)}>
            {links.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <span className="font-medium">{l.label}</span>
                {l.desc && <span className="block text-xs text-muted-foreground">{l.desc}</span>}
              </Link>
            ))}
          </div>
          {viewAll && (
            <Link
              href={viewAll.href}
              className="mt-2 flex items-center gap-1 border-t border-border px-3 pt-3 text-sm font-semibold text-primary hover:underline"
            >
              {viewAll.label} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export function MegaHeader({ presence, expertise, recruitment, advisory }: MegaHeaderProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-[var(--navy)] text-white shadow-lg shadow-black/20">
      {/* Top utility bar */}
      <div className="hidden border-b border-white/10 lg:block">
        <div className="container flex items-center justify-between py-2.5 text-sm">
          <nav className="flex items-center gap-6 text-white/80">
            <Link href="/blog" className="transition-colors hover:text-white">Market Insights</Link>
            <Link href="/upload-cv" className="flex items-center gap-1.5 transition-colors hover:text-white">
              Upload CV <Upload className="h-3.5 w-3.5" />
            </Link>
            <Link href="/our-team" className="transition-colors hover:text-white">Our Team</Link>
            <Link href="/blog" className="transition-colors hover:text-white">Blog</Link>
            <Dropdown label="Presence" links={presence} width="w-[34rem]" cols="grid-cols-3" viewAll={{ label: 'All countries', href: '/countries' }} />
          </nav>
          <div className="flex items-center gap-2.5">
            <Link
              href="/jobs"
              className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--navy)] transition hover:bg-white/90"
            >
              Latest Openings
            </Link>
            <Link
              href="/hire-from-pakistan"
              className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              For Organizations
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container flex items-center justify-between gap-4 py-3.5">
        <Link href="/" className="shrink-0 text-white">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-5 text-sm lg:flex xl:gap-6">
          <Link href="/partner-with-us" className="whitespace-nowrap font-medium text-white/85 transition-colors hover:text-white">Partner With Us</Link>
          <Link href="/fill-a-vacancy" className="whitespace-nowrap font-medium text-white/85 transition-colors hover:text-white">Fill a Vacancy</Link>
          <Dropdown
            label="About Us"
            width="w-64"
            cols="grid-cols-1"
            links={[
              { label: 'Our Team', href: '/our-team', desc: 'The people behind Falisha' },
              { label: 'Our Services', href: '/services', desc: 'What we do' },
              { label: 'Contact', href: '/contact', desc: 'Get in touch' },
            ]}
          />
          <Dropdown label="Our Expertise" links={expertise} cols="grid-cols-3" viewAll={{ label: 'All industries & professions', href: '/industries' }} />
          <Dropdown label="Recruitment Services" links={recruitment} width="w-80" cols="grid-cols-1" viewAll={{ label: 'All services', href: '/services' }} />
          <Dropdown label="Advisory Services" links={advisory} width="w-80" cols="grid-cols-1" viewAll={{ label: 'All services', href: '/services' }} />
          <Link href="/search" aria-label="Search" className="text-white/85 transition-colors hover:text-white">
            <Search className="h-5 w-5" />
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 top-[60px] z-40 overflow-y-auto bg-[var(--navy)] px-5 pb-16 pt-4 text-white lg:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/jobs" className="rounded-full bg-white px-4 py-2.5 text-center font-semibold text-[var(--navy)]">Latest Openings</Link>
            <Link href="/hire-from-pakistan" className="rounded-full bg-primary px-4 py-2.5 text-center font-semibold text-primary-foreground">For Organizations</Link>
          </div>
          <MobileGroup title="Company" links={[
            { label: 'Partner With Us', href: '/partner-with-us' },
            { label: 'Fill a Vacancy', href: '/fill-a-vacancy' },
            { label: 'Our Team', href: '/our-team' },
            { label: 'Blog', href: '/blog' },
            { label: 'Upload CV', href: '/upload-cv' },
            { label: 'Contact', href: '/contact' },
          ]} />
          <MobileGroup title="Presence" links={[...presence, { label: 'All countries', href: '/countries' }]} />
          <MobileGroup title="Expertise" links={[...expertise, { label: 'All industries', href: '/industries' }]} />
          <MobileGroup title="Recruitment Services" links={recruitment} />
          <MobileGroup title="Advisory Services" links={advisory} />
        </div>
      )}
    </header>
  )
}

function MobileGroup({ title, links }: { title: string; links: MenuLink[] }) {
  return (
    <div className="mt-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">{title}</p>
      <div className="flex flex-col">
        {links.map((l) => (
          <Link key={l.href + l.label} href={l.href} className="border-b border-white/10 py-2.5 text-white/85">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
