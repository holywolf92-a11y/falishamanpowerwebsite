'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/utilities/ui'

function Tile({ src }: { src: string }) {
  return (
    <div className="grid h-20 w-40 shrink-0 place-items-center rounded-2xl bg-white px-5 shadow-sm ring-1 ring-black/5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="max-h-10 max-w-[7rem] object-contain"
        loading="lazy"
      />
    </div>
  )
}

// Horizontal auto-scrolling logo strip (seamless loop via a duplicated track, soft
// fade at both edges). Falls back to a static grid under reduced-motion.
export function LogoMarquee({
  logos,
  className,
  speed = 34,
}: {
  logos: string[]
  className?: string
  speed?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div className={cn('grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8', className)}>
        {logos.map((src) => (
          <Tile key={src} src={src} />
        ))}
      </div>
    )
  }

  const doubled = [...logos, ...logos] // duplicated for a seamless horizontal loop
  return (
    <div
      className={cn('overflow-hidden', className)}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
      }}
    >
      <motion.div
        className="flex w-max gap-3"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((src, i) => (
          <Tile key={i} src={src} />
        ))}
      </motion.div>
    </div>
  )
}
