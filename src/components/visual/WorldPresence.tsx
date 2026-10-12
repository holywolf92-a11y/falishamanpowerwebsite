import React from 'react'
import { WORLD } from './worldMapGeo'

// A vector world map (d3 geoNaturalEarth1) for the profile's "global presence" band:
// muted land, the destination countries highlighted in royal blue, Pakistan as a gold
// hub, and thin arcs radiating from Pakistan to each market. Designed to sit on navy.
export function WorldPresence({ className }: { className?: string }) {
  const { viewBox, graticule, other, served, pak, dots, pakCentroid } = WORLD

  const arc = (a: readonly [number, number], b: readonly [number, number]) => {
    const mx = (a[0] + b[0]) / 2
    const my = (a[1] + b[1]) / 2
    const dx = b[0] - a[0]
    const dy = b[1] - a[1]
    const len = Math.hypot(dx, dy) || 1
    const off = len * 0.16
    return `M${a[0]},${a[1]} Q${(mx - (dy / len) * off).toFixed(1)},${(my + (dx / len) * off).toFixed(1)} ${b[0]},${b[1]}`
  }

  return (
    <svg
      viewBox={viewBox}
      className={className}
      role="img"
      aria-label="World map highlighting the destination countries Falisha Manpower recruits for across the Gulf, Europe, Africa and Asia, with Pakistan as the home base"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="wp-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path d={graticule} fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="0.5" />
      <path d={other} fill="#2a3c6e" fillOpacity="0.85" />

      {/* network arcs from Pakistan to each market */}
      <g fill="none" stroke="#f4b740" strokeOpacity="0.22" strokeWidth="0.6">
        {dots.map((d, i) => (
          <path key={i} d={arc(pakCentroid, d)} />
        ))}
      </g>

      <path d={served} fill="#4f79ff" filter="url(#wp-glow)" />
      <path d={pak} fill="#f4b740" />

      {dots.map((d, i) => (
        <circle key={i} cx={d[0]} cy={d[1]} r="2.6" fill="#ffd98a" />
      ))}
      <circle cx={pakCentroid[0]} cy={pakCentroid[1]} r="6" fill="#f4b740" stroke="#fff" strokeWidth="1.6" />
    </svg>
  )
}
