import {getTranslations} from 'next-intl/server'

export interface ExperienceItem {
  company: string
  position: string
  from: Date
  to?: Date
  description: string[]
  technologies: string[]
  companylogo?: string
  type: 'fulltime' | 'parttime'
}

export const getExperience = (
  t: Awaited<ReturnType<typeof getTranslations>>
): ExperienceItem[] => [
  {
    company: 'leasyro GmbH',
    position: 'DevSecOps Engineer',
    from: new Date('2024-10-01'),
    to: new Date('2025-04-30'),
    description: [
      t('experience.leasyro2.description1'),
      t('experience.leasyro2.description2'),
      t('experience.leasyro2.description3'),
      t('experience.leasyro2.description4')
    ],
    technologies: [
      'TypeScript',
      'React',
      'NextJS',
      'GitHub',
      'Intune',
      'Vercel',
      'Playwright',
      'Jest',
      'M365'
    ],
    companylogo:
      'https://1lvkqmjgr6rsf54k.public.blob.vercel-storage.com/assets/icon-uyCZ9OY2hoFm0OMQgLIpcmaQ8NgrtL.png',
    type: 'fulltime'
  },
  {
    company: 'leasyro GmbH',
    position: 'System Engineer',
    from: new Date('2024-01-01'),
    to: new Date('2024-09-30'),
    description: [
      t('experience.leasyro1.description1'),
      t('experience.leasyro1.description2')
    ],
    technologies: ['GitLab', 'Salt', 'Debian'],
    companylogo:
      'https://1lvkqmjgr6rsf54k.public.blob.vercel-storage.com/assets/icon-uyCZ9OY2hoFm0OMQgLIpcmaQ8NgrtL.png',
    type: 'parttime'
  },
  {
    company: 'SVA System Vertrieb Alexander GmbH',
    position: 'System Engineer',
    from: new Date('2023-04-01'),
    to: new Date('2024-09-30'),
    description: [
      t('experience.sva.description1'),
      t('experience.sva.description2'),
      t('experience.sva.description3'),
      t('experience.sva.description4')
    ],
    technologies: [
      'Salt',
      'Ansible',
      'GitLab',
      'Python',
      'Red Hat Enterprise Linux',
      'SUSE Manager',
      'Ansible Automation Platform'
    ],
    type: 'fulltime'
  },
  {
    company: 'Deutscher Diabetikerbund e.V.',
    position: 'Web Developer',
    from: new Date('2023-02-01'),
    to: new Date('2023-12-31'),
    description: [
      t('experience.ddb.description1'),
      t('experience.ddb.description2')
    ],
    technologies: ['WordPress', 'JavaScript', 'PHP', 'MySQL'],
    type: 'parttime'
  },
  {
    company: 'leasyro GmbH',
    position: 'System Engineer',
    from: new Date('2021-09-01'),
    to: new Date('2023-01-31'),
    description: [
      t('experience.leasyro0.description1'),
      t('experience.leasyro0.description2')
    ],
    technologies: ['GitLab', 'Salt', 'Debian', 'icinga2', 'Docker'],
    companylogo:
      'https://1lvkqmjgr6rsf54k.public.blob.vercel-storage.com/assets/icon-uyCZ9OY2hoFm0OMQgLIpcmaQ8NgrtL.png',
    type: 'parttime'
  },
  {
    company: 'Bundeskriminalamt',
    position: 'Linux Administrator',
    from: new Date('2021-09-01'),
    to: new Date('2023-03-30'),
    description: [
      t('experience.bka.description1'),
      t('experience.bka.description2'),
      t('experience.bka.description3')
    ],
    technologies: ['GitLab', 'Docker', 'Kubernetes', 'ArgoCD', 'MongoDB'],
    type: 'fulltime'
  },
  {
    company: 'Freie Universität Berlin - Universitätsbibliothek',
    position: 'System Administrator',
    from: new Date('2018-12-01'),
    to: new Date('2021-08-31'),
    description: [
      t('experience.fuub.description1'),
      t('experience.fuub.description2'),
      t('experience.fuub.description3'),
      t('experience.fuub.description4')
    ],
    technologies: [
      'ZenWorks',
      'Windows Client',
      'Linux',
      'GitLab',
      'Salt',
      'PHP'
    ],
    type: 'fulltime'
  },
  {
    company: 'Freie Universität Berlin - ZEDAT',
    position: 'System Administrator',
    from: new Date('2017-07-15'),
    to: new Date('2018-11-30'),
    description: [
      t('experience.fuzedat.description1'),
      t('experience.fuzedat.description2'),
      t('experience.fuzedat.description3')
    ],
    technologies: ['Mailman', 'icinga2', 'Debian', 'nagios', 'Perl'],
    type: 'fulltime'
  }
]
