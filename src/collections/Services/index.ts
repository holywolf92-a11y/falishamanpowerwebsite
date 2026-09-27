import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

// Recruitment and advisory services offered to employers.
export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: { title: true, slug: true, serviceType: true, icon: true, summary: true },
  admin: {
    group: 'Recruitment',
    useAsTitle: 'title',
    defaultColumns: ['title', 'serviceType', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'serviceType',
      type: 'select',
      required: true,
      defaultValue: 'recruitment',
      options: [
        { label: 'Recruitment', value: 'recruitment' },
        { label: 'Advisory', value: 'advisory' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show on the homepage “Core Services” grid.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'summary',
              type: 'textarea',
              admin: { description: 'Short description used on cards and the services grid.' },
            },
            { name: 'content', type: 'richText' },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    slugField(),
  ],
  versions: {
    drafts: { autosave: { interval: 100 }, schedulePublish: true },
    maxPerDoc: 20,
  },
}
