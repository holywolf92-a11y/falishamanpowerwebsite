'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/utilities/ui'

// Awards showcase for the About section — a cluster of generated 3D awards
// (shield centerpiece + trophy, medal and rosette) floating at parallax depths.

const AWARDS = {
  shield: '/icons/awards/shield.webp',
  trophy: '/icons/awards/trophy.webp',
  medal: '/icons/awards/medal.webp',
  rosette: '/icons/awards/rosette.webp',
}

function FloatImg({
  src,
  className,
  imgClassName,
  z,
  delay = 0,
  reduce,
}: {
  src: string
  className?: string
  imgClassName?: string
  z: number
  delay?: number
  reduce: boolean | null
}) {
  return (
    <div className={cn('absolute', className)} style={{ transform: `translateZ(${z}px)` }}>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={reduce ? {} : { opacity: 1, y: [0, -9, 0] }}
        transition={
          reduce
            ? undefined
            : { opacity: { duration: 0.5, delay }, y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay } }
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          aria-hidden
          className={cn('w-auto object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.4)]', imgClassName)}
          loading="lazy"
        />
      </motion.div>
    </div>
  )
}

export function TrustAward({ className }: { className?: string }) {
  const reduce = useReducedMotion()

  return (
    <div className={cn('relative', className)} style={{ transformStyle: 'preserve-3d' }}>
      {/* main award panel */}
      <div
        className="relative overflow-hidden rounded-[2rem] border border-border shadow-2xl"
        style={{
          background:
            'linear-gradient(165deg, var(--navy) 0%, color-mix(in oklch, var(--primary) 45%, var(--navy)) 100%)',
        }}
      >
        {/* grid pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        {/* glow */}
        <div aria-hidden className="absolute left-1/2 top-[42%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/35 blur-3xl" />
        {/* rotating dashed ring */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-[42%] h-72 w-72 rounded-full border-2 border-dashed border-white/15"
          style={{ x: '-50%', y: '-50%' }}
          animate={reduce ? {} : { rotate: 360 }}
          transition={reduce ? undefined : { duration: 40, repeat: Infinity, ease: 'linear' }}
        />

        {/* centerpiece shield */}
        <div className="relative flex h-[430px] flex-col items-center justify-center md:h-[480px]" style={{ transformStyle: 'preserve-3d' }}>
          <div style={{ transform: 'translateZ(35px)' }}>
            <motion.div
              animate={reduce ? {} : { y: [0, -8, 0] }}
              transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={AWARDS.trophy}
                alt="Falisha Manpower Excellence Award trophy"
                className="h-64 w-auto object-contain drop-shadow-[0_28px_44px_rgba(0,0,0,0.5)] md:h-80"
                loading="lazy"
              />
            </motion.div>
          </div>

          <div className="mt-6 text-center" style={{ transform: 'translateZ(20px)' }}>
            <div className="text-lg tracking-[0.3em] text-[var(--gold)]" aria-label="5 star rating">
              ★★★★★
            </div>
            <p className="mt-1.5 font-semibold text-white">Trusted Overseas Recruitment</p>
            <p className="text-sm text-white/60">Ethical · Compliant · End-to-end</p>
          </div>
        </div>
      </div>

      {/* satellite awards — outside the panel edges, at different depths */}
      <FloatImg src={AWARDS.shield} reduce={reduce} z={75} delay={0.25} className="-left-6 bottom-8 md:-left-12" imgClassName="h-36 md:h-44" />
      <FloatImg src={AWARDS.medal} reduce={reduce} z={60} delay={0.55} className="-right-5 -top-6 md:-right-9" imgClassName="h-28 md:h-32" />
      <FloatImg src={AWARDS.rosette} reduce={reduce} z={85} delay={0.85} className="-right-4 bottom-16 md:-right-8" imgClassName="h-24 md:h-28" />
    </div>
  )
}
