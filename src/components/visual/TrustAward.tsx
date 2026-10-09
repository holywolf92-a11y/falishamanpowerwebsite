'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Award, BadgeCheck, Medal, ShieldCheck } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { cn } from '@/utilities/ui'

// Awards / recognition showcase for the About section — a flat, on-brand
// composition (gold medallion centerpiece + floating credential chips) on the
// royal-blue panel. Replaces the earlier generated 3D award images.

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

function FloatCard({
  className,
  z,
  delay = 0,
  reduce,
  children,
}: {
  className?: string
  z: number
  delay?: number
  reduce: boolean | null
  children: React.ReactNode
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
        {children}
      </motion.div>
    </div>
  )
}

function CredChip({ Icon, label, sub }: { Icon: IconComponent; label: string; sub: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-3.5 py-2.5 shadow-xl backdrop-blur-md">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--gold)]/20 text-[var(--gold)]">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-bold text-white">{label}</p>
        <p className="text-[11px] text-white/60">{sub}</p>
      </div>
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

        {/* centerpiece medallion */}
        <div className="relative flex h-[430px] flex-col items-center justify-center md:h-[480px]" style={{ transformStyle: 'preserve-3d' }}>
          <div style={{ transform: 'translateZ(35px)' }}>
            <motion.div
              animate={reduce ? {} : { y: [0, -8, 0] }}
              transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div
                className="grid h-40 w-40 place-items-center rounded-full md:h-48 md:w-48"
                style={{
                  background:
                    'radial-gradient(circle at 50% 32%, color-mix(in oklch, var(--gold) 90%, white), var(--gold) 72%)',
                  boxShadow: '0 22px 50px rgba(0,0,0,0.45), inset 0 2px 12px rgba(255,255,255,0.55)',
                }}
              >
                <div className="grid h-[86%] w-[86%] place-items-center rounded-full border-2 border-white/45">
                  <Award aria-hidden="true" strokeWidth={1.5} className="h-20 w-20 text-[var(--navy)] md:h-24 md:w-24" />
                </div>
              </div>
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

      {/* satellite credential chips — outside the panel edges, at different depths */}
      <FloatCard reduce={reduce} z={75} delay={0.25} className="-left-6 bottom-10 md:-left-12">
        <CredChip Icon={ShieldCheck} label="BEOE Licensed" sub="OEP No. 4035" />
      </FloatCard>
      <FloatCard reduce={reduce} z={60} delay={0.55} className="-right-5 -top-5 md:-right-9">
        <CredChip Icon={Medal} label="ISO 9001:2015" sub="Quality managed" />
      </FloatCard>
      <FloatCard reduce={reduce} z={85} delay={0.85} className="-right-4 bottom-20 md:-right-8">
        <CredChip Icon={BadgeCheck} label="POEPA Member" sub="Industry body" />
      </FloatCard>
    </div>
  )
}
