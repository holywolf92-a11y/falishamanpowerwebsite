import {
  Building2,
  Cpu,
  Fuel,
  GraduationCap,
  HardHat,
  Hotel,
  Landmark,
  ShoppingBag,
  Stethoscope,
  TrendingUp,
  Truck,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/utilities/ui'

export interface IndustryIconProps {
  name: string
  className?: string
}

type IndustryRule = {
  keywords: string[]
  Icon: LucideIcon
}

const industryRules: IndustryRule[] = [
  { keywords: ['construction'], Icon: HardHat },
  { keywords: ['oil', 'gas'], Icon: Fuel },
  { keywords: ['health', 'pharma', 'medical'], Icon: Stethoscope },
  { keywords: ['tech', 'it', 'information'], Icon: Cpu },
  { keywords: ['hospitality', 'hotel'], Icon: Hotel },
  { keywords: ['engineer'], Icon: Wrench },
  { keywords: ['account', 'finance', 'bank'], Icon: Landmark },
  { keywords: ['sales'], Icon: TrendingUp },
  { keywords: ['logistics', 'supply'], Icon: Truck },
  { keywords: ['retail', 'consumer'], Icon: ShoppingBag },
  { keywords: ['education'], Icon: GraduationCap },
]

function resolveIcon(name: string): LucideIcon {
  const value = name.toLowerCase()
  for (const rule of industryRules) {
    if (rule.keywords.some((keyword) => value.includes(keyword))) {
      return rule.Icon
    }
  }
  return Building2
}

export function IndustryIcon({ name, className }: IndustryIconProps) {
  const Icon = resolveIcon(name)
  return <Icon aria-hidden="true" className={cn('h-6 w-6', className)} />
}
