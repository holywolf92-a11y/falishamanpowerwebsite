import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

// Candidate job applications submitted from the public site.
export const Applications: CollectionConfig<'applications'> = {
  slug: 'applications',
  labels: { singular: 'Application', plural: 'Applications' },
  access: {
    create: anyone, // public can submit
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'Recruitment',
    useAsTitle: 'name',
    defaultColumns: ['name', 'job', 'email', 'stage', 'createdAt'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    {
      name: 'job',
      type: 'relationship',
      relationTo: 'jobs',
      admin: { description: 'The vacancy this application is for.' },
    },
    { name: 'city', type: 'text' },
    { name: 'coverNote', type: 'textarea', label: 'Message / cover note' },
    {
      name: 'stage',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Shortlisted', value: 'shortlisted' },
        { label: 'Rejected', value: 'rejected' },
      ],
      access: {
        // Applicants can't set their own stage; staff manage it.
        create: () => false,
      },
      admin: { position: 'sidebar' },
    },
  ],
}
