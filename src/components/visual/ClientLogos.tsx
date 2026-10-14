'use client'

import React, { useState } from 'react'
import { ArrowRight, BadgeCheck } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { LogoWaterfall } from './LogoWaterfall'

const POINTS = [
  'Bulk, technical and executive placements',
  'Construction, energy, healthcare, logistics & more',
  'Compliant, end-to-end deployment',
]

// Split section: copy on the left, an auto-scrolling logo waterfall on the right,
// with a "view all" toggle that expands the full static grid.
export function ClientLogos({ logos, className }: { logos: string[]; className?: string }) {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className={cn('grid items-center gap-12 lg:grid-cols-[1fr_1.35fr]', className)}>
      {/* Left — copy */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Our clients</p>
        <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          Trusted by <span className="text-primary">leading employers</span> across the Gulf
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">
          From national champions to global contractors — organisations rely on Falisha Manpower to
          source, screen and mobilise the workforce behind their projects.
        </p>
        <ul className="mt-6 space-y-2.5 text-sm">
          {POINTS.map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-muted-foreground">
              <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
              {p}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
        >
          {showAll ? 'Show less' : `View all ${logos.length} clients`}
          <ArrowRight className={cn('h-4 w-4 transition-transform', showAll ? 'rotate-90' : 'group-hover:translate-x-1')} />
        </button>
      </div>

      {/* Right — moving waterfall, or full static grid when expanded */}
      {showAll ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {logos.map((src) => (
            <div key={src} className="grid h-24 place-items-center rounded-2xl bg-white px-3 shadow-sm ring-1 ring-black/5 sm:px-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" aria-hidden className="max-h-12 w-full max-w-[8rem] object-contain" loading="lazy" />
            </div>
          ))}
        </div>
      ) : (
        <LogoWaterfall logos={logos} columns={3} heightClass="h-[26rem] md:h-[30rem]" />
      )}
    </div>
  )
}
