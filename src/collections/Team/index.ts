import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

// Staff directory shown on the “Our Team” page.
export const Team: CollectionConfig<'team'> = {
  slug: 'team',
  labels: { singular: 'Team Member', plural: 'Team' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: { name: true, role: true, department: true, photo: true },
  admin: {
    group: 'Company',
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'department', 'order'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true, admin: { description: 'Job title.' } },
    {
      name: 'department',
      type: 'select',
      options: [
        { label: 'Business Development', value: 'business-development' },
        { label: 'Recruitment', value: 'recruitment' },
        { label: 'Processing', value: 'processing' },
        { label: 'Media & Marketing', value: 'media' },
        { label: 'Accounts & Finance', value: 'accounts' },
        { label: 'Management', value: 'management' },
      ],
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'linkedin', type: 'text', admin: { description: 'Full LinkedIn profile URL.' } },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
  ],
}
