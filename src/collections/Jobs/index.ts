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

// Live overseas vacancies. A job only appears on the public board when it is
// BOTH published AND status === 'open' — so closed/expired roles never show,
// the core problem seen on ditrc.com.
export const Jobs: CollectionConfig<'jobs'> = {
  slug: 'jobs',
  labels: { singular: 'Job', plural: 'Jobs' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    vacancyStatus: true,
    country: true,
    workplace: true,
    employmentType: true,
  },
  admin: {
    group: 'Recruitment',
    useAsTitle: 'title',
    defaultColumns: ['title', 'vacancyStatus', 'country', 'positions', 'deadline', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'country',
                  type: 'relationship',
                  relationTo: 'countries',
                  required: true,
                  admin: { width: '50%' },
                },
                { name: 'city', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'industry',
                  type: 'relationship',
                  relationTo: 'industries',
                  admin: { width: '50%' },
                },
                {
                  name: 'positions',
                  type: 'number',
                  min: 1,
                  defaultValue: 1,
                  admin: { width: '50%', description: 'Number of openings.' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'employmentType',
                  type: 'select',
                  defaultValue: 'full-time',
                  options: [
                    { label: 'Full-time', value: 'full-time' },
                    { label: 'Contract', value: 'contract' },
                    { label: 'Temporary', value: 'temporary' },
                  ],
                  admin: { width: '50%' },
                },
                {
                  name: 'workplace',
                  type: 'select',
                  defaultValue: 'on-site',
                  options: [
                    { label: 'On-site', value: 'on-site' },
                    { label: 'Hybrid', value: 'hybrid' },
                    { label: 'Remote', value: 'remote' },
                  ],
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Salary',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'salaryMin', type: 'number', admin: { width: '33%' } },
                    { name: 'salaryMax', type: 'number', admin: { width: '33%' } },
                    {
                      name: 'salaryCurrency',
                      type: 'select',
                      defaultValue: 'SAR',
                      options: ['SAR', 'AED', 'QAR', 'KWD', 'OMR', 'BHD', 'USD', 'PKR'].map((c) => ({
                        label: c,
                        value: c,
                      })),
                      admin: { width: '34%' },
                    },
                  ],
                },
                {
                  name: 'salaryPeriod',
                  type: 'select',
                  defaultValue: 'month',
                  options: [
                    { label: 'Per month', value: 'month' },
                    { label: 'Per year', value: 'year' },
                  ],
                },
              ],
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
              label: 'Job description',
            },
            {
              name: 'requirements',
              type: 'array',
              labels: { singular: 'Requirement', plural: 'Requirements' },
              fields: [{ name: 'item', type: 'text', required: true }],
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
    {
      name: 'vacancyStatus',
      type: 'select',
      required: true,
      defaultValue: 'open',
      options: [
        { label: 'Open — accepting applications', value: 'open' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Only OPEN + published jobs appear on the public board.',
      },
    },
    {
      name: 'deadline',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
        description: 'After this date the job auto-closes on save.',
      },
    },
    {
      name: 'applyEmail',
      type: 'email',
      defaultValue: 'careers@falishamanpower.com',
      admin: { position: 'sidebar' },
    },
    slugField(),
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-close once the deadline has passed.
        if (data?.deadline) {
          const deadline = new Date(data.deadline)
          if (!Number.isNaN(deadline.getTime()) && deadline.getTime() < Date.now()) {
            data.vacancyStatus = 'closed'
          }
        }
        return data
      },
    ],
  },
  versions: {
    drafts: { autosave: { interval: 100 }, schedulePublish: true },
    maxPerDoc: 30,
  },
}
