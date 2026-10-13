'use client'

import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@/utilities/ui'

export type RevealProps = {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}

export default function Reveal({ children, delay = 0, y = 16, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export type CountUpProps = {
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function CountUp({ to, duration = 2, suffix = '', prefix = '', className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()
  // Start at the final value so the server-rendered HTML (and no-JS clients /
  // crawlers) show the real number, never "0". The count-up resets to 0 on mount
  // (the stats sit below the fold) and animates when scrolled into view.
  const [value, setValue] = useState(to)

  useEffect(() => {
    if (prefersReducedMotion) {
      setValue(to)
      return
    }

    setValue(0)
    if (!inView) return

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    })

    return () => controls.stop()
  }, [inView, to, duration, prefersReducedMotion])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}
