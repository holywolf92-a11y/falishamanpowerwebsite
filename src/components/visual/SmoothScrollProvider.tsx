'use client'

import Lenis from 'lenis'
import React, { useEffect } from 'react'

/**
 * Premium inertial (momentum) smooth scrolling via Lenis. Wraps a page so wheel
 * and trackpad input eases instead of jumping — the signature "awwwards" feel.
 *
 * Bails out entirely (native scroll) when the visitor prefers reduced motion or
 * is on a touch/coarse-pointer device, where hijacking scroll hurts more than it
 * helps. Cleans up its rAF loop + instance on unmount so it never leaks between
 * client-side navigations.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia?.('(pointer: coarse)').matches
    if (reduce || coarse) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

export default SmoothScrollProvider
