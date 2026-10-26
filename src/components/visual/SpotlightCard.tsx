'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import React from 'react'
import { cn } from '@/utilities/ui'

/**
 * Premium card surface with a cursor-tracked radial spotlight that fades in on
 * hover, a soft lift, and a backdrop blur. Token-driven, so it flips light/dark.
 * No motion is required for it to look correct (the spotlight is a hover nicety).
 */
export function SpotlightCard({
  children,
  className,
  spotlight = 'var(--gold)',
}: {
  children: React.ReactNode
  className?: string
  spotlight?: string
}) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const bg = useMotionTemplate`radial-gradient(240px circle at ${mx}px ${my}px, color-mix(in oklch, ${spotlight} 16%, transparent), transparent 68%)`

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <div
      onMouseMove={onMove}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border bg-card/70 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:shadow-xl',
        className,
      )}
    >
      <motion.span
        aria-hidden
        style={{ background: bg }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  )
}

export default SpotlightCard
