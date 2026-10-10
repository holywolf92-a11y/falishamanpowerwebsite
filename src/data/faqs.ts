// Shared FAQ content — consumed by the homepage FAQ teaser and the dedicated
// /faq page (and the FAQPage JSON-LD schema). Single source of truth.

export type FAQItem = { q: string; a: string }

export const FAQ_GROUPS: { title: string; items: FAQItem[] }[] = [
  {
    title: 'For candidates',
    items: [
      { q: 'How do I apply for an overseas job through Falisha Manpower?', a: 'Browse our current openings and apply online, or upload your CV to join our talent pool. Our team reviews your profile and contacts you when a suitable vacancy matches your skills and experience.' },
      { q: 'Which countries can I work in?', a: 'We place Pakistani professionals across the Gulf (Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain), Europe, Central Asia and beyond. See our Destinations page for the full list of markets we serve.' },
      { q: 'Do candidates have to pay fees to get a job?', a: 'Falisha Manpower operates within Pakistan’s regulated overseas employment framework. We never charge candidates unlawful or hidden fees — any applicable, lawful charges are disclosed transparently and in line with BEOE / Protector rules. Be cautious of anyone demanding large upfront payments.' },
      { q: 'What documents do I need to apply?', a: 'Typically a valid passport, an updated CV, and relevant trade / education certificates and experience letters. Requirements vary by role and destination country; our team tells you exactly what is needed for each position.' },
      { q: 'How can I get a job in Saudi Arabia or the UAE from Pakistan?', a: 'Apply through a licensed recruitment agency: submit your CV, get shortlisted for a matching vacancy, pass the interview and trade test, then complete medicals, visa and BEOE / Protector formalities before deployment. Browse our current Gulf openings or upload your CV to begin.' },
      { q: 'How do I register my CV with an overseas recruitment agency?', a: 'Use our Upload CV page to submit your details and documents. Your profile joins our talent pool and our team contacts you when a suitable overseas vacancy matches your experience.' },
      { q: 'How long does the recruitment and deployment process take?', a: 'Timelines depend on the role, destination country, visa procedures and workforce volume. Our team gives you a realistic estimate once your requirement or application is assessed.' },
    ],
  },
  {
    title: 'For employers',
    items: [
      { q: 'How can employers hire skilled workers from Pakistan?', a: 'Share your workforce requirement through our “Fill a Vacancy” form or contact our team. We source, screen and shortlist candidates, arrange interviews and trade tests, and manage documentation, visas and mobilisation end to end.' },
      { q: 'Can you handle bulk or large-scale recruitment?', a: 'Yes. We run structured recruitment campaigns for individual specialists, complete technical teams and large project workforces across multiple occupational categories.' },
      { q: 'Which industries and trades do you recruit for?', a: 'Construction, oil & gas, engineering, healthcare, IT & telecom, hospitality, transportation, agriculture, security, textile, power & energy and more — professional, skilled, semi-skilled and general manpower.' },
      { q: 'What happens after a candidate is selected?', a: 'Selected candidates proceed through documentation, medicals, visa processing, BEOE / Protector formalities, pre-departure orientation and deployment, according to the destination country’s requirements.' },
    ],
  },
  {
    title: 'Licensing, compliance & about us',
    items: [
      { q: 'Is Falisha Manpower a licensed recruitment agency?', a: 'Yes. Falisha Manpower is a BEOE-licensed Overseas Employment Promoter (OEP Licence No. 4035), authorised by the Bureau of Emigration & Overseas Employment, Government of Pakistan.' },
      { q: 'What is an Overseas Employment Promoter (OEP)?', a: 'An Overseas Employment Promoter is a recruitment agency licensed by Pakistan’s Bureau of Emigration & Overseas Employment (BEOE) to recruit and deploy Pakistani workers abroad. Falisha Manpower is a licensed OEP (Licence No. 4035).' },
      { q: 'How can I check whether a recruitment agency in Pakistan is licensed?', a: 'Ask for the agency’s OEP licence number and verify it against the BEOE’s register of licensed Overseas Employment Promoters at beoe.gov.pk. A licensed agency — like Falisha Manpower (OEP 4035) — follows the Protector of Emigrants process and never asks for unlawful fees.' },
      { q: 'Which is the best recruitment agency in Pakistan for overseas jobs?', a: 'Choose a BEOE-licensed Overseas Employment Promoter with a verifiable licence, a transparent process and a real track record of placements. Falisha Manpower is a BEOE-licensed OEP (No. 4035) placing skilled Pakistani workers across the Gulf, Europe and beyond.' },
      { q: 'What are the BEOE and the Protector of Emigrants?', a: 'The BEOE (Bureau of Emigration & Overseas Employment) regulates overseas recruitment in Pakistan, and the Protector of Emigrants clears workers for legal employment abroad. Falisha Manpower completes these formalities for every candidate it deploys.' },
      { q: 'Does Falisha Manpower recruit for Saudi Arabia, the UAE, Qatar and other Gulf countries?', a: 'Yes. The Gulf is our core market — we recruit for Saudi Arabia, the UAE, Qatar, Kuwait, Oman and Bahrain across construction, oil & gas, healthcare, hospitality, engineering and more.' },
    ],
  },
]

export const ALL_FAQS: FAQItem[] = FAQ_GROUPS.flatMap((g) => g.items)

// A shorter mix for the homepage teaser (full list lives on /faq).
export const HOME_FAQS: FAQItem[] = [
  FAQ_GROUPS[2].items[0], // Is Falisha Manpower licensed?
  FAQ_GROUPS[0].items[0], // How do I apply?
  FAQ_GROUPS[0].items[1], // Which countries?
  FAQ_GROUPS[0].items[2], // Fees?
  FAQ_GROUPS[0].items[4], // Job in Saudi/UAE?
  FAQ_GROUPS[1].items[0], // How can employers hire?
  FAQ_GROUPS[1].items[1], // Bulk recruitment?
  FAQ_GROUPS[2].items[3], // Best recruitment agency?
]

export const faqSchema = (items: FAQItem[] = ALL_FAQS) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})
