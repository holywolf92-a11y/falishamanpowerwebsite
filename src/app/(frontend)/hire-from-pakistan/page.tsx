import type { Metadata } from 'next/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Reveal from '@/components/visual/Reveal'
import { FeatureGrid } from '@/components/visual/FeatureGrid'
import { ProcessTimeline } from '@/components/visual/ProcessTimeline'
import { FAQAccordion } from '@/components/visual/FAQAccordion'
import { RegionMarkets } from '@/components/visual/RegionMarkets'
import { Tilt3D } from '@/components/visual/Tilt3D'
import { IndustryIcon } from '@/components/visual/IndustryIcon'
import { industryImage } from '@/utilities/sectionImages'
import { ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

const SERVICES: { k: string; v: string }[] = [
  { k: 'Workforce Requirement Analysis', v: 'Review of job titles, workforce quantities, qualifications, technical skills, experience, employment conditions and deployment schedules.' },
  { k: 'Nationwide Candidate Sourcing', v: 'Targeted talent sourcing through recruitment networks, professional databases, regional channels and industry-specific campaigns across Pakistan.' },
  { k: 'Professional Recruitment', v: 'Recruitment of qualified executives, managers, engineers, specialists and professional personnel.' },
  { k: 'Technical Recruitment', v: 'Sourcing of technicians, supervisors, inspectors, operators, maintenance personnel and technical specialists.' },
  { k: 'Skilled Manpower Recruitment', v: 'Occupation-specific recruitment of experienced skilled tradespeople.' },
  { k: 'Bulk Manpower Recruitment', v: 'High-volume recruitment campaigns for construction, infrastructure, manufacturing and industrial workforce requirements.' },
  { k: 'CV Screening & Shortlisting', v: 'Candidate assessment against employer-defined qualifications, experience and job specifications.' },
  { k: 'Technical Assessment', v: 'Occupation-specific competency evaluation according to employer requirements.' },
  { k: 'Practical Trade Testing', v: 'Hands-on assessment for applicable skilled and technical positions.' },
  { k: 'Employer Interviews', v: 'Coordination of online, face-to-face, technical and employer-supervised interviews.' },
  { k: 'Recruitment Delegation Support', v: 'Coordination for international employers conducting interviews and selection campaigns in Pakistan.' },
  { k: 'Candidate Verification', v: 'Review of relevant qualifications, work experience and supporting documentation.' },
  { k: 'Documentation Coordination', v: 'Organized support for candidate and overseas recruitment documentation.' },
  { k: 'Medical Coordination', v: 'Assistance with applicable destination-country medical-fitness procedures.' },
  { k: 'Visa Processing Support', v: 'Recruitment-side support for applicable employment visa procedures.' },
  { k: 'BEOE & Protector Procedures', v: 'Coordination of applicable overseas employment and Protector of Emigrants formalities.' },
  { k: 'Pre-Departure Preparation', v: 'Candidate readiness, employment documentation and travel preparation.' },
  { k: 'Workforce Mobilization', v: 'Structured deployment coordination according to approved joining and project schedules.' },
]

const CATEGORIES: { k: string; v: string }[] = [
  { k: 'Executive & Management', v: 'Managers, department heads, project leaders and employer-defined management positions.' },
  { k: 'Professional', v: 'Qualified specialists and occupation-specific professionals.' },
  { k: 'Engineering', v: 'Civil, Mechanical, Electrical, Industrial, Project and other engineering personnel.' },
  { k: 'Technical', v: 'Technicians, supervisors, inspectors, operators and maintenance specialists.' },
  { k: 'Skilled Trades', v: 'Welders, Pipefitters, Fabricators, Electricians, Plumbers, Carpenters, Masons, Steel Fixers and related trades.' },
  { k: 'Heavy Equipment & Fleet', v: 'Excavator, Crane, Loader and Forklift Operators, Drivers and Equipment Mechanics.' },
  { k: 'Manufacturing & Industrial', v: 'Machine Operators, CNC Operators, Production Workers, Factory Electricians, Mechanics and Maintenance Technicians.' },
  { k: 'Healthcare', v: 'Qualified healthcare professionals, technical personnel and support workforce.' },
  { k: 'Hospitality & Facilities', v: 'Hotel personnel, food-service workers, maintenance teams, housekeeping and facility-support staff.' },
  { k: 'Logistics & Warehousing', v: 'Warehouse personnel, forklift operators, inventory staff, dispatch personnel and logistics workforce.' },
  { k: 'Semi-Skilled Workforce', v: 'Production workers, occupational assistants and semi-skilled personnel.' },
  { k: 'General Manpower', v: 'General workforce for approved overseas projects and business operations.' },
]

const INDUSTRIES: { k: string; v: string }[] = [
  { k: 'Construction & Civil Infrastructure', v: 'Civil Engineers, Site Engineers, Supervisors, Foremen, Masons, Steel Fixers, Carpenters, Electricians and Plumbers.' },
  { k: 'Oil, Gas & Petrochemicals', v: 'Engineers, Technicians, Welders, Pipefitters, Fabricators, QA/QC Personnel, HSE Personnel and Maintenance Workforce.' },
  { k: 'EPC & Engineering', v: 'Project Engineers, Planning Engineers, Technical Supervisors, Inspectors and Skilled Trades.' },
  { k: 'MEP', v: 'MEP Engineers, HVAC Technicians, Electricians, Plumbers and Mechanical Maintenance Personnel.' },
  { k: 'Energy & Utilities', v: 'Engineers, Operators, Electrical Personnel, Maintenance Teams and Technical Specialists.' },
  { k: 'Manufacturing & Industrial', v: 'Machine Operators, CNC Operators, Production Personnel, Mechanics, Electricians and Maintenance Technicians.' },
  { k: 'Heavy Equipment & Fleet', v: 'Excavator, Crane, Loader and Heavy Equipment Operators, Drivers and Mechanics.' },
  { k: 'Automotive', v: 'Auto Electricians, Vehicle Mechanics, Diesel Mechanics and Workshop Personnel.' },
  { k: 'Logistics & Warehousing', v: 'Warehouse Personnel, Forklift Operators, Drivers, Inventory Staff and Logistics Workers.' },
  { k: 'Transportation', v: 'Heavy-Vehicle Drivers, Trailer Drivers, Fleet Personnel, Mechanics and Transport Support Staff.' },
  { k: 'Healthcare & Medical', v: 'Healthcare Professionals, Technical Personnel and Support Staff.' },
  { k: 'Hospitality & Tourism', v: 'Hotel Personnel, Food-Service Staff, Housekeeping Teams and Operational Workforce.' },
  { k: 'Facility Management', v: 'HVAC Personnel, Electricians, Plumbers, Maintenance Technicians and Facility Support Staff.' },
  { k: 'Agriculture & Food Processing', v: 'Agricultural Personnel, Production Workers, Machine Operators and Quality-Control Personnel.' },
  { k: 'IT & Telecommunications', v: 'IT Professionals, Network Personnel, Telecommunications Specialists and Technical Workforce.' },
]

const PROCESS: { num: string; title: string; desc: string }[] = [
  { num: '01', title: 'Employer Requirement', desc: 'You provide job titles, workforce quantities, qualifications, experience, technical requirements, employment terms and expected mobilization timeline.' },
  { num: '02', title: 'Recruitment Planning', desc: 'A sourcing, assessment and selection strategy is developed according to the workforce requirement.' },
  { num: '03', title: 'Candidate Sourcing', desc: 'Suitable professional, technical, skilled and operational candidates are sourced across Pakistan.' },
  { num: '04', title: 'Screening & Shortlisting', desc: 'Candidate profiles are reviewed against your defined selection criteria.' },
  { num: '05', title: 'Technical Assessment', desc: 'Applicable candidates undergo technical evaluation or practical trade testing.' },
  { num: '06', title: 'Employer Interview & Selection', desc: 'You conduct online, face-to-face, technical or delegation-based interviews and make the final selection.' },
  { num: '07', title: 'Documentation & Processing', desc: 'Selected candidates proceed through applicable employment and overseas recruitment documentation.' },
  { num: '08', title: 'Medical & Visa Coordination', desc: 'Applicable destination-country medical and employment visa requirements are coordinated.' },
  { num: '09', title: 'BEOE / Protector Formalities', desc: 'Required Pakistan-side overseas employment and Protector procedures are completed.' },
  { num: '10', title: 'Pre-Departure & Deployment', desc: 'Selected candidates are prepared and mobilized according to approved joining schedules.' },
]

const BULK: { k: string; v: string }[] = [
  { k: 'High-Volume Candidate Sourcing', v: 'Access to substantial candidate pools across multiple workforce categories.' },
  { k: 'Multi-Trade Recruitment', v: 'Simultaneous sourcing of engineers, technicians, supervisors, operators, drivers and skilled trades.' },
  { k: 'Project-Based Hiring', v: 'Campaigns aligned with construction phases, shutdowns, production schedules and operational requirements.' },
  { k: 'Centralized Screening', v: 'Structured candidate filtering before employer interviews.' },
  { k: 'Trade Testing Campaigns', v: 'Coordinated practical assessments for skilled and technical occupations.' },
  { k: 'Employer Delegation Campaigns', v: 'Organized high-volume interviews and selection programs in Pakistan.' },
  { k: 'Batch Documentation Processing', v: 'Structured processing of multiple selected candidates.' },
  { k: 'Mobilization Planning', v: 'Workforce deployment coordinated according to project priorities and joining schedules.' },
]

const REGIONS = [
  { region: 'GCC', countries: ['Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Oman', 'Bahrain'] },
  { region: 'Middle East & Türkiye', countries: ['Türkiye', 'Libya', 'Jordan', 'Iraq'] },
  { region: 'Europe', countries: ['Germany', 'Italy', 'Romania', 'Poland', 'Hungary', 'Croatia', 'Serbia', 'France', 'Spain', 'Portugal'] },
  { region: 'Central Asia & Caucasus', countries: ['Kazakhstan', 'Kyrgyzstan', 'Uzbekistan', 'Azerbaijan'] },
  { region: 'East & Southeast Asia', countries: ['Malaysia', 'Japan', 'South Korea'] },
  { region: 'Other International Markets', countries: ['United Kingdom', 'Canada', 'Australia'] },
]

const SUPPORT: { k: string; v: string }[] = [
  { k: 'International Companies', v: 'Professional, technical, skilled and operational workforce recruitment.' },
  { k: 'EPC Contractors', v: 'Engineering, supervisory, technical and skilled project manpower.' },
  { k: 'Construction & Infrastructure', v: 'Civil, technical, skilled-trade and equipment-operation workforce.' },
  { k: 'Industrial & Manufacturing', v: 'Engineering, production, maintenance and technical personnel.' },
  { k: 'Energy Companies', v: 'Engineering, technical, operations and maintenance workforce.' },
  { k: 'Facility Management', v: 'MEP, technical maintenance and facilities personnel.' },
  { k: 'Logistics & Transportation', v: 'Drivers, equipment operators, warehouse and logistics workforce.' },
  { k: 'Hospitality Groups', v: 'Hotel, food-service, housekeeping, maintenance and operational personnel.' },
  { k: 'Project Owners', v: 'Specialist and large-scale project workforce recruitment.' },
  { k: 'International Recruitment Agencies', v: 'Pakistan-based candidate sourcing, screening, assessment and mobilization support.' },
]

const COMPLIANCE: { k: string; v: string }[] = [
  { k: 'Overseas Employment Promoter (OEP)', v: 'BEOE-Licensed Overseas Employment Promoter.' },
  { k: 'OEP Licence Number', v: 'OEP Licence No. 4035.' },
  { k: 'Licensing Authority', v: 'Bureau of Emigration & Overseas Employment (BEOE), Government of Pakistan.' },
  { k: 'Corporate Registration', v: 'SECP-Registered Private Limited Company.' },
  { k: 'Quality Management', v: 'ISO 9001:2015 Certified.' },
  { k: 'Industry Membership', v: 'Pakistan Overseas Employment Promoters Association (POEPA).' },
  { k: 'Business Membership', v: 'Chamber of Commerce Member.' },
  { k: 'Overseas Employment Processing', v: 'Recruitment and deployment coordinated through applicable Pakistan overseas employment procedures.' },
  { k: 'Protector Procedures', v: 'Support for applicable Protector of Emigrants formalities before overseas deployment.' },
  { k: 'Employer Assurance', v: 'Structured recruitment, documentation coordination, regulatory support and workforce mobilization.' },
]

const WHY: { k: string; v: string }[] = [
  { k: 'BEOE-Licensed OEP', v: 'Recruitment supported through Pakistan’s regulated overseas employment framework (OEP Licence No. 4035).' },
  { k: 'SECP-Registered Company', v: 'Established corporate structure under Pakistan’s company regulatory framework.' },
  { k: 'ISO 9001:2015 Certification', v: 'Structured quality-management procedures supporting consistency and process control.' },
  { k: 'Nationwide Talent Sourcing', v: 'Access to professional, engineering, technical, skilled, semi-skilled and general manpower.' },
  { k: 'Employer-Specific Recruitment', v: 'Candidate sourcing aligned with actual job descriptions and technical requirements.' },
  { k: 'Technical & Trade Assessment', v: 'Practical evaluation of relevant skilled and technical candidates.' },
  { k: 'Bulk Recruitment Capability', v: 'Recruitment infrastructure suitable for large project workforce requirements.' },
  { k: 'Employer Delegation Support', v: 'Structured coordination for international recruitment campaigns conducted in Pakistan.' },
  { k: 'End-to-End Coordination', v: 'Integrated sourcing, assessment, selection, processing and mobilization support.' },
  { k: 'Transparent Recruitment Process', v: 'Clear employer communication throughout recruitment and deployment.' },
]

const FAQS = [
  { q: 'Is Falisha Manpower licensed for overseas recruitment in Pakistan?', a: 'Yes. Falisha Manpower operates as a BEOE-licensed Overseas Employment Promoter under OEP Licence No. 4035.' },
  { q: 'Can international employers hire skilled Pakistani workers through your agency?', a: 'Yes. We recruit professional, engineering, technical, skilled, semi-skilled and general manpower according to employer requirements and applicable overseas employment procedures.' },
  { q: 'Can you manage bulk manpower recruitment from Pakistan?', a: 'Yes. Recruitment campaigns can be structured for individual specialists, complete technical teams and large-scale project workforce requirements.' },
  { q: 'Do you arrange technical assessments and trade testing?', a: 'Yes. Practical trade testing and technical assessments can be coordinated for applicable skilled and technical occupations.' },
  { q: 'Can employers interview candidates directly?', a: 'Yes. Employers may conduct online, face-to-face, technical and recruitment-delegation interviews.' },
  { q: 'Which industries do you recruit for?', a: 'Construction, infrastructure, oil and gas, EPC, engineering, manufacturing, healthcare, hospitality, logistics, transportation, facility management, agriculture, food processing, IT, telecommunications and other sectors.' },
  { q: 'What information should employers provide to start recruitment?', a: 'Job titles, workforce quantities, qualifications, experience requirements, technical skills, salary and benefits, contract terms, selection preferences and expected deployment schedule.' },
  { q: 'What happens after candidate selection?', a: 'Selected candidates proceed through applicable documentation, medical, visa, BEOE/Protector, pre-departure and deployment procedures according to the destination country.' },
  { q: 'Can you coordinate employer recruitment delegations in Pakistan?', a: 'Yes. We can support structured employer interview and selection campaigns involving multiple occupational categories.' },
  { q: 'How long does overseas manpower recruitment take?', a: 'Timelines depend on workforce volume, occupational categories, candidate availability, employer selection, documentation, visa procedures, destination-country requirements and mobilization schedules.' },
]

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
      </div>
    </Reveal>
  )
}

export default function HireFromPakistanPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-20 text-white md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(120% 90% at 50% 0%, black, transparent 75%)',
          }}
        />
        <div className="container relative max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">For international employers</p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Hire skilled manpower <span className="text-primary">from Pakistan</span>
          </h1>
          <p className="mt-5 text-lg text-white/70">
            Falisha Manpower provides employer-focused recruitment services covering the complete international
            hiring lifecycle — from workforce planning and nationwide sourcing to assessment, documentation and
            deployment. BEOE-licensed OEP No. 4035.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/fill-a-vacancy">Request workforce <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/25 bg-transparent text-white hover:bg-white/10">
              <Link href="/jobs">For candidates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container py-16 md:py-20">
        <SectionHead eyebrow="What we do" title="Employer-focused recruitment services" sub="Covering the complete international hiring lifecycle." />
        <Reveal delay={0.1}><div className="mt-8"><FeatureGrid columns={2} items={SERVICES.map((r) => ({ title: r.k, desc: r.v }))} /></div></Reveal>
      </section>

      {/* Workforce categories */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container py-16 md:py-20">
          <SectionHead eyebrow="Talent pool" title="Workforce categories we recruit" sub="Nationwide sourcing across every level of experience and occupational specialization." />
          <Reveal delay={0.1}><div className="mt-8"><FeatureGrid columns={3} items={CATEGORIES.map((r) => ({ title: r.k, desc: r.v }))} /></div></Reveal>
        </div>
      </section>

      {/* Industries */}
      <section className="container py-16 md:py-20">
        <SectionHead eyebrow="Sectors" title="Recruitment solutions across major industries" sub="Industry-specific manpower for professional, engineering, technical, skilled and operational roles." />
        <Reveal delay={0.1}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <Tilt3D key={ind.k} max={6}>
                <div className="group relative h-52 overflow-hidden rounded-2xl border border-border shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={industryImage(ind.k)}
                    alt={ind.k}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[var(--navy)] via-[var(--navy)]/45 to-transparent" />
                  <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-white backdrop-blur">
                    <IndustryIcon name={ind.k} className="h-5 w-5" />
                  </div>
                  <div className="absolute inset-x-4 bottom-4 text-white">
                    <p className="text-lg font-semibold leading-snug">{ind.k}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-white/80">{ind.v}</p>
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Process */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container py-16 md:py-20">
          <SectionHead eyebrow="How it works" title="How international employers hire from Pakistan" sub="A clear pathway from initial requirement through candidate deployment." />
          <Reveal delay={0.1}><div className="mt-10 max-w-3xl"><ProcessTimeline steps={PROCESS} /></div></Reveal>
        </div>
      </section>

      {/* Bulk */}
      <section className="container py-16 md:py-20">
        <SectionHead eyebrow="At scale" title="Bulk manpower recruitment for international projects" sub="Scalable recruitment across multiple occupational categories." />
        <Reveal delay={0.1}><div className="mt-8"><FeatureGrid columns={2} items={BULK.map((r) => ({ title: r.k, desc: r.v }))} /></div></Reveal>
      </section>

      {/* Markets */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container py-16 md:py-20">
          <SectionHead eyebrow="Where we deploy" title="International recruitment markets" sub="Subject to applicable recruitment permissions and destination-country requirements." />
          <Reveal delay={0.1}><div className="mt-8"><RegionMarkets regions={REGIONS} note="Destinations vary by active employer demand, recruitment permissions and destination-country requirements." /></div></Reveal>
        </div>
      </section>

      {/* Who we support */}
      <section className="container py-16 md:py-20">
        <SectionHead eyebrow="Our clients" title="Who we support" />
        <Reveal delay={0.1}><div className="mt-8"><FeatureGrid columns={3} items={SUPPORT.map((r) => ({ title: r.k, desc: r.v }))} /></div></Reveal>
      </section>

      {/* Why choose */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container py-16 md:py-20">
          <SectionHead eyebrow="Why us" title="Why international employers choose Falisha Manpower" sub="A recruitment partner managing sourcing, assessment, documentation, regulatory procedures and mobilization in a coordinated manner." />
          <Reveal delay={0.1}><div className="mt-8"><FeatureGrid columns={2} items={WHY.map((r) => ({ title: r.k, desc: r.v }))} /></div></Reveal>
        </div>
      </section>

      {/* Compliance */}
      <section className="container py-16 md:py-20">
        <SectionHead eyebrow="Compliance" title="Licences, certifications & regulatory compliance" sub="Falisha Manpower operates within Pakistan’s regulated overseas employment and corporate framework." />
        <Reveal delay={0.1}><div className="mt-8"><FeatureGrid columns={2} accent="gold" items={COMPLIANCE.map((r) => ({ title: r.k, desc: r.v }))} /></div></Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 rounded-2xl border border-border bg-card p-7 shadow-sm">
            <h3 className="text-lg font-semibold">Employer recruitment delegations in Pakistan</h3>
            <p className="mt-2 text-muted-foreground">
              International employers may conduct direct interviews, technical assessments and practical
              trade-testing campaigns in Pakistan. Our team coordinates candidate pre-screening, interview
              schedules, assessments, documentation and post-selection processing — so you retain direct control
              over evaluation and final selection within a structured recruitment framework.
            </p>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary/40">
        <div className="container py-16 md:py-20">
          <SectionHead eyebrow="FAQ" title="Frequently asked questions" />
          <Reveal delay={0.1}><div className="mt-8 max-w-3xl"><FAQAccordion items={FAQS} /></div></Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Ready to hire skilled manpower from Pakistan?</h2>
            <p className="mt-2 max-w-xl text-primary-foreground/80">
              Share your job titles, workforce quantities, qualifications, experience criteria, technical
              requirements, employment terms and deployment schedule, and our team will structure a sourcing,
              assessment and mobilization plan.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full"><Link href="/fill-a-vacancy">Request workforce</Link></Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full"><a href="https://wa.me/923303333335" target="_blank" rel="noopener noreferrer">WhatsApp us</a></Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Hire Skilled Manpower from Pakistan | Falisha Manpower',
    description:
      'BEOE-licensed (OEP 4035) employer-focused overseas recruitment from Pakistan — professional, engineering, technical, skilled and bulk manpower for the Gulf, Europe and beyond.',
  }
}
