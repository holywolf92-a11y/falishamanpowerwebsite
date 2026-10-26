// Per-service editorial content for the service detail pages (/services/[slug]).
// Code-level so each service reads as genuinely distinct and substantial — a real
// overview, what the service actually covers, how we run it, why it matters and
// service-specific FAQs — instead of the one-line CMS boilerplate.
//
// Accuracy note: everything below reflects how a Government of Pakistan–licensed
// Overseas Employment Promoter (OEP Licence No. 4035, BEOE-registered) actually
// delivers these services for Gulf, European and Asian employers. Real processes
// (Protector of Emigrants clearance, MOFA/HEC attestation, GCC work visas, WPS
// payroll) — no invented clients, project names, award figures or statistics.

export type ServiceDetail = {
  tagline: string // short hero subtitle
  overview: string[] // 1–2 paragraphs unique to this service
  included: string[] // 5–6 things this service actually covers
  process: { t: string; d: string }[] // 4 service-specific steps
  benefits: string[] // 4–5 reasons to choose Falisha for this service
  faqs: { q: string; a: string }[] // 4–5 service-specific Q&A (with specifics)
  metaTitle?: string
  metaDescription?: string
}

export const SERVICE_DETAIL: Record<string, ServiceDetail> = {
  'bulk--mass-recruitment': {
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

  'permanent-recruitment': {
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

  'executive-search': {
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
      { t: 'Confidential brief', d: 'We agree the mandate, success profile, package and the confidentiality boundaries up front.' },
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

  'global-mobility': {
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

  'document-attestation': {
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

  'hr-management': {
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

  'payroll-outsourcing': {
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

  'work-visa-processing': {
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
}
