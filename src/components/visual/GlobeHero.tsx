'use client'

// Animated hero globe: a rotating night-earth with gold arcs showing manpower
// flowing from Pakistan to its destination markets. globe.gl (three.js) is
// dynamically imported inside the effect so it never touches SSR or the initial
// bundle — it loads as its own chunk once the hero mounts. Reduced-motion users
// get a static, non-rotating globe with no animated flows.

import React, { useEffect, useRef } from 'react'

const PAK = { lat: 30.3753, lng: 69.3451 }

const DESTS: { lat: number; lng: number }[] = [
  { lat: 23.8859, lng: 45.0792 }, // Saudi Arabia
  { lat: 23.4241, lng: 53.8478 }, // UAE
  { lat: 25.3548, lng: 51.1839 }, // Qatar
  { lat: 29.3117, lng: 47.4818 }, // Kuwait
  { lat: 21.4735, lng: 55.9754 }, // Oman
  { lat: 26.0667, lng: 50.5577 }, // Bahrain
  { lat: 38.9637, lng: 35.2433 }, // Türkiye
  { lat: 45.9432, lng: 24.9668 }, // Romania
  { lat: 51.1657, lng: 10.4515 }, // Germany
  { lat: 4.2105, lng: 101.9758 }, // Malaysia
  { lat: 36.2048, lng: 138.2529 }, // Japan
  { lat: 35.9078, lng: 127.7669 }, // South Korea
]

export function GlobeHero({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    let world: { _destructor?: () => void } | undefined
    let ro: ResizeObserver | undefined
    let cancelled = false

    void import('globe.gl').then(({ default: Globe }) => {
      if (cancelled || !ref.current) return

      const arcs = DESTS.map((d) => ({ startLat: PAK.lat, startLng: PAK.lng, endLat: d.lat, endLng: d.lng }))
      const points = [
        { ...PAK, size: 0.85, color: '#f4b740' },
        ...DESTS.map((d) => ({ ...d, size: 0.5, color: '#7aa2ff' })),
      ]
      const rings = reduce
        ? []
        : [
            { ...PAK, maxR: 5, speed: 2, color: 'rgba(244,183,64,0.7)' },
            ...DESTS.map((d) => ({ ...d, maxR: 3, speed: 1.2, color: 'rgba(122,162,255,0.55)' })),
          ]

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const g: any = (Globe as any)()(el)
      g.backgroundColor('rgba(0,0,0,0)')
        .globeImageUrl('/textures/earth-night.webp')
        .showAtmosphere(true)
        .atmosphereColor('#5b84ff')
        .atmosphereAltitude(0.22)
        .arcsData(arcs)
        .arcColor(() => ['rgba(244,183,64,0.05)', 'rgba(255,205,90,1)'])
        .arcAltitude(0.32)
        .arcStroke(0.9)
        .arcDashLength(0.45)
        .arcDashGap(1.6)
        .arcDashInitialGap(() => Math.random() * 3)
        .arcDashAnimateTime(reduce ? 0 : 2000)
        .pointsData(points)
        .pointColor('color')
        .pointAltitude(0.01)
        .pointRadius('size')
        .ringsData(rings)
        .ringColor('color')
        .ringMaxRadius('maxR')
        .ringPropagationSpeed('speed')
        .ringRepeatPeriod(1400)

      world = g

      const setSize = () => g.width(el.clientWidth).height(el.clientHeight)
      setSize()
      ro = new ResizeObserver(setSize)
      ro.observe(el)

      const c = g.controls()
      c.enableZoom = false
      c.enablePan = false
      c.enableRotate = false
      c.autoRotate = !reduce
      c.autoRotateSpeed = 0.8
      g.pointOfView({ lat: 22, lng: 64, altitude: 2.2 })
    })

    return () => {
      cancelled = true
      ro?.disconnect()
      try {
        world?._destructor?.()
      } catch {
        /* noop */
      }
      if (el) el.innerHTML = ''
    }
  }, [])

  return <div ref={ref} className={className} aria-hidden />
}

export default GlobeHero
