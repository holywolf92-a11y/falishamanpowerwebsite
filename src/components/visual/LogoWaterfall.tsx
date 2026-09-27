'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/utilities/ui'

function Tile({ src }: { src: string }) {
  return (
    <div className="grid h-24 shrink-0 place-items-center rounded-2xl bg-white px-5 shadow-sm ring-1 ring-black/5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" aria-hidden className="max-h-12 max-w-[8rem] object-contain" loading="lazy" />
    </div>
  )
}

function Column({ logos, duration, reverse }: { logos: string[]; duration: number; reverse?: boolean }) {
  const doubled = [...logos, ...logos] // duplicated for a seamless vertical loop
  return (
    <motion.div
      className="flex flex-col gap-4"
      animate={{ y: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {doubled.map((src, i) => (
        <Tile key={i} src={src} />
      ))}
    </motion.div>
  )
}

// Vertical auto-scrolling logo waterfall (columns glide in alternating directions,
// soft fade top & bottom). Static grid fallback under reduced motion.
export function LogoWaterfall({
  logos,
  columns = 3,
  heightClass = 'h-[30rem]',
  className,
}: {
  logos: string[]
  columns?: number
  heightClass?: string
  className?: string
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div
        className={cn('grid gap-4', className)}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {logos.map((src) => (
          <Tile key={src} src={src} />
        ))}
      </div>
    )
  }

  const cols: string[][] = Array.from({ length: columns }, () => [])
  logos.forEach((l, i) => cols[i % columns].push(l))

  return (
    <div
      className={cn('grid gap-4 overflow-hidden', heightClass, className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        maskImage: 'linear-gradient(to bottom, transparent, black 9%, black 91%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 9%, black 91%, transparent)',
      }}
    >
      {cols.map((c, i) => (
        <Column key={i} logos={c} duration={44 + i * 12} reverse={i % 2 === 1} />
      ))}
    </div>
  )
}
