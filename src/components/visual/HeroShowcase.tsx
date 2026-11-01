'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Globe, Award, ShieldCheck } from 'lucide-react'
import { Tilt3D } from './Tilt3D'
import { HeroFlightFx } from './HeroFlightFx'

export type HeroSlide = {
  eyebrow: string
  titleLead: string
  titleAccent: string
  titleRest?: string
  subtitle: string
  photo: string
  globe?: boolean
}

export type HeroShowcaseProps = {
  slides: HeroSlide[]
  primary: { href: string; label: string }
  secondary: { href: string; label: string }
}

function FloatCard({
  children,
  className,
  delay = 0,
  reduce,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  reduce: boolean | null
}) {
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={reduce ? {} : { opacity: 1, y: [0, -9, 0] }}
      transition={
        reduce
          ? undefined
          : { opacity: { duration: 0.5, delay }, y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay } }
      }
    >
      {children}
    </motion.div>
  )
}

export function HeroShowcase({ slides, primary, secondary }: HeroShowcaseProps) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce || slides.length <= 1) return
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [reduce, slides.length])

  const s = slides[i] || slides[0]

  return (
    <section className="relative overflow-hidden bg-background text-foreground">
      {/* grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(120% 90% at 50% 0%, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(120% 90% at 50% 0%, black, transparent 75%)',
        }}
      />
      {/* brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, color-mix(in oklch, var(--primary) 22%, transparent), transparent 70%)' }}
      />

      <div className="container relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
        {/* Left */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">{s.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                {s.titleLead}
                <span className="text-primary">{s.titleAccent}</span>
                {s.titleRest}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">{s.subtitle}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primary.href}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110"
            >
              {primary.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={secondary.href}
              className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium text-foreground transition hover:bg-muted"
            >
              {secondary.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>

        {/* Right: 3D photo composition + floating cards */}
        <Tilt3D max={7} className="relative mx-auto w-full max-w-sm lg:mr-0 lg:max-w-md">
          <div className="relative pt-4" style={{ transformStyle: 'preserve-3d' }}>
            {/* Per-slide image (crossfades with the slide); globe slide gets animated flights */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={i}
                  src={s.photo}
                  alt=""
                  initial={reduce ? false : { opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
              </AnimatePresence>
              {/* legibility scrim for the corner labels */}
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/0 to-black/40" />
              {s.globe && <HeroFlightFx className="pointer-events-none absolute inset-0 h-full w-full" />}
            </div>

          {/* Stat labels — card-less, white, floating over the image corners */}
          <div className="absolute left-4 top-4 md:left-5 md:top-5" style={{ transform: 'translateZ(40px)' }}>
          <FloatCard reduce={reduce} delay={0.1} className="w-44 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-sm">
                <Globe className="h-5 w-5" />
              </span>
              <span className="rounded-full border border-white/25 bg-white/15 px-2 py-0.5 text-[10px] font-semibold text-white">Gulf · EU · Asia</span>
            </div>
            <p className="mt-2 text-xs font-medium text-white/75">Markets served</p>
            <p className="text-2xl font-bold">48+</p>
          </FloatCard>
          </div>

          {/* Experience */}
          <div className="absolute right-4 top-4 text-right md:right-5 md:top-5" style={{ transform: 'translateZ(40px)' }}>
          <FloatCard reduce={reduce} delay={0.35} className="w-36 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            <span className="ml-auto grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-sm">
              <Award className="h-5 w-5" />
            </span>
            <p className="mt-2 text-xs font-medium text-white/75">Experience</p>
            <p className="text-2xl font-bold">15+ Years</p>
          </FloatCard>
          </div>

          {/* Government licence */}
          <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5" style={{ transform: 'translateZ(60px)' }}>
          <FloatCard reduce={reduce} delay={0.6} className="flex items-center gap-2.5 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-sm">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-medium text-white/75">Govt. Licensed</p>
              <p className="text-sm font-bold leading-tight">BEOE · OEP 4035</p>
            </div>
          </FloatCard>
          </div>
          </div>
        </Tilt3D>
      </div>
    </section>
  )
}
