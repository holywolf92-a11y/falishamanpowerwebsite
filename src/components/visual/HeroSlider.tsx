'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

type HeroLink = {
  href: string
  label: string
}

export type HeroSlide = {
  eyebrow: string
  titleLead: string
  titleAccent: string
  titleRest?: string
  subtitle: string
  primary: HeroLink
  secondary: HeroLink
}

export type HeroSliderProps = {
  slides: HeroSlide[]
}

/**
 * Presentational block for a single slide's left-column copy.
 * Rendered both in the (invisible) height-sizer layer and the animated layer.
 */
function SlideContent({ slide }: { slide: HeroSlide }) {
  return (
    <div className="max-w-xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
        {slide.eyebrow}
      </p>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-foreground md:text-6xl">
        {slide.titleLead} <span className="text-primary">{slide.titleAccent}</span>
        {slide.titleRest ? <> {slide.titleRest}</> : null}
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground">{slide.subtitle}</p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button asChild size="lg">
          <Link href={slide.primary.href}>{slide.primary.label}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={slide.secondary.href}>{slide.secondary.label}</Link>
        </Button>
      </div>
    </div>
  )
}

/**
 * Bespoke recruitment illustration: a spinning wireframe globe, an orbiting
 * marker, a dotted Pakistan -> Gulf flight path, location pins and a paper
 * plane. currentColor is the deep-green primary (set by the wrapping element);
 * gold accents use var(--gold). All motion pauses under reduced-motion.
 */
function HeroArt({ reduced }: { reduced: boolean }) {
  const spin = reduced ? undefined : { rotate: 360 }
  const spinTransition = { duration: 52, repeat: Infinity, ease: 'linear' as const }
  const orbitTransition = { duration: 22, repeat: Infinity, ease: 'linear' as const }
  const globeOrigin = { transformBox: 'view-box' as const, transformOrigin: '250px 270px' }

  return (
    <svg
      viewBox="0 0 500 460"
      role="img"
      aria-label="Illustration of overseas recruitment from Pakistan to the Gulf"
      className="h-auto w-full"
    >
      {/* Soft halo */}
      <circle cx={250} cy={270} r={172} fill="currentColor" opacity={0.04} />

      {/* Static dashed orbit ring */}
      <circle
        cx={250}
        cy={270}
        r={175}
        fill="none"
        stroke="var(--gold)"
        strokeOpacity={0.28}
        strokeWidth={1}
        strokeDasharray="2 8"
      />

      {/* Globe base + latitudes (static) */}
      <circle
        cx={250}
        cy={270}
        r={150}
        fill="currentColor"
        fillOpacity={0.05}
        stroke="currentColor"
        strokeOpacity={0.3}
        strokeWidth={1.5}
      />
      <g stroke="currentColor" strokeOpacity={0.2} strokeWidth={1} fill="none">
        <ellipse cx={250} cy={270} rx={150} ry={52} />
        <ellipse cx={250} cy={270} rx={150} ry={104} />
        <line x1={100} y1={270} x2={400} y2={270} />
      </g>

      {/* Longitudes (spinning) */}
      <motion.g
        stroke="currentColor"
        strokeOpacity={0.18}
        strokeWidth={1}
        fill="none"
        style={globeOrigin}
        animate={spin}
        transition={reduced ? undefined : spinTransition}
      >
        <ellipse cx={250} cy={270} rx={52} ry={150} />
        <ellipse cx={250} cy={270} rx={104} ry={150} />
        <line x1={250} y1={120} x2={250} y2={420} />
      </motion.g>

      {/* Orbiting gold marker */}
      <motion.g
        style={globeOrigin}
        animate={spin}
        transition={reduced ? undefined : orbitTransition}
      >
        <circle cx={250} cy={95} r={7} fill="var(--gold)" stroke="currentColor" strokeWidth={1.5} />
      </motion.g>

      {/* Dotted flight path (flowing dashes) */}
      <motion.path
        d="M168 215 Q250 70 332 215"
        fill="none"
        stroke="var(--gold)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray="1 12"
        animate={reduced ? undefined : { strokeDashoffset: [0, -52] }}
        transition={reduced ? undefined : { duration: 2.2, repeat: Infinity, ease: 'linear' }}
      />

      {/* Origin pin (Pakistan) */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '168px 215px' }}
        animate={reduced ? undefined : { scale: [1, 1.12, 1] }}
        transition={reduced ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <g transform="translate(168 215)">
          <path
            d="M0 0 C-9 -12 -9 -24 0 -30 C9 -24 9 -12 0 0 Z"
            fill="var(--gold)"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <circle cx={0} cy={-19} r={4.5} fill="var(--background)" />
        </g>
      </motion.g>

      {/* Destination pin (Gulf) */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '332px 215px' }}
        animate={reduced ? undefined : { scale: [1, 1.12, 1] }}
        transition={
          reduced ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }
        }
      >
        <g transform="translate(332 215)">
          <path
            d="M0 0 C-9 -12 -9 -24 0 -30 C9 -24 9 -12 0 0 Z"
            fill="currentColor"
            stroke="var(--gold)"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <circle cx={0} cy={-19} r={4.5} fill="var(--gold)" />
        </g>
      </motion.g>

      {/* Paper plane at the arc apex (gentle float) */}
      <g transform="translate(232 116)">
        <motion.g
          animate={reduced ? undefined : { y: [0, -10, 0] }}
          transition={reduced ? undefined : { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M0 8 L36 0 L21 31 L15 19 Z"
            fill="var(--gold)"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <path d="M36 0 L15 19 L21 31 Z" fill="currentColor" fillOpacity={0.85} />
        </motion.g>
      </g>
    </svg>
  )
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const prefersReduced = useReducedMotion()
  const reduced = prefersReduced ?? false
  const multiple = slides.length > 1

  const plugins = useMemo(
    () =>
      multiple && !reduced
        ? [Autoplay({ delay: 5500, stopOnInteraction: false })]
        : [],
    [multiple, reduced],
  )

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, plugins)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  if (slides.length === 0) return null

  const active = slides[selectedIndex] ?? slides[0]

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        backgroundImage:
          'radial-gradient(120% 120% at 85% 12%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 60%), radial-gradient(100% 100% at 0% 100%, color-mix(in oklch, var(--gold) 12%, transparent), transparent 55%)',
      }}
    >
      {/* Embla mechanics: off-screen viewport driving autoplay / index / navigation.
          Visible presentation is the framer-motion layers below. */}
      {multiple ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-0 overflow-hidden opacity-0"
        >
          <div ref={emblaRef}>
            <div className="flex">
              {slides.map((_, index) => (
                <div key={index} className="min-w-0 shrink-0 grow-0 basis-full" />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="container relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          {/* LEFT: animated copy over an invisible height-sizer (prevents layout shift) */}
          <div className="relative grid">
            <div aria-hidden className="invisible col-start-1 row-start-1 grid">
              {slides.map((slide, index) => (
                <div key={index} className="col-start-1 row-start-1">
                  <SlideContent slide={slide} />
                </div>
              ))}
            </div>
            <div className="col-start-1 row-start-1 grid">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  className="col-start-1 row-start-1"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
                  transition={{ duration: reduced ? 0.2 : 0.5, ease: 'easeOut' }}
                >
                  <SlideContent slide={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: illustration, re-entering on each slide change */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              key={selectedIndex}
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduced ? 0.2 : 0.6, ease: 'easeOut' }}
              className="w-full max-w-sm text-primary sm:max-w-md lg:max-w-none"
            >
              <HeroArt reduced={reduced} />
            </motion.div>
          </div>
        </div>

        {/* Controls (only when there is more than one slide) */}
        {multiple ? (
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous slide"
                className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next slide"
                className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
            <div className="flex items-center gap-2">
              {slides.map((slide, index) => {
                const isActive = index === selectedIndex
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={isActive}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                      isActive
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-border hover:bg-muted-foreground/50',
                    )}
                  />
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
