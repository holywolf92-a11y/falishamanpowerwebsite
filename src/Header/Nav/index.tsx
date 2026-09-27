'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-5 text-sm font-medium text-white/85">
      <div className="hidden items-center gap-5 md:flex">
        {navItems.map(({ link }, i) => {
          return (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className="text-white/85 transition-colors hover:text-white"
            />
          )
        })}
      </div>
      {/* mobile quick link */}
      <Link href="/jobs" className="text-white/85 transition-colors hover:text-white md:hidden">
        Jobs
      </Link>
      <Link href="/search" aria-label="Search" className="text-white/85 transition-colors hover:text-white">
        <span className="sr-only">Search</span>
        <SearchIcon className="h-5 w-5" />
      </Link>
    </nav>
  )
}
