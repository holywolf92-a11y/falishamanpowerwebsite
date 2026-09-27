import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

// Candidate / client reviews shown on the homepage and landing pages.
export const Testimonials: CollectionConfig<'testimonials'> = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: { name: true, quote: true, rating: true, photo: true },
  admin: {
    group: 'Company',
    useAsTitle: 'name',
    defaultColumns: ['name', 'roleOrCompany', 'rating', 'featured'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'roleOrCompany',
      type: 'text',
      admin: { description: 'e.g. “HR Manager, Acme Contracting” or “Placed in Riyadh”.' },
    },
    { name: 'quote', type: 'textarea', required: true },
    {
      name: 'rating',
      type: 'select',
      defaultValue: '5',
      options: ['5', '4', '3', '2', '1'].map((r) => ({ label: `${r} ★`, value: r })),
      admin: { position: 'sidebar' },
    },
    { name: 'photo', type: 'upload', relationTo: 'media', admin: { position: 'sidebar' } },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show on the homepage.' },
    },
  ],
}
