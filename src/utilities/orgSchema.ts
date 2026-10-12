import { getServerSideURL } from './getURL'

// Site-wide JSON-LD: the organisation (an employment agency is a LocalBusiness
// subtype, so this one node satisfies Organization + LocalBusiness) plus a WebSite
// node with a search action. Rendered once in the (frontend) layout.
export function organizationSchema() {
  const url = getServerSideURL()
  const id = `${url}/#organization`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'EmploymentAgency'],
        '@id': id,
        name: 'Falisha Manpower',
        legalName: 'Falisha Manpower',
        url,
        logo: `${url}/icon.png`,
        image: `${url}/og-image.png`,
        description:
          'BEOE-licensed overseas recruitment agency in Pakistan (OEP Licence No. 4035) placing skilled, technical and professional Pakistani workers with employers across the Gulf, Türkiye, Europe and beyond — sourcing, screening, visas, attestation and mobilisation, end to end.',
        email: 'info@falishamanpower.com',
        telephone: '+92-330-3333335',
        address: {
          '@type': 'PostalAddress',
          streetAddress:
            'Umer Farooq Plaza, Offices 10, 11 & 12, First Floor, Murree Road, Chandni Chowk',
          addressLocality: 'Rawalpindi',
          addressRegion: 'Punjab',
          addressCountry: 'PK',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+92-330-3333335',
            email: 'info@falishamanpower.com',
            contactType: 'customer service',
            areaServed: 'PK',
            availableLanguage: ['en', 'ur'],
          },
        ],
        areaServed: [
          'Saudi Arabia',
          'United Arab Emirates',
          'Qatar',
          'Kuwait',
          'Oman',
          'Bahrain',
          'Türkiye',
          'Pakistan',
        ],
        knowsAbout: [
          'Overseas recruitment',
          'Manpower supply',
          'Work visa processing',
          'Document attestation',
          'Gulf employment',
        ],
        identifier: {
          '@type': 'PropertyValue',
          name: 'BEOE Overseas Employment Promoter Licence',
          value: 'OEP 4035',
        },
        sameAs: [
          'https://facebook.com/falishamanpower',
          'https://instagram.com/falishamanpower',
          'https://www.linkedin.com/company/111465919/',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url,
        name: 'Falisha Manpower',
        publisher: { '@id': id },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${url}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }
}
