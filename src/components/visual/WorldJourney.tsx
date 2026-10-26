'use client'

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import React, { useRef } from 'react'
import { WORLD } from './worldMapGeo'
import { WorldPresence } from './WorldPresence'

function arcPath(a: readonly [number, number], b: readonly [number, number]) {
  const mx = (a[0] + b[0]) / 2
  const my = (a[1] + b[1]) / 2
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const len = Math.hypot(dx, dy) || 1
  const off = len * 0.16
  return `M${a[0]},${a[1]} Q${(mx - (dy / len) * off).toFixed(1)},${(my + (dx / len) * off).toFixed(1)} ${b[0]},${b[1]}`
}

function Arc({ d, progress, start, end }: { d: string; progress: MotionValue<number>; start: number; end: number }) {
  const pathLength = useTransform(progress, [start, end], [0, 1])
  return (
    <motion.path
      d={d}
      style={{ pathLength }}
      fill="none"
      stroke="#f4b740"
      strokeOpacity="0.6"
      strokeWidth="0.7"
      strokeLinecap="round"
    />
  )
}

function Dot({ x, y, progress, at }: { x: number; y: number; progress: MotionValue<number>; at: number }) {
  const opacity = useTransform(progress, [Math.max(at - 0.05, 0), at], [0, 1])
  return <motion.circle cx={x} cy={y} r="2.6" fill="#ffd98a" style={{ opacity }} />
}

/**
 * The "Pakistan → the world" signature: the static WorldPresence geometry made
 * kinetic — gold arcs draw out from Pakistan (nearest markets first) as the band
 * scrolls through view, destination dots appear as each route lands, and the hub
 * pulses. Reduced-motion renders the fully-drawn static map.
 */
export function WorldJourney({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] })

  if (reduce) return <WorldPresence className={className} />

  const { viewBox, graticule, other, served, pak, dots, pakCentroid } = WORLD
  // Draw nearest markets first so the network spreads outward from Pakistan.
  const sorted = dots
    .map((d, i) => ({ d, i, dist: Math.hypot(d[0] - pakCentroid[0], d[1] - pakCentroid[1]) }))
    .sort((a, b) => a.dist - b.dist)
  const N = sorted.length || 1

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox={viewBox}
        className="block h-auto w-full"
        role="img"
        aria-label="World map highlighting the destination countries Falisha Manpower recruits for across the Gulf, Europe, Africa and Asia, with Pakistan as the home base"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="wj-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path d={graticule} fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="0.5" />
        <path d={other} fill="#2a3c6e" fillOpacity="0.85" />

        <g>
          {sorted.map((s, k) => {
            const start = (k / N) * 0.7
            return <Arc key={s.i} d={arcPath(pakCentroid, s.d)} progress={scrollYProgress} start={start} end={Math.min(start + 0.3, 1)} />
          })}
        </g>

        <path d={served} fill="#4f79ff" filter="url(#wj-glow)" />
        <path d={pak} fill="#f4b740" />

        {sorted.map((s, k) => (
          <Dot key={s.i} x={s.d[0]} y={s.d[1]} progress={scrollYProgress} at={Math.min((k / N) * 0.7 + 0.28, 0.98)} />
        ))}

        {/* Pakistan hub + pulse */}
        <motion.circle
          cx={pakCentroid[0]}
          cy={pakCentroid[1]}
          r="6"
          fill="none"
          stroke="#f4b740"
          strokeWidth="1.2"
          initial={{ r: 6, opacity: 0.5 }}
          animate={{ r: [6, 18], opacity: [0.5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        />
        <circle cx={pakCentroid[0]} cy={pakCentroid[1]} r="6" fill="#f4b740" stroke="#fff" strokeWidth="1.6" />
      </svg>
    </div>
  )
}

export default WorldJourney
