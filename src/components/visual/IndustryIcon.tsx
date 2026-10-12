import {
  Beef,
  Building2,
  Cpu,
  Factory,
  Fuel,
  GraduationCap,
  HardHat,
  Hotel,
  Landmark,
  Plane,
  Shield,
  Shirt,
  ShoppingBag,
  Sprout,
  Stethoscope,
  TrendingUp,
  Truck,
  Wrench,
  Zap,
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

// Ordered: the first rule whose keyword is a substring of the lowercased name wins,
// so put more specific rules before broader ones.
const industryRules: IndustryRule[] = [
  { keywords: ['construction'], Icon: HardHat },
  { keywords: ['steel', 'fabrication', 'manufactur', 'factory', 'production'], Icon: Factory },
  { keywords: ['oil', 'gas', 'petro'], Icon: Fuel },
  { keywords: ['power', 'energy', 'electric'], Icon: Zap },
  { keywords: ['health', 'pharma', 'medical', 'nurs'], Icon: Stethoscope },
  { keywords: ['information', 'technology', 'software', 'tech'], Icon: Cpu },
  { keywords: ['hospitality', 'hotel', 'catering', 'chef'], Icon: Hotel },
  { keywords: ['engineer'], Icon: Wrench },
  { keywords: ['textile', 'garment', 'sewing', 'tailor'], Icon: Shirt },
  { keywords: ['bank', 'account', 'finance'], Icon: Landmark },
  { keywords: ['security', 'guard', 'safety'], Icon: Shield },
  { keywords: ['agri', 'farm', 'crop'], Icon: Sprout },
  { keywords: ['livestock', 'dairy', 'poultry'], Icon: Beef },
  { keywords: ['travel', 'tourism', 'aviation'], Icon: Plane },
  { keywords: ['transport', 'logistics', 'supply', 'driver'], Icon: Truck },
  { keywords: ['fmcg', 'retail', 'consumer'], Icon: ShoppingBag },
  { keywords: ['sales'], Icon: TrendingUp },
  { keywords: ['education', 'teach'], Icon: GraduationCap },
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
