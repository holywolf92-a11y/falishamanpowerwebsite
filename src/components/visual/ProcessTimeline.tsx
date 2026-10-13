import React from 'react'

export type ProcessStep = {
  num: string
  title: string
  desc: string
}

export type ProcessTimelineProps = {
  steps: ProcessStep[]
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical rail, behind the numbered circles */}
      <div aria-hidden="true" className="absolute inset-y-0 left-6 w-px bg-border" />
      <ol className="relative">
        {steps.map((step) => (
          <li key={step.num} className="flex gap-5 pb-8 last:pb-0">
            <div className="z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-foreground ring-4 ring-primary/20">
              {step.num}
            </div>
            <div className="pt-1.5">
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-[15px] text-muted-foreground">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
