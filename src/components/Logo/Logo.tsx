import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className, loading = 'eager' } = props

  return (
    <span
      className={clsx('inline-flex items-center gap-2.5', className)}
      aria-label="Falisha Manpower"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white p-1 shadow-sm ring-1 ring-black/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/falisha-mark.webp"
          alt=""
          aria-hidden
          loading={loading}
          width={36}
          height={36}
          className="h-full w-full object-contain"
        />
      </span>
      <span className="inline-flex items-baseline gap-1.5 text-xl font-bold leading-none tracking-tight">
        <span>Falisha</span>
        <span className="font-medium text-primary">Manpower</span>
      </span>
    </span>
  )
}
