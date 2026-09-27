import React from 'react'
import { cn } from '@/utilities/ui'
import {
  Award,
  Briefcase,
  Building2,
  Car,
  ClipboardCheck,
  ClipboardList,
  Cog,
  Cpu,
  FileCheck,
  Factory,
  Fuel,
  Handshake,
  HardHat,
  Hotel,
  Package,
  Plane,
  PlaneTakeoff,
  Search,
  ShieldCheck,
  Sprout,
  Stethoscope,
  Truck,
  UserCheck,
  Users,
  UsersRound,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'

const MAP: [RegExp, LucideIcon][] = [
  [/requirement|analysis|planning/, ClipboardList],
  [/sourc|talent|candidate pool|nationwide/, Search],
  [/screen|shortlist|assessment|trade test|verification|qualification/, ClipboardCheck],
  [/interview|delegation/, Handshake],
  [/document|paperwork/, FileCheck],
  [/medical/, Stethoscope],
  [/visa/, Plane],
  [/beoe|protector|regulat|complian|licen|corporate registration|secp/, ShieldCheck],
  [/pre-departure|mobili|deployment|travel|arrival/, PlaneTakeoff],
  [/iso|quality/, Award],
  [/professional|executive|management/, Briefcase],
  [/engineer/, Cog],
  [/technical|technician|maintenance/, Wrench],
  [/skilled trade|skilled manpower|welder|fabricat|mason/, HardHat],
  [/bulk|mass|high-volume|multi-trade/, Users],
  [/construction|civil|infrastructure|epc|mep/, HardHat],
  [/oil|gas|petro|energy|utilit|power/, Fuel],
  [/electric|electrical/, Zap],
  [/health|pharma|medical|life/, Stethoscope],
  [/hospitality|hotel|tourism/, Hotel],
  [/logistic|warehous|supply/, Package],
  [/transport|fleet|driver|heavy equip/, Truck],
  [/automotive/, Car],
  [/manufactur|industrial|machine|production|factory/, Factory],
  [/agricultur|food/, Sprout],
  [/it |information tech|telecom|network|software/, Cpu],
  [/facility/, Wrench],
  [/semi-skilled|general/, UsersRound],
  [/company|companies|contractor|project owner|agency|employer|member|chamber/, Building2],
  [/permanent|batch/, UserCheck],
]

function iconFor(text: string): LucideIcon {
  const t = (text || '').toLowerCase()
  for (const [re, Icon] of MAP) if (re.test(t)) return Icon
  return Briefcase
}

export type FeatureItem = { title: string; desc: string }

export function FeatureGrid({
  items,
  columns = 2,
  accent = 'teal',
  className,
}: {
  items: FeatureItem[]
  columns?: 2 | 3
  accent?: 'teal' | 'gold'
  className?: string
}) {
  const badge =
    accent === 'gold'
      ? 'bg-[var(--gold)]/12 text-[var(--gold)]'
      : 'bg-primary/10 text-primary'

  return (
    <div
      className={cn('grid gap-4', columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2', className)}
    >
      {items.map((it) => {
        const Icon = iconFor(it.title + ' ' + it.desc)
        return (
          <div
            key={it.title}
            className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl', badge)}>
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-semibold leading-snug">{it.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
