'use client'

import React from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { cn } from '@/utilities/ui'

// Wraps children in a perspective container that tilts toward the cursor,
// giving photo cards a 3D feel. Children with `translateZ` transforms get
// real parallax depth (transform-style: preserve-3d is applied).
export function Tilt3D({
  children,
  className,
  max = 8,
  scale = 1.02,
}: {
  children: React.ReactNode
  className?: string
  max?: number
  scale?: number
}) {
  const reduce = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 160, damping: 18 })
  const sry = useSpring(ry, { stiffness: 160, damping: 18 })

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      className={cn(className)}
      style={{ perspective: 1100 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        ry.set(px * max * 2)
        rx.set(-py * max * 2)
      }}
      onMouseLeave={() => {
        rx.set(0)
        ry.set(0)
      }}
    >
      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        whileHover={{ scale }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
