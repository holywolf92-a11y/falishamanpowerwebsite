'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="sticky top-0 z-50 pt-3 md:pt-4" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="container">
        <div
          className="flex items-center justify-between gap-4 rounded-full border border-white/10 px-4 py-2.5 text-white shadow-lg shadow-black/10 backdrop-blur md:px-6 md:py-3"
          style={{ backgroundColor: 'color-mix(in oklch, var(--navy) 88%, transparent)' }}
        >
          <Link href="/" className="shrink-0 text-white">
            <Logo loading="eager" priority="high" />
          </Link>
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}
