'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/ui'

export function CircleBadge({
  text = 'Falisha Manpower • Recruitment Agency • ',
  className,
}: {
  text?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const pathId = React.useId()

  return (
    <div className={cn('relative grid place-items-center', className)}>
      <motion.svg
        viewBox="0 0 200 200"
        className="h-full w-full text-primary"
        animate={reduce ? {} : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 24, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      >
        <defs>
          <path id={pathId} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" fill="none" />
        </defs>
        <text fontSize="12.5" fontWeight={600} letterSpacing="1.5" fill="currentColor">
          <textPath href={`#${pathId}`}>{text.repeat(2)}</textPath>
        </text>
      </motion.svg>
      <span className="absolute grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
        <ArrowUpRight className="h-6 w-6" />
      </span>
    </div>
  )
}
