import type { ComponentType, SVGProps } from 'react'
import {
  Briefcase,
  Crown,
  FileCheck,
  FileClock,
  Globe,
  GraduationCap,
  Plane,
  Ticket,
  UserCheck,
  Users,
  UsersRound,
  Wallet,
} from 'lucide-react'

import { cn } from '@/utilities/ui'

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

/**
 * Ordered keyword → icon lookup. The first entry whose any keyword is found as a
 * substring of the (lowercased) service name wins, so more specific keywords are
 * listed before broader ones.
 */
const ICON_MAP: ReadonlyArray<{ keywords: readonly string[]; Icon: IconComponent }> = [
  { keywords: ['bulk', 'mass'], Icon: Users },
  { keywords: ['permanent'], Icon: UserCheck },
  { keywords: ['executive'], Icon: Crown },
  { keywords: ['mobility', 'global'], Icon: Globe },
  { keywords: ['visa'], Icon: Plane },
  { keywords: ['attestation', 'document'], Icon: FileCheck },
  { keywords: ['payroll'], Icon: Wallet },
  { keywords: ['training', 'skill'], Icon: GraduationCap },
  { keywords: ['contract', 'temporary'], Icon: FileClock },
  { keywords: ['ticket'], Icon: Ticket },
  { keywords: ['human', 'hr'], Icon: UsersRound },
]

export interface ServiceIconProps {
  name: string
  className?: string
}

export function ServiceIcon({ name, className }: ServiceIconProps) {
  const normalized = name.toLowerCase()
  const match = ICON_MAP.find(({ keywords }) =>
    keywords.some((keyword) => normalized.includes(keyword)),
  )
  const Icon = match?.Icon ?? Briefcase

  return <Icon aria-hidden="true" focusable="false" className={cn('h-6 w-6', className)} />
}
