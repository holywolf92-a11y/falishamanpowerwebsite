'use client'

// Subtle animated "flights" over the hero globe: small glowing planes that travel
// along arcs radiating from Pakistan (globe centre), conveying manpower moving to
// the world. Pure SVG/SMIL overlay — no JS loop. Hidden under reduced-motion.

import { useReducedMotion } from 'framer-motion'
import React from 'react'

export function HeroFlightFx({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <svg
      className={className}
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false"
    >
      <defs>
        <filter id="hf-glow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="2.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <g id="hf-plane">
          <path d="M0,-7 L5.5,5 L0,1.8 L-5.5,5 Z" fill="#ffffff" />
        </g>
      </defs>
      <g filter="url(#hf-glow)">
        <use href="#hf-plane">
          <animateMotion dur="3.4s" repeatCount="indefinite" rotate="auto" path="M205,352 C170,320 130,300 92,300" />
        </use>
        <use href="#hf-plane">
          <animateMotion dur="3s" begin="0.6s" repeatCount="indefinite" rotate="auto" path="M205,352 C255,322 300,312 338,316" />
        </use>
        <use href="#hf-plane">
          <animateMotion dur="2.6s" begin="1.3s" repeatCount="indefinite" rotate="auto" path="M205,352 C250,352 285,366 312,382" />
        </use>
      </g>
    </svg>
  )
}

export default HeroFlightFx
