import React from 'react'
import { GEO } from './turkeyGlobeGeo'

// Official Türkiye flag emblem (crescent + star) — public-domain geometry taken
// verbatim from the national flag SVG. In its own coordinate space: crescent outer
// circle Ø30000 centred (30000,0), inner Ø24000 centred (33750,0); five-point star
// (Ø15000) centred (49250,0) with one point facing the crescent. The emblem's bbox
// spans x∈[15000,55318], y∈[-8021,8021] (centre ≈ (35159,0)).
const EMBLEM_PATH =
  'm41750 0 13568-4408-8386 11541V-7133l8386 11541zm925 8021a15000 15000 0 1 1 0-16042 12000 12000 0 1 0 0 16042z'

// City markers over Türkiye, pre-projected into the same 0–520 viewBox as the geometry
// (orthographic, scale 545, centred on Türkiye). `a` = label side relative to the dot.
type City = { name: string; x: number; y: number; a: 'start' | 'end' | 'middle'; dx: number; dy: number; capital?: boolean }
const CITIES: City[] = [
  { name: 'İstanbul', x: 215.2, y: 249.4, a: 'end', dx: -4, dy: -1 },
  { name: 'Bursa', x: 215.2, y: 257.2, a: 'end', dx: -4, dy: 8 },
  { name: 'İzmir', x: 199.8, y: 272.9, a: 'end', dx: -4, dy: 3 },
  { name: 'Antalya', x: 225.5, y: 289.2, a: 'middle', dx: 0, dy: 10 },
  { name: 'Konya', x: 239.3, y: 280.5, a: 'middle', dx: -2, dy: 10 },
  { name: 'Ankara', x: 242.6, y: 261, a: 'start', dx: 5, dy: -2, capital: true },
  { name: 'Kayseri', x: 261.9, y: 272.6, a: 'start', dx: 5, dy: 3 },
  { name: 'Adana', x: 260.6, y: 289.1, a: 'middle', dx: 2, dy: 10 },
  { name: 'Gaziantep', x: 276.2, y: 288.2, a: 'start', dx: 4, dy: 5 },
  { name: 'Samsun', x: 267.8, y: 248.3, a: 'start', dx: 4, dy: -1 },
  { name: 'Trabzon', x: 292.1, y: 250.3, a: 'start', dx: 4, dy: 3 },
]
// Sea labels (italic, letter-spaced) and dull neighbour-country labels, same projection.
const SEAS: { name: string; x: number; y: number }[] = [
  { name: 'BLACK SEA', x: 256, y: 227 },
]
const SEA_STACK = { lines: ['MEDITERRANEAN', 'SEA'], x: 223, y: 309 }
const NEIGHBORS: { name: string; x: number; y: number }[] = [
  { name: 'BULGARIA', x: 196, y: 233 },
  { name: 'GEORGIA', x: 314, y: 239 },
  { name: 'IRAN', x: 330, y: 270 },
  { name: 'IRAQ', x: 322, y: 305 },
  { name: 'SYRIA', x: 286, y: 309 },
  { name: 'CYPRUS', x: 243, y: 306 },
]
const LABEL_FONT = 'system-ui, -apple-system, "Segoe UI", sans-serif'

// "Flights from Pakistan": Pakistan lies east of Türkiye, just past this globe's
// ESE edge, so routes are anchored there and sweep in to the main airport cities.
const PAK = { x: 462, y: 360 }
const FLIGHT_CITIES = new Set(['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Gaziantep', 'Trabzon'])

// A royal-blue 3D-style globe (true orthographic projection centred on Türkiye) with
// the neighbouring countries drawn dull and Türkiye raised, red and flag-filled, so it
// clearly stands out. City markers, sea and neighbour labels are projected into the
// same space so it reads as a rich annotated map. Geometry is pre-projected in
// ./turkeyGlobeGeo (0–520 viewBox).
export function TurkeyGlobe({ className }: { className?: string }) {
  const { CX, CY, R, turkeyD, landD, graticuleD } = GEO

  // Place the official flag emblem over the central body of Anatolia: scale so the
  // crescent's outer circle (Ø30000) renders ~40px, and centre the emblem's bbox.
  const emScale = 44 / 30000
  const emCx = 252
  const emCy = 272
  const emblemTransform = `translate(${(emCx - emScale * 35159).toFixed(2)} ${emCy}) scale(${emScale.toFixed(6)})`

  // Flight arcs: a quadratic curve from Pakistan to each destination city, bowed
  // away from the globe centre so the routes lift off the surface.
  const flights = CITIES.filter((c) => FLIGHT_CITIES.has(c.name)).map((c, i) => {
    const mx = (PAK.x + c.x) / 2
    const my = (PAK.y + c.y) / 2
    const dx = c.x - PAK.x
    const dy = c.y - PAK.y
    const len = Math.hypot(dx, dy) || 1
    let nx = -dy / len
    let ny = dx / len
    if (nx * (mx - CX) + ny * (my - CY) < 0) {
      nx = -nx
      ny = -ny
    }
    const lift = Math.min(60, len * 0.32)
    const d = `M${PAK.x} ${PAK.y} Q${(mx + nx * lift).toFixed(1)} ${(my + ny * lift).toFixed(1)} ${c.x} ${c.y}`
    return { name: c.name, d, begin: `${(i * 0.45).toFixed(2)}s` }
  })

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
        <radialGradient id="tg-flagglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tg-pakglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#16a34a" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
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

      {/* soft glow behind the flag so it reads clearly on the red, clipped to Türkiye */}
      <g clipPath="url(#tg-turkey)">
        <circle cx={emCx} cy={emCy} r="36" fill="url(#tg-flagglow)" />
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

      {/* flights from Pakistan sweeping into the Turkish airport cities */}
      <g>
        {flights.map((f) => (
          <path
            key={'fg' + f.name}
            d={f.d}
            fill="none"
            stroke="#ffd86b"
            strokeOpacity="0.12"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
        ))}
        {flights.map((f) => (
          <path
            key={'fl' + f.name}
            d={f.d}
            fill="none"
            stroke="#ffd86b"
            strokeOpacity="0.5"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="2.5 4.5"
          >
            <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1.5s" repeatCount="indefinite" />
          </path>
        ))}
        {flights.map((f) => (
          <g key={'fc' + f.name}>
            <animateMotion dur="2.8s" begin={f.begin} repeatCount="indefinite" path={f.d} />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.1;0.85;1"
              dur="2.8s"
              begin={f.begin}
              repeatCount="indefinite"
            />
            <circle r="3.4" fill="#ffffff" opacity="0.25" />
            <circle r="1.6" fill="#ffffff" />
          </g>
        ))}
        {/* Pakistan origin (east of Türkiye, at the globe's edge) */}
        <circle cx={PAK.x} cy={PAK.y} r="24" fill="url(#tg-pakglow)" />
        <circle cx={PAK.x} cy={PAK.y} r="3" fill="none" stroke="#34d399" strokeWidth="0.9">
          <animate attributeName="r" values="3;10" dur="2.1s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.85;0" dur="2.1s" repeatCount="indefinite" />
        </circle>
        <circle cx={PAK.x} cy={PAK.y} r="2.8" fill="#16a34a" stroke="#eafff0" strokeWidth="0.8" />
        <text
          x={PAK.x}
          y={PAK.y + 13}
          textAnchor="middle"
          fontFamily={LABEL_FONT}
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="0.6"
          fill="#eafff0"
          paintOrder="stroke"
          stroke="#07351c"
          strokeWidth="2.3"
          strokeLinejoin="round"
        >
          ✈ PAKISTAN
        </text>
      </g>

      {/* annotated-map labels: seas, dull neighbours, then city markers on top */}
      <g fontFamily={LABEL_FONT}>
        {SEAS.map((s) => (
          <text
            key={s.name}
            x={s.x}
            y={s.y}
            textAnchor="middle"
            fontSize="8.5"
            fontStyle="italic"
            fontWeight="500"
            letterSpacing="2"
            fill="#9db4f0"
            opacity="0.7"
          >
            {s.name}
          </text>
        ))}
        <text
          x={SEA_STACK.x}
          y={SEA_STACK.y}
          textAnchor="middle"
          fontSize="8.5"
          fontStyle="italic"
          fontWeight="500"
          letterSpacing="2"
          fill="#9db4f0"
          opacity="0.7"
        >
          <tspan x={SEA_STACK.x}>{SEA_STACK.lines[0]}</tspan>
          <tspan x={SEA_STACK.x} dy="10">
            {SEA_STACK.lines[1]}
          </tspan>
        </text>
        {NEIGHBORS.map((n) => (
          <text
            key={n.name}
            x={n.x}
            y={n.y}
            textAnchor="middle"
            fontSize="7"
            fontWeight="600"
            letterSpacing="1.4"
            fill="#aab8e4"
            opacity="0.5"
          >
            {n.name}
          </text>
        ))}
        {CITIES.map((c) => (
          <g key={c.name}>
            <circle
              cx={c.x}
              cy={c.y}
              r={c.capital ? 2.4 : 1.7}
              fill="#ffffff"
              stroke="#0b1b4d"
              strokeWidth="0.7"
            />
            {c.capital && (
              <circle
                cx={c.x}
                cy={c.y}
                r="4.2"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.55"
                strokeWidth="0.8"
              />
            )}
            <text
              x={c.x + c.dx}
              y={c.y + c.dy}
              textAnchor={c.a}
              fontSize="8.2"
              fontWeight="600"
              fill="#ffffff"
              paintOrder="stroke"
              stroke="#0a1838"
              strokeWidth="2.3"
              strokeLinejoin="round"
            >
              {c.name}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}
