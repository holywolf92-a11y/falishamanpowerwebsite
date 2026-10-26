'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Slim gold reading-progress bar pinned under the header. A quiet, premium
 * polish cue that tracks how far through the page you are.
 */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={
        'fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-[var(--primary)] ' +
        (className ?? '')
      }
    />
  )
}

export default ScrollProgress
