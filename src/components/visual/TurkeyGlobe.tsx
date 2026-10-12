import React from 'react'
import { GEO } from './turkeyGlobeGeo'

// Official Türkiye flag emblem (crescent + star) — public-domain geometry taken
// verbatim from the national flag SVG. In its own coordinate space: crescent outer
// circle Ø30000 centred (30000,0), inner Ø24000 centred (33750,0); five-point star
// (Ø15000) centred (49250,0) with one point facing the crescent. The emblem's bbox
// spans x∈[15000,55318], y∈[-8021,8021] (centre ≈ (35159,0)).
const EMBLEM_PATH =
  'm41750 0 13568-4408-8386 11541V-7133l8386 11541zm925 8021a15000 15000 0 1 1 0-16042 12000 12000 0 1 0 0 16042z'

// A royal-blue 3D-style globe (true orthographic projection centred on Türkiye) with
// the neighbouring countries drawn dull and Türkiye raised, red and flag-filled, so it
// clearly stands out. Geometry is pre-projected in ./turkeyGlobeGeo (0–520 viewBox).
export function TurkeyGlobe({ className }: { className?: string }) {
  const { CX, CY, R, turkeyD, landD, graticuleD } = GEO

  // Place the official flag emblem over the central body of Anatolia: scale so the
  // crescent's outer circle (Ø30000) renders ~40px, and centre the emblem's bbox.
  const emScale = 40 / 30000
  const emCx = 252
  const emCy = 272
  const emblemTransform = `translate(${(emCx - emScale * 35159).toFixed(2)} ${emCy}) scale(${emScale.toFixed(6)})`

  return (
    <svg
      viewBox="0 0 520 520"
      className={className}
      role="img"
      aria-label="Globe centred on Türkiye with neighbouring countries shown dull — Falisha Manpower's speciality recruitment market"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="tg-ocean" cx="34%" cy="28%" r="82%">
          <stop offset="0%" stopColor="#5b86ff" />
          <stop offset="45%" stopColor="#2a51d6" />
          <stop offset="78%" stopColor="#15317f" />
          <stop offset="100%" stopColor="#0a1d57" />
        </radialGradient>
        <radialGradient id="tg-spec" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tg-redglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff2b38" stopOpacity="0.8" />
          <stop offset="55%" stopColor="#e30a17" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#e30a17" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tg-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f23642" />
          <stop offset="100%" stopColor="#c90812" />
        </linearGradient>
        <radialGradient id="tg-ambient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b63e0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3b63e0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tg-landfade" gradientUnits="userSpaceOnUse" cx={CX} cy={CY} r={R}>
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#ffffff" />
          <stop offset="97%" stopColor="#000000" />
        </radialGradient>
        <mask id="tg-landmask">
          <circle cx={CX} cy={CY} r={R} fill="url(#tg-landfade)" />
        </mask>
        <clipPath id="tg-globe">
          <circle cx={CX} cy={CY} r={R} />
        </clipPath>
        <clipPath id="tg-turkey">
          <path d={turkeyD} />
        </clipPath>
        <filter id="tg-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#060f30" floodOpacity="0.6" />
        </filter>
        <filter id="tg-liftwhite" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" floodColor="#7a0009" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* ambient halo behind the globe */}
      <circle cx={CX} cy={CY} r={R + 24} fill="url(#tg-ambient)" />

      {/* globe sphere */}
      <circle cx={CX} cy={CY} r={R} fill="url(#tg-ocean)" />

      {/* dull neighbouring landmasses (edge-faded so they recede into the ocean) */}
      <g clipPath="url(#tg-globe)" mask="url(#tg-landmask)">
        <path d={landD} fill="#48588c" fillOpacity="0.9" />
        <path d={landD} fill="none" stroke="#a9bcef" strokeOpacity="0.18" strokeWidth="0.5" />
      </g>

      {/* graticule */}
      <g clipPath="url(#tg-globe)">
        <path d={graticuleD} fill="none" stroke="#dbe5ff" strokeOpacity="0.12" strokeWidth="0.75" />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#dbe5ff" strokeOpacity="0.22" strokeWidth="1" />
      </g>

      {/* specular highlight */}
      <ellipse cx={CX - 78} cy={CY - 92} rx="120" ry="92" fill="url(#tg-spec)" opacity="0.6" />

      {/* red glow + raised Türkiye */}
      <circle cx="259" cy="268" r="120" fill="url(#tg-redglow)" />
      <g filter="url(#tg-soft)">
        <path d={turkeyD} fill="url(#tg-red)" />
        <path d={turkeyD} fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.1" />
      </g>

      {/* official flag emblem (crescent + star), clipped to Türkiye so it never spills out */}
      <g clipPath="url(#tg-turkey)" filter="url(#tg-liftwhite)">
        <path d={EMBLEM_PATH} transform={emblemTransform} fill="#ffffff" />
      </g>

      {/* crisp rim light */}
      <circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke="#9fb8ff"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
    </svg>
  )
}
