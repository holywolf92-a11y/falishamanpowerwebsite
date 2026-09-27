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

// Destination markets where DITRC-style agencies place workers.
export const Countries: CollectionConfig<'countries'> = {
  slug: 'countries',
  labels: { singular: 'Country', plural: 'Countries' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    slug: true,
    region: true,
    flag: true,
  },
  admin: {
    group: 'Recruitment',
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'region',
      type: 'select',
      required: true,
      options: [
        { label: 'Gulf / GCC', value: 'gcc' },
        { label: 'Europe', value: 'europe' },
        { label: 'East Asia', value: 'east-asia' },
        { label: 'Southeast Asia', value: 'southeast-asia' },
        { label: 'MENA / North Africa', value: 'mena' },
        { label: 'Other', value: 'other' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'flag',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'intro',
              type: 'textarea',
              admin: { description: 'Short lead paragraph for the country landing page.' },
            },
            {
              name: 'content',
              type: 'richText',
            },
            {
              name: 'topSectors',
              type: 'relationship',
              relationTo: 'industries',
              hasMany: true,
            },
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
    slugField({ useAsSlug: 'name' }),
  ],
  versions: {
    drafts: { autosave: { interval: 100 }, schedulePublish: true },
    maxPerDoc: 20,
  },
}
