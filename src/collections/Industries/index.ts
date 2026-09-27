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

// Sectors (industries) and functions (professions) the agency recruits for.
export const Industries: CollectionConfig<'industries'> = {
  slug: 'industries',
  labels: { singular: 'Industry / Profession', plural: 'Industries & Professions' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: { title: true, slug: true, kind: true, icon: true },
  admin: {
    group: 'Recruitment',
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'industry',
      options: [
        { label: 'Industry / Sector', value: 'industry' },
        { label: 'Profession / Function', value: 'profession' },
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
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'summary',
              type: 'textarea',
              admin: { description: 'One or two lines used on cards and hub pages.' },
            },
            { name: 'content', type: 'richText' },
            {
              name: 'roles',
              type: 'array',
              labels: { singular: 'Role', plural: 'Typical Roles' },
              admin: { description: 'Example job titles recruited in this area.' },
              fields: [{ name: 'title', type: 'text', required: true }],
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
    slugField(),
  ],
  versions: {
    drafts: { autosave: { interval: 100 }, schedulePublish: true },
    maxPerDoc: 20,
  },
}
