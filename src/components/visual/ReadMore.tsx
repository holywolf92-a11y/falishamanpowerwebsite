'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * SEO-safe "Read more / Read less" expander. All content stays in the DOM
 * (crawlers and no-JS clients see everything) — it is only visually clamped to
 * `collapsedHeight` with a fade until expanded.
 */
export function ReadMore({
  children,
  collapsedHeight = 210,
  className,
}: {
  children: React.ReactNode
  collapsedHeight?: number
  className?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className={className}>
      <div
        className="relative overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight: open ? 2400 : collapsedHeight }}
      >
        {children}
        {!open && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent"
          />
        )}
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
      >
        {open ? 'Read less' : 'Read more'}
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}

export default ReadMore
