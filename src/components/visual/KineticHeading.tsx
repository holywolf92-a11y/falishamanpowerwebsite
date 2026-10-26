'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import React from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

const container: Variants = {
  hidden: {},
  show: (delay: number = 0) => ({
    transition: { staggerChildren: 0.09, delayChildren: delay },
  }),
}
const lineVariant: Variants = {
  hidden: { y: '115%' },
  show: { y: 0, transition: { duration: 0.85, ease: EASE } },
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

type Props = {
  lines: string[]
  igniteWord?: string
  igniteClassName?: string
  className?: string
  lineClassName?: string
  as?: 'h1' | 'h2' | 'p'
  delay?: number
}

/**
 * Masked line-reveal heading: each line sits in an overflow-hidden wrapper and
 * slides up from below under a staggered parent. An optional `igniteWord` renders
 * in gold. Falls back to plain text under prefers-reduced-motion (all copy stays
 * in the DOM for SEO either way).
 */
export function KineticHeading({
  lines,
  igniteWord,
  igniteClassName = 'text-[var(--gold)]',
  className,
  lineClassName,
  as = 'h2',
  delay = 0,
}: Props) {
  const reduce = useReducedMotion()

  const renderText = (line: string, key: number) => {
    if (!igniteWord) return line
    const parts = line.split(new RegExp(`(${escapeRe(igniteWord)})`, 'g'))
    return parts.map((p, j) =>
      p === igniteWord ? (
        <span key={`${key}-${j}`} className={igniteClassName}>
          {p}
        </span>
      ) : (
        <React.Fragment key={`${key}-${j}`}>{p}</React.Fragment>
      ),
    )
  }

  if (reduce) {
    const Tag = as
    return (
      <Tag className={className}>
        {lines.map((l, i) => (
          <span key={i} className={'block ' + (lineClassName ?? '')}>
            {renderText(l, i)}
          </span>
        ))}
      </Tag>
    )
  }

  const MotionTag = motion[as] as typeof motion.h2
  return (
    <MotionTag
      className={className}
      variants={container}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {lines.map((l, i) => (
        <span key={i} className={'block overflow-hidden ' + (lineClassName ?? '')}>
          <motion.span className="block" variants={lineVariant}>
            {renderText(l, i)}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}

export default KineticHeading
