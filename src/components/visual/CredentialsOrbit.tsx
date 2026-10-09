'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Award, BadgeCheck, ShieldCheck, UserCheck, Users, type LucideIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'

export type CredentialsOrbitStat = {
  value: string
  label: string
  sub?: string
}

export type CredentialsOrbitBadge = {
  abbr: string
  name: string
  /** Optional official logo image (e.g. /logos/credentials/secp.png). Falls back to abbr+name text. */
  logo?: string
}

export type CredentialsOrbitProps = {
  stats: CredentialsOrbitStat[]
  badges: CredentialsOrbitBadge[]
  whyHeading?: string
  whyPoints: string[]
  contactHref?: string
  /** Brand logo image for the center. Falls back to the "FM" wordmark. */
  logo?: string
}

const STAT_ICONS: LucideIcon[] = [Users, UserCheck, ShieldCheck, Award]

const ORBIT_TRANSITION = {
  duration: 60,
  ease: 'linear' as const,
  repeat: Infinity,
  repeatType: 'loop' as const,
}

export const CredentialsOrbit: React.FC<CredentialsOrbitProps> = ({
  stats,
  badges,
  whyHeading = 'Why Employers Choose Us',
  whyPoints,
  contactHref = '/contact',
  logo,
}) => {
  const reducedMotion = useReducedMotion()

  const [headingFirstWord, ...headingRestWords] = whyHeading.split(' ')
  const headingRest = headingRestWords.join(' ')

  const badgeCount = Math.max(badges.length, 1)

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.4fr_1fr]">
      {/* LEFT: stat cards */}
      <div className="flex flex-col gap-4">
        {stats.map((stat, index) => {
          const Icon = STAT_ICONS[index % STAT_ICONS.length]

          return (
            <div
              key={`${stat.label}-${index}`}
              className={cn(
                'rounded-2xl border-l-4 border-[var(--navy)] bg-card p-5 shadow-sm ring-1 ring-border',
                'transition-all duration-300 hover:-translate-y-1 hover:shadow-md',
              )}
            >
              <Icon aria-hidden="true" className="mb-2 h-6 w-6 text-[var(--navy)]" />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
                {stat.sub ? <span className="block">{stat.sub}</span> : null}
              </div>
            </div>
          )
        })}
      </div>

      {/* CENTER: orbital credentials diagram */}
      <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
        {/* Dashed orbit ring */}
        <div
          aria-hidden="true"
          className="absolute inset-6 rounded-full border-2 border-dashed border-primary/30"
        />

        {/* Center brand card */}
        <div className="absolute left-1/2 top-1/2 z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-xl ring-1 ring-border md:h-44 md:w-44 grid">
          <div className="px-4 text-center">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt="Falisha Manpower" className="mx-auto h-16 w-16 object-contain md:h-[4.5rem] md:w-[4.5rem]" />
            ) : (
              <div className="text-4xl font-bold text-[var(--gold)]">FM</div>
            )}
            <div className="mt-2 text-[13px] font-extrabold uppercase leading-none tracking-tight md:text-sm">
              <span className="text-[var(--navy)]">Falisha</span>{' '}
              <span className="text-primary">Manpower</span>
            </div>
            <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.35em] text-[var(--gold)]">
              <span className="h-px w-3 bg-[var(--gold)]/60" aria-hidden="true" />
              Recruitment
              <span className="h-px w-3 bg-[var(--gold)]/60" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Orbiting badges */}
        <motion.div
          className="absolute inset-0"
          animate={reducedMotion ? undefined : { rotate: 360 }}
          transition={reducedMotion ? undefined : ORBIT_TRANSITION}
        >
          {badges.map((badge, index) => {
            const angle = (index * (360 / badgeCount) * Math.PI) / 180
            const left = 50 + 42 * Math.cos(angle)
            const top = 50 + 42 * Math.sin(angle)

            return (
              <div
                key={`${badge.abbr}-${index}`}
                className="absolute"
                style={{
                  left: `${left.toFixed(4)}%`,
                  top: `${top.toFixed(4)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <motion.div
                  className="grid h-20 w-20 place-items-center rounded-full bg-white p-2 text-center shadow-lg ring-1 ring-border md:h-24 md:w-24"
                  animate={reducedMotion ? undefined : { rotate: -360 }}
                  transition={reducedMotion ? undefined : ORBIT_TRANSITION}
                  title={badge.name}
                >
                  {badge.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={badge.logo}
                      alt={badge.name}
                      className="h-14 w-14 object-contain md:h-16 md:w-16"
                      loading="lazy"
                    />
                  ) : (
                    <div>
                      <div className="text-sm font-bold text-[var(--navy)]">{badge.abbr}</div>
                      <div className="text-[9px] uppercase leading-tight text-muted-foreground">
                        {badge.name}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* RIGHT: why employers choose us */}
      <div className="rounded-2xl bg-card p-7 shadow-sm ring-1 ring-border">
        <h3 className="text-2xl font-bold">
          <span className="text-primary">{headingFirstWord}</span>
          {headingRest ? <span className="text-foreground"> {headingRest}</span> : null}
        </h3>

        <ul className="mt-5 flex flex-col gap-3">
          {whyPoints.map((point, index) => (
            <li key={`${index}-${point}`} className="flex items-start gap-3">
              <BadgeCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-[15px] text-foreground">{point}</span>
            </li>
          ))}
        </ul>

        <Button
          asChild
          className="mt-7 rounded-full bg-primary px-7 font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Link href={contactHref}>Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}
