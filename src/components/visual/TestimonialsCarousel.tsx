'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from '@/utilities/ui'

export interface Testimonial {
  name: string
  roleOrCompany?: string
  quote: string
  rating?: number | string
}

export interface TestimonialsCarouselProps {
  items: Array<Testimonial>
}

/** Take the first letters of up to two words in the name, e.g. "Ahmed Al-Farsi" -> "AA". */
function getInitials(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)

  if (words.length === 0) return '?'

  return words.map((word) => word.charAt(0).toUpperCase()).join('')
}

/** Coerce a numeric-or-string rating into 1..5 filled stars, defaulting to 5. */
function getStarCount(rating: Testimonial['rating']): number {
  const parsed = Number(rating)
  const value = Number.isFinite(parsed) && parsed > 0 ? parsed : 5
  return Math.max(1, Math.min(5, Math.round(value)))
}

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const prefersReducedMotion = useReducedMotion()

  // Rebuild the plugin list when the motion preference changes so autoplay is
  // fully disabled (not just paused) for users who prefer reduced motion.
  const plugins = useMemo(
    () => (prefersReducedMotion ? [] : [Autoplay({ delay: 6000, stopOnInteraction: false })]),
    [prefersReducedMotion],
  )

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, plugins)

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<Array<number>>([])

  useEffect(() => {
    if (!emblaApi) return

    const update = () => {
      setScrollSnaps(emblaApi.scrollSnapList())
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    update()
    emblaApi.on('select', update)
    emblaApi.on('reInit', update)

    return () => {
      emblaApi.off('select', update)
      emblaApi.off('reInit', update)
    }
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (!items || items.length === 0) return null

  const showDots = scrollSnaps.length > 1

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {items.map((item, index) => {
            const starCount = getStarCount(item.rating)

            return (
              <div
                key={`${item.name}-${index}`}
                className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2 lg:basis-1/3"
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${index + 1} of ${items.length}`}
              >
                <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 font-semibold text-primary"
                      aria-hidden="true"
                    >
                      {getInitials(item.name)}
                    </div>
                    <figcaption className="min-w-0">
                      <div className="truncate font-semibold text-card-foreground">{item.name}</div>
                      {item.roleOrCompany ? (
                        <div className="truncate text-sm text-muted-foreground">
                          {item.roleOrCompany}
                        </div>
                      ) : null}
                    </figcaption>
                  </div>

                  <div
                    className="mt-4 text-[var(--gold)]"
                    aria-label={`Rated ${starCount} out of 5`}
                    role="img"
                  >
                    <span aria-hidden="true" className="tracking-wide">
                      {'★'.repeat(starCount)}
                    </span>
                  </div>

                  <blockquote className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
                    <Quote
                      className="absolute -left-1 -top-1 h-5 w-5 text-[var(--gold)]/25"
                      aria-hidden="true"
                    />
                    <p className="relative pl-1">
                      {'“'}
                      {item.quote}
                      {'”'}
                    </p>
                  </blockquote>
                </figure>
              </div>
            )
          })}
        </div>
      </div>

      {showDots ? (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous testimonials"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2">
            {scrollSnaps.map((_, index) => {
              const isActive = index === selectedIndex

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollTo(index)}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`Go to testimonial group ${index + 1}`}
                  className={cn(
                    'h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    isActive
                      ? 'w-6 bg-[var(--gold)]'
                      : 'w-2.5 bg-border hover:bg-muted-foreground/40',
                  )}
                />
              )
            })}
          </div>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next testimonials"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default TestimonialsCarousel
