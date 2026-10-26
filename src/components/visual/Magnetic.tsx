'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import React from 'react'
import { cn } from '@/utilities/ui'

/**
 * Magnetic wrapper for CTAs/links: the content eases toward the cursor while
 * hovering and springs back on leave. Disabled under prefers-reduced-motion
 * (renders a plain inline wrapper).
 */
export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 20, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 220, damping: 20, mass: 0.5 })

  if (reduce) return <span className={cn('inline-block', className)}>{children}</span>

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.span>
  )
}

export default Magnetic
