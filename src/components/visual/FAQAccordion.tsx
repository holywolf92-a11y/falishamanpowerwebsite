'use client'

import React, { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'

export type FAQItem = {
  q: string
  a: string
}

export type FAQAccordionProps = {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()
  const baseId = useId()

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const buttonId = `${baseId}-faq-trigger-${index}`
        const panelId = `${baseId}-faq-panel-${index}`

        return (
          <div key={index} className="mb-3 overflow-hidden rounded-xl bg-card ring-1 ring-border">
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
            >
              <span>{item.q}</span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  'h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 motion-reduce:transition-none',
                  isOpen && 'rotate-180',
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-[15px] text-muted-foreground">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
