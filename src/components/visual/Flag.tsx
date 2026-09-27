import type React from 'react'

import * as Flags from 'country-flag-icons/react/3x2'

import { cn } from '@/utilities/ui'
import { countryCodeFromName } from '@/utilities/countryCodes'

type FlagIconComponent = React.ComponentType<{ className?: string; title?: string }>

export type FlagProps = {
  /** Explicit ISO 3166-1 alpha-2 country code (e.g. "SA"). Takes precedence over `name`. */
  code?: string
  /** Country name, resolved to a code via {@link countryCodeFromName} when `code` is absent. */
  name?: string
  className?: string
}

/**
 * Renders a rounded country flag. Pure and presentational (no hooks), so it is
 * safe to use inside server components.
 *
 * Falls back to a small monogram badge when the country cannot be resolved.
 */
export const Flag: React.FC<FlagProps> = ({ code, name, className }) => {
  const resolvedCode = (code ?? countryCodeFromName(name ?? '')) || undefined

  const F = resolvedCode
    ? (Flags as unknown as Record<string, FlagIconComponent | undefined>)[
        resolvedCode.toUpperCase()
      ]
    : undefined

  const sizeClasses = 'h-4 w-6'

  if (F) {
    return (
      <F className={cn('inline-block rounded-[3px] shadow-sm', sizeClasses, className)} title={name} />
    )
  }

  const fallbackLabel = (resolvedCode ?? name ?? '')
    .replace(/[^a-zA-Z]/g, '')
    .slice(0, 2)
    .toUpperCase()

  return (
    <span
      aria-hidden={fallbackLabel ? undefined : true}
      title={name}
      className={cn(
        'inline-flex items-center justify-center rounded-[3px] bg-muted text-muted-foreground text-[0.55rem] font-semibold leading-none shadow-sm',
        sizeClasses,
        className,
      )}
    >
      {fallbackLabel}
    </span>
  )
}
