'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'

// Shows a handful of roles, with an "Explore all roles" toggle to reveal the rest.
export function ExpandableRoles({ roles, initial = 6 }: { roles: string[]; initial?: number }) {
  const [open, setOpen] = useState(false)
  const shown = open ? roles : roles.slice(0, initial)
  const hasMore = roles.length > initial

  return (
    <div>
      <ul className="flex flex-wrap gap-1.5">
        {shown.map((r) => (
          <li
            key={r}
            className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground/75"
          >
            {r}
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="group/btn mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          {open ? 'Show fewer roles' : `Explore all ${roles.length} roles`}
          <ChevronDown
            className={cn('h-4 w-4 transition-transform duration-300', open && 'rotate-180')}
          />
        </button>
      )}
    </div>
  )
}
