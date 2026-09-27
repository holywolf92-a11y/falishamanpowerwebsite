'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/utilities/ui'
import { Flag } from './Flag'

export type CountryMarqueeItem = {
  name: string
  code?: string
  href?: string
}

export type CountryMarqueeProps = {
  items: CountryMarqueeItem[]
  label?: string
  className?: string
}

// Tile matches the client-logo cards (h-24, white, rounded-2xl) for a uniform rhythm.
function CountryTile({ item }: { item: CountryMarqueeItem }) {
  const inner = (
    <div className="flex h-24 w-52 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/40">
      <Flag name={item.name} code={item.code} className="h-7 w-11 rounded-[3px] shadow-sm" />
      <span className="max-w-[11rem] truncate text-sm font-semibold text-slate-800">{item.name}</span>
    </div>
  )
  return item.href ? <Link href={item.href}>{inner}</Link> : inner
}

export function CountryMarquee({ items, label, className }: CountryMarqueeProps) {
  const reduce = useReducedMotion()
  const row = [...items, ...items]

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
          {label}
        </p>
      )}
      {reduce ? (
        <div className="flex flex-wrap gap-4">
          {items.map((item) => (
            <CountryTile key={item.name} item={item} />
          ))}
        </div>
      ) : (
        <div
          className="overflow-hidden py-2"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 7%, black 93%, transparent)' }}
        >
          <motion.div
            className="flex w-max gap-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
          >
            {row.map((item, i) => (
              <CountryTile key={`${item.name}-${i}`} item={item} />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  )
}
