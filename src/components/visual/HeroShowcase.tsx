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
}

export type HeroShowcaseProps = {
  slides: HeroSlide[]
  photo: string
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

export function HeroShowcase({ slides, photo, primary, secondary }: HeroShowcaseProps) {
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
            {/* CEO holding the glowing globe — manpower exported from Pakistan worldwide */}
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo}
                alt="Raja Abid Ayoub, Founder & CEO of Falisha Manpower, holding a globe showing manpower exported from Pakistan to the world"
                className="block aspect-[4/5] w-full object-cover"
                width={1100}
                height={1375}
                loading="eager"
              />
              {/* animated flights crossing the globe */}
              <HeroFlightFx className="pointer-events-none absolute inset-0 h-full w-full" />
            </div>

          {/* Card: markets served */}
          <div className="absolute -left-5 -top-5 md:-left-12" style={{ transform: 'translateZ(30px)' }}>
          <FloatCard reduce={reduce} delay={0.1} className="w-52 rounded-2xl bg-white p-4 text-[var(--navy)] shadow-2xl ring-1 ring-black/[0.06]">
            <div className="flex items-center justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                <Globe className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">Gulf · EU · Asia</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Markets served</p>
            <p className="text-2xl font-bold">48+</p>
          </FloatCard>
          </div>

          {/* Card: experience */}
          <div className="absolute -right-3 top-10 md:-right-8" style={{ transform: 'translateZ(30px)' }}>
          <FloatCard reduce={reduce} delay={0.35} className="w-44 rounded-2xl bg-white p-4 text-[var(--navy)] shadow-2xl ring-1 ring-black/[0.06]">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
              <Award className="h-5 w-5" />
            </span>
            <p className="mt-3 text-xs text-muted-foreground">Experience</p>
            <p className="text-2xl font-bold">15+ Years</p>
            <p className="text-[11px] text-muted-foreground">of ethical recruitment</p>
          </FloatCard>
          </div>

          {/* Card: government licence */}
          <div className="absolute bottom-8 -right-2 md:-right-6" style={{ transform: 'translateZ(90px)' }}>
          <FloatCard reduce={reduce} delay={0.6} className="w-60 rounded-2xl bg-white p-4 text-[var(--navy)] shadow-2xl ring-1 ring-black/[0.06]">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Govt. Licensed</p>
                <p className="text-base font-bold leading-tight">BEOE · OEP 4035</p>
              </div>
            </div>
          </FloatCard>
          </div>
          </div>
        </Tilt3D>
      </div>
    </section>
  )
}
