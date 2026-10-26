// Single source of truth for the Services area (/services, /services/[slug],
// header mega-menu, footer). Fully code-driven — like COUNTRY_CONTENT — so
// services render without a CMS record and new ones are added here, not in the
// admin. Each entry carries its list metadata (title/type/summary/image) AND
// the rich detail content (overview, what's-included, process, benefits, FAQs).
//
// Accuracy note: everything reflects how a Government of Pakistan–licensed
// Overseas Employment Promoter (OEP Licence No. 4035, BEOE-registered) actually
// delivers these services for Gulf, European and Asian employers. Real processes
// (Protector of Emigrants clearance, MOFA/HEC attestation, GCC work visas, WPS
// payroll) — no invented clients, project names, award figures or statistics.

const IMG = (id: string, w = 1000) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`

export type ServiceType = 'recruitment' | 'advisory'

export type ServiceEntry = {
  slug: string
  title: string
  serviceType: ServiceType
  summary: string // one line (cards, footer, meta fallback)
  image: string // hero photo
  tagline: string // hero subtitle
  overview: string[] // 1–2 paragraphs
  included: string[] // 5–6 things this service covers
  process: { t: string; d: string }[] // 4 service-specific steps
  benefits: string[] // 4–5 reasons to choose Falisha
  faqs: { q: string; a: string }[] // 4–5 service-specific Q&A
  metaTitle?: string
  metaDescription?: string
}

export const SERVICES: ServiceEntry[] = [
  // ───────────────────────── Recruitment ─────────────────────────
  {
    slug: 'bulk--mass-recruitment',
    title: 'Bulk & Mass Recruitment',
    serviceType: 'recruitment',
    summary: 'Source, screen and mobilise large workforces quickly and compliantly.',
    image: IMG('1759922378222-47ad736a174d'),
    tagline: 'Large, project-scale workforces — sourced, vetted and mobilised as one managed campaign.',
    overview: [
      'Bulk and mass recruitment is Falisha Manpower’s core strength: sourcing, screening and mobilising large numbers of skilled and semi-skilled workers for project-scale demand across the Gulf, Europe and Asia. Rather than filling one seat at a time, we run a high-volume campaign — trade tests, medicals, documentation and visas — as a single managed process, so you can staff an entire project or site from one accountable partner.',
      'With a nationwide sourcing network and offices in Rawalpindi (head office), Lahore, Karachi, Peshawar and AJK, we can scale a campaign quickly without cutting corners on vetting or BEOE compliance. Every worker is processed through Protector of Emigrants clearance under our OEP Licence No. 4035.',
    ],
    included: [
      'Workforce planning — roles, headcount, destination and timeline',
      'Nationwide sourcing from our standing candidate network',
      'On-site trade testing and practical skills assessment',
      'Batch medicals, documentation and visa processing',
      'Protector of Emigrants (POE/BEOE) clearance for every worker',
      'Phased, group mobilisation and travel',
    ],
    process: [
      { t: 'Scope the campaign', d: 'We agree the roles, numbers, destination, specifications and timeline, and set the sourcing plan.' },
      { t: 'Source & trade-test', d: 'Nationwide sourcing, pre-screening and practical trade tests to your (or your consultant’s) spec.' },
      { t: 'Select & process', d: 'You interview and select; we run medicals, documentation, attestation and visas in batches.' },
      { t: 'Mobilise in batches', d: 'POE clearance, ticketing and group travel — workers arrive on site, ready to work.' },
    ],
    benefits: [
      'One accountable partner for an entire project workforce',
      'Speed at volume — without skipping vetting or legal compliance',
      'Candidates trade-tested to employer and consultant specifications',
      'Fully BEOE-compliant, documented process (OEP 4035)',
      'Scales smoothly from a few dozen to several hundred workers',
    ],
    faqs: [
      { q: 'How many workers can you mobilise at once?', a: 'We regularly run campaigns from a few dozen to several hundred workers. Share the roles, numbers and timeline and we’ll confirm a realistic, phased plan.' },
      { q: 'How quickly can a bulk campaign move?', a: 'It depends on the roles, destination and visa procedures. We run documentation, medicals and visas in batches to compress the timeline, and give you a realistic schedule once the requirement is assessed.' },
      { q: 'Are the candidates trade-tested before we interview?', a: 'Yes. Practical trade tests and skills assessments are completed before shortlisting, so you only interview candidates who already meet the brief.' },
      { q: 'Is every worker processed legally?', a: 'Yes — every worker is cleared through Protector of Emigrants (BEOE) under our OEP Licence No. 4035, with documentation and attestation handled end to end.' },
      { q: 'Which destinations do you mobilise to?', a: 'Primarily the Gulf (Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain), plus Europe, Central Asia and beyond. See our Destinations for the full list.' },
    ],
    metaTitle: 'Bulk & Mass Recruitment Services in Pakistan | Falisha Manpower',
    metaDescription: 'High-volume manpower recruitment from Pakistan — source, trade-test and mobilise large workforces for Gulf, European and Asian projects. BEOE OEP 4035.',
  },

  {
    slug: 'permanent-recruitment',
    title: 'Permanent Recruitment',
    serviceType: 'recruitment',
    summary: 'End-to-end direct-hire placement of skilled and professional staff.',
    image: IMG('1522071820081-009f0129c71c'),
    tagline: 'Direct-hire placement of skilled and professional staff who stay and perform.',
    overview: [
      'Permanent recruitment is for roles you want to fill for the long term — skilled tradespeople, technicians, supervisors and professionals placed directly onto your payroll. We focus on fit as much as qualifications: the right experience, the right documents and a candidate who will settle into the role and the destination.',
      'As a BEOE-licensed Overseas Employment Promoter (OEP 4035) with 15+ years of experience, we manage the full journey — sourcing, screening, interviews, documentation, visas and mobilisation — so a permanent hire from Pakistan is as straightforward as a local one.',
    ],
    included: [
      'Role profiling and targeted, nationwide sourcing',
      'Experience, document and reference verification',
      'Shortlisting with in-person, video or proxy interviews',
      'Offer, contract and onboarding support',
      'Medicals, documentation, attestation and work visa',
      'Protector of Emigrants clearance and mobilisation',
    ],
    process: [
      { t: 'Define the role', d: 'We confirm the job profile, must-have skills, destination and package, and agree the sourcing plan.' },
      { t: 'Source & screen', d: 'Targeted sourcing from our network, with experience, documents and references verified.' },
      { t: 'Interview & select', d: 'You interview the shortlist in person, by video or by proxy, and select your hire.' },
      { t: 'Document & deploy', d: 'Offer, medicals, visa, attestation and POE clearance — then mobilisation to site.' },
    ],
    benefits: [
      'Candidates vetted for fit and longevity, not just paperwork',
      'Verified experience, documents and references before you interview',
      'End-to-end handling — from sourcing to arrival',
      'Access to a deep, nationwide Pakistani talent pool',
      'Fully compliant, BEOE-cleared placements (OEP 4035)',
    ],
    faqs: [
      { q: 'What roles do you place permanently?', a: 'Skilled trades, technicians, supervisors, engineers, healthcare, IT, finance, hospitality and management roles — see our Industries for the sectors we cover.' },
      { q: 'How are candidates screened?', a: 'We verify experience, qualifications, documents and references, and trade-test where relevant, before you interview and select.' },
      { q: 'Can we interview candidates ourselves?', a: 'Yes — in person at our offices, by video, or by proxy. We arrange and coordinate the interviews around your availability.' },
      { q: 'What if a hire doesn’t work out?', a: 'We work with you on replacement terms as part of the engagement; share your requirement and our team will confirm the specifics for your roles and destination.' },
      { q: 'How long does a permanent placement take?', a: 'It varies with the role, destination and visa procedure. We give you a realistic timeline once the requirement is assessed and keep you updated at each stage.' },
    ],
    metaTitle: 'Permanent Recruitment Services from Pakistan | Falisha Manpower',
    metaDescription: 'Direct-hire placement of skilled and professional staff from Pakistan for Gulf, European and Asian employers — vetted for fit, documents and longevity. BEOE OEP 4035.',
  },

  {
    slug: 'contract-recruitment',
    title: 'Contract Recruitment',
    serviceType: 'recruitment',
    summary: 'Flexible, fixed-term workforce for project peaks, seasonal demand and cover.',
    image: IMG('1504307651254-35680f356dfd'),
    tagline: 'The right people for a defined period — without a permanent commitment.',
    overview: [
      'Contract and temporary recruitment gives you the right people for a defined period — a project phase, a seasonal peak or cover for a gap — without a permanent commitment. We source, vet and deploy skilled and semi-skilled workers on fixed-term contracts, and handle the documentation, visas and compliance for the duration.',
      'As a BEOE-licensed promoter (OEP 4035), we keep contract deployments fully compliant with destination labour law and Pakistani emigration rules — so you get flexibility without legal exposure, and demobilisation is as clean as mobilisation.',
    ],
    included: [
      'Fixed-term workforce sourcing and vetting',
      'Trade testing to project specification',
      'Contract documentation and visa processing',
      'Protector of Emigrants (BEOE) clearance',
      'Mobilisation and, where needed, repatriation',
      'Compliance management for the contract duration',
    ],
    process: [
      { t: 'Define the need', d: 'Roles, numbers, contract length and destination — we scope the fixed-term requirement.' },
      { t: 'Source & trade-test', d: 'We source and trade-test suitable candidates to your project specification.' },
      { t: 'Deploy on contract', d: 'Contract documentation, visas, POE clearance and travel — workers on site for the term.' },
      { t: 'Manage & demobilise', d: 'Compliance through the contract, then a clean demobilisation or repatriation at the end.' },
    ],
    benefits: [
      'Scale up (or down) without a permanent commitment',
      'The right skills for a precisely defined period',
      'Fully compliant fixed-term contracts (OEP 4035)',
      'Fast mobilisation for peaks, seasons and cover',
      'One partner from deployment through to demobilisation',
    ],
    faqs: [
      { q: 'How is this different from permanent recruitment?', a: 'Contract recruitment is fixed-term — for a project phase, season or cover — while permanent recruitment is a direct, open-ended hire onto your payroll.' },
      { q: 'How short or long can a contract be?', a: 'From a single project phase to multi-year assignments. Share the duration and we’ll structure the deployment and compliance around it.' },
      { q: 'Who handles visas and compliance for contractors?', a: 'We do — contract documentation, visas, Protector of Emigrants clearance and labour-law compliance for the full term.' },
      { q: 'Can we convert a contractor to permanent?', a: 'Yes. Many employers convert strong performers to permanent; we handle the change in status and documentation.' },
    ],
    metaTitle: 'Contract & Temporary Recruitment from Pakistan | Falisha Manpower',
    metaDescription: 'Flexible, fixed-term workforce from Pakistan for project peaks, seasons and cover — sourced, vetted and fully compliant for the contract duration. BEOE OEP 4035.',
  },

  {
    slug: 'executive-search',
    title: 'Executive Search',
    serviceType: 'recruitment',
    summary: 'Confidential search for senior and business-critical roles.',
    image: IMG('1556761175-b413da4baf72'),
    tagline: 'Confidential, mapped search for senior and business-critical roles.',
    overview: [
      'Executive search is a discreet, research-led service for the hires that matter most — country managers, department heads, senior engineers and specialists where a wrong appointment is costly. We map the market, approach passive candidates directly and present a tightly qualified shortlist, all handled confidentially.',
      'Backed by 15+ years in overseas recruitment and a BEOE licence (OEP 4035), we combine senior-level assessment with the full mobilisation machinery — so the person you select is also the person who arrives, documented and deployment-ready.',
    ],
    included: [
      'Confidential role and market briefing',
      'Targeted market mapping and direct headhunting',
      'In-depth competency and leadership assessment',
      'Discreet referencing and credential verification',
      'A shortlist of qualified, genuinely interested candidates',
      'Offer management, visa, attestation and relocation',
    ],
    process: [
      { t: 'Confidential brief', d: 'We agree the mandate, success profile, package and confidentiality boundaries up front.' },
      { t: 'Map & approach', d: 'We map the market and approach suitable passive candidates directly and discreetly.' },
      { t: 'Assess & shortlist', d: 'Competency, leadership and reference checks; you meet a short, qualified list.' },
      { t: 'Secure & relocate', d: 'Offer negotiation, visa, attestation and relocation support through to arrival.' },
    ],
    benefits: [
      'Discretion — the search and your vacancy stay confidential',
      'Reach into passive candidates who aren’t applying openly',
      'Rigorous, senior-level assessment and referencing',
      'A short, decision-ready shortlist, not a pile of CVs',
      'Full relocation and documentation handled in-house',
    ],
    faqs: [
      { q: 'What makes this different from standard recruitment?', a: 'Executive search is proactive and confidential — we map the market and approach specific individuals rather than advertising, and assess for leadership and fit, not just qualifications.' },
      { q: 'Is the search kept confidential?', a: 'Yes. We agree confidentiality boundaries at the briefing and approach candidates discreetly, protecting both your organisation and the candidates.' },
      { q: 'What levels do you search for?', a: 'Senior and business-critical roles — country and general managers, department and functional heads, principal engineers and specialist leadership positions.' },
      { q: 'Do you handle the move, not just the hire?', a: 'Yes — offer management, work visa, document attestation and relocation are handled end to end, so your selected executive arrives ready to start.' },
    ],
    metaTitle: 'Executive Search & Headhunting from Pakistan | Falisha Manpower',
    metaDescription: 'Confidential executive search for senior and business-critical roles — market mapping, direct headhunting, assessment and relocation. BEOE OEP 4035.',
  },

  {
    slug: 'staffing-solutions',
    title: 'Staffing Solutions',
    serviceType: 'recruitment',
    summary: 'A managed, flexible workforce you can scale with demand.',
    image: IMG('1521737604893-d14cc237f11d'),
    tagline: 'A managed, flexible workforce layer you can scale up or down as demand moves.',
    overview: [
      'Staffing solutions is for employers who need an ongoing, flexible workforce rather than one-off hires — a managed pool of qualified people you can scale up or down as demand moves. We run the sourcing, screening and deployment pipeline continuously, so you always have vetted workers ready without carrying the full recruitment overhead in-house.',
      'Backed by a nationwide network and a BEOE licence (OEP 4035), we deliver staffing as a continuous, compliant service across skilled, semi-skilled and professional roles — one accountable partner for your whole flexible workforce.',
    ],
    included: [
      'Ongoing workforce planning and forecasting',
      'A managed, pre-vetted candidate pipeline',
      'Rapid replacement and scale-up',
      'Documentation, visas and POE clearance',
      'Compliance and workforce record-keeping',
      'A single point of accountability',
    ],
    process: [
      { t: 'Plan the pipeline', d: 'We agree the roles, volumes and cadence, and set up the ongoing sourcing plan.' },
      { t: 'Build the pool', d: 'Continuous sourcing and vetting keeps a ready pool of qualified candidates.' },
      { t: 'Deploy on demand', d: 'When you need people, we deploy fast from the pool — documented and compliant.' },
      { t: 'Manage & flex', d: 'We scale, replace and report as your demand changes, month to month.' },
    ],
    benefits: [
      'A flexible workforce layer that scales with you',
      'Qualified people ready when you need them',
      'Lower in-house recruitment overhead',
      'Continuous compliance and record-keeping',
      'One accountable partner for the whole pool',
    ],
    faqs: [
      { q: 'How is this different from bulk recruitment?', a: 'Bulk recruitment is a one-off high-volume campaign; staffing solutions is an ongoing, managed pipeline you draw from continuously as demand moves.' },
      { q: 'Can you scale the workforce up and down?', a: 'Yes — that’s the point. We flex the managed pool to your demand, adding or standing down workers as needed.' },
      { q: 'How fast can you replace or add staff?', a: 'Because the pipeline is always running, turnaround is faster than starting a fresh search each time.' },
      { q: 'Which roles does it cover?', a: 'Skilled, semi-skilled and professional roles across the sectors on our Industries page.' },
    ],
    metaTitle: 'Staffing Solutions & Managed Workforce from Pakistan | Falisha Manpower',
    metaDescription: 'A managed, flexible workforce from Pakistan you can scale with demand — continuous sourcing, vetting and compliant deployment. BEOE OEP 4035.',
  },

  {
    slug: 'global-mobility',
    title: 'Global Mobility',
    serviceType: 'recruitment',
    summary: 'Cross-border deployment with full immigration support.',
    image: IMG('1436491865332-7a61a109cc05'),
    tagline: 'Cross-border deployment with immigration, documentation and relocation handled end to end.',
    overview: [
      'Global mobility is about moving people across borders cleanly and compliantly. Whether you’re relocating a single specialist or deploying a team to a new country, we handle the immigration, documentation and logistics so your people — and your project — are compliant from day one.',
      'As a BEOE-licensed promoter (OEP 4035), we coordinate work permits, visas, attestation, medicals, Protector of Emigrants clearance and travel, keeping both employer and worker on the right side of every regulation across the Gulf, Europe and Asia.',
    ],
    included: [
      'Work-permit and visa strategy for the destination',
      'Document attestation and legalisation',
      'Medicals and pre-departure requirements',
      'Protector of Emigrants (BEOE) clearance',
      'Ticketing, travel and arrival coordination',
      'Compliance guidance for employer and employee',
    ],
    process: [
      { t: 'Assess the move', d: 'We confirm the destination, roles and timeline, and map the immigration route and requirements.' },
      { t: 'Prepare documents', d: 'Attestation, medicals and permit paperwork are prepared and legalised to the destination’s rules.' },
      { t: 'Secure the visa', d: 'Work permit and entry visa processing, with POE clearance for every deployee.' },
      { t: 'Relocate & settle', d: 'Ticketing, travel and arrival coordination so people land ready to work.' },
    ],
    benefits: [
      'One partner across immigration, documents and travel',
      'Compliance-first — no surprises at the border or on arrival',
      'Experience across Gulf, European and Asian immigration regimes',
      'Faster, cleaner moves for individuals or whole teams',
      'BEOE-cleared, fully documented deployments (OEP 4035)',
    ],
    faqs: [
      { q: 'What does global mobility cover?', a: 'The full cross-border move: work permits and visas, document attestation and legalisation, medicals, Protector of Emigrants clearance, and travel to the destination.' },
      { q: 'Can you move a whole team, not just one person?', a: 'Yes — from a single specialist to a full project team. We coordinate the paperwork and travel in a single, phased programme.' },
      { q: 'Which countries do you support?', a: 'The Gulf states, plus European and Asian destinations. Share your destination and we’ll confirm the exact route and requirements.' },
      { q: 'Who stays responsible for compliance?', a: 'We keep both employer and worker compliant with destination immigration and Pakistani emigration rules, and advise you at each step so there are no gaps.' },
    ],
    metaTitle: 'Global Mobility & Cross-Border Deployment | Falisha Manpower',
    metaDescription: 'Cross-border deployment from Pakistan — work permits, visas, attestation, medicals, POE clearance and relocation for individuals and teams. BEOE OEP 4035.',
  },

  // ───────────────────────── Advisory & Support ─────────────────────────
  {
    slug: 'document-attestation',
    title: 'Document Attestation',
    serviceType: 'advisory',
    summary: 'Degree, personal and commercial document attestation for Gulf employment.',
    image: IMG('1450101499163-c8848c66ca85'),
    tagline: 'Degree, personal and commercial document attestation — ready for Gulf employment.',
    overview: [
      'Before a visa is issued, Gulf employers and embassies require your documents to be attested and legalised through the correct chain — and a single missed step can delay a whole deployment. We manage attestation end to end: educational degrees, personal certificates and commercial documents, from the issuing authority through to the destination embassy.',
      'Our team knows the current requirements and sequence for each GCC country, so degrees, experience letters and certificates are legalised correctly the first time — keeping your recruitment timeline on track.',
    ],
    included: [
      'Educational degree and diploma attestation (incl. HEC)',
      'Personal documents — marriage, birth, police clearance',
      'Experience and employment letter attestation',
      'Commercial and company document legalisation',
      'Ministry of Foreign Affairs (MOFA) attestation',
      'Destination GCC embassy legalisation',
    ],
    process: [
      { t: 'Review & checklist', d: 'We confirm exactly which documents need attesting for your destination and role, and in what order.' },
      { t: 'Source verification', d: 'Degrees verified at source (e.g. HEC) and documents prepared for the attestation chain.' },
      { t: 'MOFA attestation', d: 'Documents attested by the Ministry of Foreign Affairs, Pakistan.' },
      { t: 'Embassy legalisation', d: 'Final legalisation at the destination country’s embassy — ready for the visa.' },
    ],
    benefits: [
      'The full chain handled — HEC/source → MOFA → embassy',
      'Current, country-specific requirements for each GCC state',
      'Done right the first time — no visa delays from rejected papers',
      'Educational, personal and commercial documents all covered',
      'Tracked and coordinated alongside your recruitment timeline',
    ],
    faqs: [
      { q: 'Which documents need attestation for the Gulf?', a: 'Typically educational degrees and diplomas, experience letters, and personal certificates (marriage, birth, police clearance). We give you an exact checklist for your destination and role.' },
      { q: 'What is the attestation chain?', a: 'Usually source verification (e.g. HEC for degrees) → Ministry of Foreign Affairs (MOFA) attestation → destination-country embassy legalisation. The exact sequence varies by document and country.' },
      { q: 'Can you attest degrees from any university?', a: 'We handle HEC-recognised Pakistani qualifications and coordinate verification; share your documents and we’ll confirm the route for each one.' },
      { q: 'How long does attestation take?', a: 'It depends on the document type, issuing authority and destination embassy workload. We sequence it to run alongside the rest of the recruitment process and keep you updated.' },
    ],
    metaTitle: 'Document Attestation Services in Pakistan for GCC | Falisha Manpower',
    metaDescription: 'Degree, personal and commercial document attestation in Pakistan for Gulf employment — HEC, MOFA and GCC embassy legalisation, handled end to end. BEOE OEP 4035.',
  },

  {
    slug: 'work-visa-processing',
    title: 'Work Visa Processing',
    serviceType: 'advisory',
    summary: 'Work, business and visit visa processing for the GCC.',
    image: IMG('1554224155-6726b3ff858f'),
    tagline: 'Work, business and visit visa processing for the GCC — accurate and on schedule.',
    overview: [
      'A visa error is one of the most common causes of deployment delay, so visa processing needs to be precise and current. We handle work, business and visit visa processing for the GCC — from the work permit and entry visa through to the paperwork each destination requires — keeping applications accurate and your timeline intact.',
      'As a BEOE-licensed promoter (OEP 4035), we align visa processing with document attestation, medicals and Protector of Emigrants clearance, so the visa is one coordinated part of a complete, compliant deployment.',
    ],
    included: [
      'Work (employment) visa processing',
      'Business and visit visa processing',
      'Work-permit and entry-visa coordination',
      'Supporting documentation and attestation alignment',
      'Medicals and pre-departure requirements',
      'Protector of Emigrants (BEOE) clearance',
    ],
    process: [
      { t: 'Confirm the route', d: 'We identify the correct visa type and requirements for the destination and role.' },
      { t: 'Prepare the file', d: 'Supporting documents, attestation and medicals are gathered and checked before submission.' },
      { t: 'Process the visa', d: 'The work permit and entry visa are processed and tracked to issue.' },
      { t: 'Clear & travel', d: 'POE clearance and pre-departure steps completed, ready for travel.' },
    ],
    benefits: [
      'Accurate applications — fewer rejections and delays',
      'Current GCC visa rules for each destination',
      'Visa, attestation and medicals coordinated as one process',
      'Clear status updates at each stage',
      'BEOE-compliant clearance for every deployee (OEP 4035)',
    ],
    faqs: [
      { q: 'Which visas do you process?', a: 'Work (employment) visas, plus business and visit visas for the GCC. We confirm the correct type for your destination and purpose.' },
      { q: 'Do you handle the documents behind the visa too?', a: 'Yes — document attestation, medicals and Protector of Emigrants clearance are coordinated alongside the visa so nothing holds it up.' },
      { q: 'Which countries do you cover?', a: 'The GCC states — Saudi Arabia, UAE, Qatar, Kuwait, Oman and Bahrain. Share your destination and we’ll confirm the exact requirements.' },
      { q: 'How long does visa processing take?', a: 'It depends on the destination, visa type and current authority processing times. We prepare the file correctly up front to avoid rejections and keep you updated to issue.' },
    ],
    metaTitle: 'Work Visa Processing Services for the GCC | Falisha Manpower',
    metaDescription: 'Work, business and visit visa processing from Pakistan for the GCC — permits, attestation, medicals and POE clearance, coordinated end to end. BEOE OEP 4035.',
  },

  {
    slug: 'hr-management',
    title: 'HR Management',
    serviceType: 'advisory',
    summary: 'Outsourced HR, compliance and workforce administration.',
    image: IMG('1600880292203-757bb62b4baf'),
    tagline: 'Outsourced HR, compliance and workforce administration for your overseas teams.',
    overview: [
      'Hiring the workforce is half the job — keeping it compliant and well-administered is the other half. Our HR management service takes on the administrative and compliance load for your deployed workforce: contracts, documentation, renewals and record-keeping aligned to destination labour law.',
      'For employers running teams in the Gulf without a full local HR function, we act as an extension of your HR — so contracts, visas and worker records stay current and compliant while you focus on the work.',
    ],
    included: [
      'Employment contracts aligned to local labour law',
      'Worker documentation and personnel records',
      'Visa, permit and Iqama renewal tracking',
      'Onboarding and offboarding administration',
      'Compliance and labour-law guidance',
      'Workforce reporting and record-keeping',
    ],
    process: [
      { t: 'Review your setup', d: 'We assess your workforce, contracts and current HR processes against the destination’s rules.' },
      { t: 'Standardise & document', d: 'Compliant contracts, records and onboarding/offboarding workflows are put in place.' },
      { t: 'Administer & track', d: 'We manage renewals, documentation and records so nothing lapses or falls out of compliance.' },
      { t: 'Report & advise', d: 'Regular reporting plus labour-law guidance as regulations and your team change.' },
    ],
    benefits: [
      'An extension of your HR without a full local team',
      'Contracts and records that hold up to labour-law scrutiny',
      'No missed visa, permit or Iqama renewals',
      'Consistent onboarding, offboarding and record-keeping',
      'Guidance that keeps pace with changing regulations',
    ],
    faqs: [
      { q: 'What does outsourced HR management cover?', a: 'Employment contracts, worker documentation and records, visa/permit/Iqama renewal tracking, onboarding and offboarding, compliance guidance and workforce reporting.' },
      { q: 'Is this only for workers you recruited?', a: 'No — we can administer your existing deployed workforce as well as new hires, and align their records and contracts to local requirements.' },
      { q: 'Which labour laws do you work to?', a: 'The labour law of the destination country (for example the Gulf states). We align contracts and processes to the rules that apply to your workforce.' },
      { q: 'How is this different from payroll outsourcing?', a: 'HR management covers contracts, compliance and administration; payroll outsourcing covers salary processing and WPS-compliant payments. Many employers use both together.' },
    ],
    metaTitle: 'HR Management & Workforce Administration | Falisha Manpower',
    metaDescription: 'Outsourced HR for overseas teams — compliant contracts, documentation, renewal tracking and labour-law guidance for your deployed workforce. BEOE OEP 4035.',
  },

  {
    slug: 'payroll-outsourcing',
    title: 'Payroll Outsourcing',
    serviceType: 'advisory',
    summary: 'Compliant, WPS-ready payroll for Middle East operations.',
    image: IMG('1526304640581-d334cdbbf45e'),
    tagline: 'Compliant, WPS-ready payroll for your Middle East workforce.',
    overview: [
      'Running payroll for a workforce in another country means getting salaries, deductions and statutory payments right every month — and, in much of the Gulf, paying through the Wage Protection System (WPS). Our payroll outsourcing service handles that cycle end to end, so your people are paid accurately, on time and in full compliance.',
      'Whether you have a handful of workers or a large deployed team, we take on payroll calculation, WPS-compliant disbursement and records, giving you clean reporting and one less operational burden to carry abroad.',
    ],
    included: [
      'Monthly payroll calculation and processing',
      'Wage Protection System (WPS)–compliant salary payments',
      'Deductions, allowances and end-of-service accruals',
      'Payslips and payroll records',
      'Statutory and compliance reporting',
      'Scalable processing for growing teams',
    ],
    process: [
      { t: 'Set up payroll', d: 'We capture your workforce, salary structure and the destination’s payroll and WPS rules.' },
      { t: 'Run the cycle', d: 'Monthly calculation of salaries, allowances, deductions and accruals — accurate and on time.' },
      { t: 'Pay via WPS', d: 'Compliant disbursement through the Wage Protection System where it applies, with payslips issued.' },
      { t: 'Report & reconcile', d: 'Clean payroll reporting and records for your finance and compliance teams.' },
    ],
    benefits: [
      'Accurate, on-time pay every cycle',
      'Full WPS compliance where the Gulf requires it',
      'End-of-service and statutory calculations handled',
      'Clear payslips, records and reporting',
      'Scales with your team without extra headcount',
    ],
    faqs: [
      { q: 'What is WPS and do you handle it?', a: 'The Wage Protection System is the electronic salary-transfer system mandated in much of the Gulf (UAE, Saudi Arabia, Qatar and others) to ensure workers are paid correctly. Yes — we process payroll in a WPS-compliant way where it applies.' },
      { q: 'How big a workforce can you run payroll for?', a: 'From a handful of workers to large deployed teams. The process scales without you adding payroll headcount.' },
      { q: 'What does payroll processing include?', a: 'Monthly salary calculation, allowances and deductions, end-of-service accruals, WPS-compliant payment, payslips, and reporting for your finance team.' },
      { q: 'Can we combine payroll with HR management?', a: 'Yes — many employers pair payroll outsourcing with our HR management service so contracts, compliance and pay are handled together.' },
    ],
    metaTitle: 'Payroll Outsourcing Services for the Middle East | Falisha Manpower',
    metaDescription: 'WPS-compliant payroll outsourcing for Gulf workforces — monthly processing, deductions, end-of-service and reporting, at any scale. BEOE OEP 4035.',
  },

  {
    slug: 'skills-development-training',
    title: 'Skills Development & Training',
    serviceType: 'advisory',
    summary: 'Pre-deployment training so workers arrive job-ready.',
    image: IMG('1509062522246-3755977927d7'),
    tagline: 'Pre-deployment training and skills development so workers arrive genuinely job-ready.',
    overview: [
      'Skills development and training prepares candidates before they travel — closing the gap between what they know and what the destination role and employer actually require. From trade-skill upgrades and safety awareness to orientation on the destination’s work culture and regulations, we help workers arrive genuinely job-ready.',
      'For employers, that means fewer surprises on site and fewer early returns; for workers, a safer, more successful placement. We align the training to the role, the sector and the destination.',
    ],
    included: [
      'Trade-skill assessment and upgrade',
      'Safety and site-awareness training',
      'Destination work-culture and regulation orientation',
      'Language and communication basics (where needed)',
      'Pre-departure briefing and readiness check',
      'Documentation and certification support',
    ],
    process: [
      { t: 'Assess the gap', d: 'We compare the candidate’s current skills against what the role and destination require.' },
      { t: 'Plan the training', d: 'A focused plan — trade skills, safety and destination orientation — built to the gap.' },
      { t: 'Deliver & certify', d: 'Training delivered, with certification or a readiness sign-off where appropriate.' },
      { t: 'Deploy job-ready', d: 'Workers travel prepared — safer on site and productive sooner.' },
    ],
    benefits: [
      'Workers arrive prepared, not learning on site',
      'Fewer safety incidents and early returns',
      'Training aligned to role, sector and destination',
      'Stronger, longer-lasting placements',
      'A smoother onboarding for employers',
    ],
    faqs: [
      { q: 'What kind of training do you provide?', a: 'Trade-skill upgrades, safety and site-awareness training, and orientation on the destination’s work culture and regulations.' },
      { q: 'Is training tailored to the role?', a: 'Yes — we assess the gap between the candidate’s current skills and the role’s requirements, and train to that.' },
      { q: 'Does this help with safety compliance?', a: 'Yes — safety and site-awareness training reduces incidents and helps workers meet site requirements from day one.' },
      { q: 'Do workers receive certificates?', a: 'Where the training carries a recognised certification we support that; otherwise workers receive a pre-departure briefing and a readiness sign-off.' },
    ],
    metaTitle: 'Skills Development & Pre-Deployment Training | Falisha Manpower',
    metaDescription: 'Pre-deployment training from Pakistan — trade-skill upgrades, safety awareness and destination orientation so workers arrive job-ready. BEOE OEP 4035.',
  },

  {
    slug: 'group-ticketing',
    title: 'Group Ticketing',
    serviceType: 'advisory',
    summary: 'Coordinated group travel and ticketing for your workforce.',
    image: IMG('1569154941061-e231b4725ef1'),
    tagline: 'Coordinated group travel and ticketing for your deployed workforce.',
    overview: [
      'Moving a workforce means moving people in groups, on schedule and within budget — and that’s a logistics job in its own right. Our group ticketing service coordinates flights and travel for your deployed workers, securing group fares, managing schedules and keeping mobilisation on track.',
      'Tied into our deployment process, ticketing is handled alongside visas and Protector of Emigrants clearance, so travel is one coordinated, on-time step rather than a last-minute scramble.',
    ],
    included: [
      'Group flight booking and fare negotiation',
      'Coordinated travel schedules',
      'Routing for multiple origin cities',
      'Alignment with visa and POE timelines',
      'Changes and rebooking management',
      'Arrival coordination',
    ],
    process: [
      { t: 'Plan the movement', d: 'We confirm numbers, dates and routes for the group departure.' },
      { t: 'Secure group fares', d: 'We negotiate and book group fares for better value than individual tickets.' },
      { t: 'Coordinate & confirm', d: 'Travel is aligned with visa and POE timelines, and itineraries confirmed.' },
      { t: 'Travel & arrive', d: 'We support the group through to arrival at the destination.' },
    ],
    benefits: [
      'Group fares — better value than individual bookings',
      'Travel aligned with visas and clearances',
      'One team managing schedules and changes',
      'On-time, coordinated mobilisation',
      'Less travel-logistics load on your side',
    ],
    faqs: [
      { q: 'Why use group ticketing instead of booking ourselves?', a: 'We secure group fares, coordinate schedules across many workers, and align travel with visa and Protector of Emigrants timelines so nothing slips.' },
      { q: 'Can you handle workers travelling from different cities?', a: 'Yes — we route multiple origin cities to the destination and coordinate the group’s arrival.' },
      { q: 'What if dates or visas change?', a: 'We manage changes and rebooking, and keep travel aligned with the rest of the deployment.' },
      { q: 'Is ticketing linked to the rest of the process?', a: 'Yes — it’s handled alongside visas and Protector of Emigrants clearance as one coordinated step.' },
    ],
    metaTitle: 'Group Ticketing & Workforce Travel from Pakistan | Falisha Manpower',
    metaDescription: 'Coordinated group travel and ticketing for deployed workforces — group fares, schedules and arrival, aligned with visas and POE clearance. BEOE OEP 4035.',
  },
]

export const SERVICE_BY_SLUG: Record<string, ServiceEntry> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
)

// Back-compat alias (older imports referenced SERVICE_DETAIL keyed by slug).
export const SERVICE_DETAIL = SERVICE_BY_SLUG
