'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Globe, Award, ShieldCheck } from 'lucide-react'
import { Tilt3D } from './Tilt3D'

export type HeroSlide = {
  eyebrow: string
  titleLead: string
  titleAccent: string
  titleRest?: string
  subtitle: string
  /** Transparent cut-out portrait (PNG/WebP with alpha) that floats on the light hero. */
  photo: string
}

export type HeroShowcaseProps = {
  slides: HeroSlide[]
  /** Number of destination markets served — single-sourced from siteStats so the
   *  hero figure never disagrees with the Countries/About pages. */
  marketCount: number
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

/** Small white "glass" stat chip — reads cleanly over the light hero background. */
function StatChip({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-card/80 px-3.5 py-2.5 shadow-xl shadow-black/5 backdrop-blur-md ring-1 ring-white/40 dark:ring-white/5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
        <Icon className="h-5 w-5" />
      </span>
      <div className="leading-tight">
        <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
        <p className="text-lg font-bold text-foreground">{value}</p>
      </div>
    </div>
  )
}

export function HeroShowcase({ slides, marketCount, primary, secondary }: HeroShowcaseProps) {
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
        style={{ background: 'radial-gradient(circle, color-mix(in oklch, var(--primary) 20%, transparent), transparent 70%)' }}
      />

      <div className="container relative grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-12">
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

        {/* Right: floating cut-out person on the light hero + glass stat chips */}
        <Tilt3D max={6} className="relative mx-auto flex w-full max-w-md items-end justify-center">
          <div className="relative w-full" style={{ transformStyle: 'preserve-3d' }}>
            {/* soft brand backdrop disc behind the subject */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
              style={{
                background:
                  'radial-gradient(circle at 50% 42%, color-mix(in oklch, var(--primary) 18%, transparent), color-mix(in oklch, var(--gold) 10%, transparent) 55%, transparent 72%)',
              }}
            />
            {/* thin brand ring for depth */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[46%] -z-10 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--primary)]/15"
            />

            {/* ground shadow ellipse */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[4%] left-1/2 h-5 w-[58%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-xl"
            />

            {/* the cut-out portrait — kept narrow and centred so the chips can flank it */}
            <div className="relative mx-auto h-[25rem] w-[15rem] sm:w-[17rem] md:h-[31rem] md:w-[20rem]" style={{ transform: 'translateZ(30px)' }}>
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={i}
                  src={s.photo}
                  alt=""
                  initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0 mx-auto h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_26px_42px_rgba(2,6,23,0.22)]"
                  loading="eager"
                />
              </AnimatePresence>
            </div>

            {/* Markets served — left, at shoulder height (below every subject's face) */}
            <div className="absolute left-0 top-28 md:-left-1" style={{ transform: 'translateZ(60px)' }}>
              <FloatCard reduce={reduce} delay={0.1}>
                <StatChip icon={Globe} label="Markets served" value={`${marketCount}+`} />
              </FloatCard>
            </div>

            {/* Experience — mid right, beside the torso (clear of the face) */}
            <div className="absolute right-0 top-1/2 md:-right-1" style={{ transform: 'translateZ(60px) translateY(-50%)' }}>
              <FloatCard reduce={reduce} delay={0.35}>
                <StatChip icon={Award} label="Experience" value="15+ Years" />
              </FloatCard>
            </div>

            {/* Government licence — lower left, clear of the torso */}
            <div className="absolute bottom-6 left-0 md:-left-1" style={{ transform: 'translateZ(80px)' }}>
              <FloatCard reduce={reduce} delay={0.6}>
                <StatChip icon={ShieldCheck} label="Govt. Licensed" value="BEOE · OEP 4035" />
              </FloatCard>
            </div>
          </div>
        </Tilt3D>
      </div>
    </section>
  )
}
