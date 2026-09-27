import { cn } from '@/utilities/ui'

type Step = {
  title: string
  description: string
  icon?: string
}

export type ProcessStepsProps = {
  steps?: Step[]
  className?: string
}

// Custom 3D icons (generated, transparent WebP). Step 4 reuses the visa/passport
// icon from the services set — same subject, consistent style.
const DEFAULT_STEPS: Step[] = [
  {
    title: 'Share your requirement',
    description: 'Tell us the roles, skills and headcount you need to fill.',
    icon: '/icons/process/requirement.webp',
  },
  {
    title: 'We source & screen',
    description: 'We shortlist candidates from our vetted Pakistani talent pool.',
    icon: '/icons/process/screening.webp',
  },
  {
    title: 'Interviews & selection',
    description: 'You interview the shortlist and select your preferred hires.',
    icon: '/icons/process/interview.webp',
  },
  {
    title: 'Visa & attestation',
    description: 'We handle visa processing, medicals and document attestation.',
    icon: '/icons/services/visa.webp',
  },
  {
    title: 'Mobilisation & arrival',
    description: 'We arrange travel and onboarding so your team arrives ready.',
    icon: '/icons/process/arrival.webp',
  },
]

export function ProcessSteps({ steps = DEFAULT_STEPS, className }: ProcessStepsProps) {
  return (
    <ol className={cn('relative grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-4', className)}>
      {/* Connector line — horizontal on md+, sits behind the nodes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-9 z-0 hidden h-px -translate-y-1/2 bg-border md:block"
        style={{ left: '10%', right: '10%' }}
      />

      {steps.map((step, index) => {
        const isLast = index === steps.length - 1

        return (
          <li
            key={`${index}-${step.title}`}
            className="relative flex items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center"
          >
            {/* Connector line — vertical on mobile, sits behind the nodes */}
            {!isLast ? (
              <span
                aria-hidden="true"
                className="absolute left-9 top-16 z-0 h-[calc(100%+2rem)] w-px -translate-x-1/2 bg-border md:hidden"
              />
            ) : null}

            {/* Node — 3D icon with number badge */}
            <div className="relative z-10 shrink-0 md:mb-5">
              <div className="grid h-[4.5rem] w-[4.5rem] place-items-center rounded-2xl bg-card shadow-md ring-1 ring-border">
                {step.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={step.icon}
                    alt=""
                    aria-hidden="true"
                    className="h-14 w-14 object-contain drop-shadow"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-xl font-bold text-primary">{index + 1}</span>
                )}
              </div>
              <span
                className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border-2 border-background bg-[var(--gold)] text-xs font-bold text-primary-foreground shadow-sm"
                aria-hidden="true"
              >
                {index + 1}
              </span>
            </div>

            {/* Copy */}
            <div className="md:px-2">
              <h3 className="font-semibold text-foreground">
                <span className="sr-only">{`Step ${index + 1}: `}</span>
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
