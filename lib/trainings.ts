import {IconName, IconPrefix} from '@/components/ui/icon'
import {useTranslations} from 'next-intl'

type TrainingType = 'participant' | 'speaker'

export type Training = {
  id: string
  name: string
  description: string
  iconName: IconName
  iconPrefix?: IconPrefix
  type: TrainingType
  date: Date
  days: number
  technologies: string[]
}

type TrainingProps = {
  t: ReturnType<typeof useTranslations>
  technology?: string
  type?: TrainingType
}

// const t = useTranslations('portfolio.trainings')

export const getTrainings = ({
  t,
  technology,
  type
}: TrainingProps): Training[] => {
  const trainings: Training[] = [
    {
      id: 'linux-debian-2016',
      name: t('linux.debian.name'),
      description: t('linux.debian.description'),
      type: 'speaker',
      date: new Date('2016-02-01'),
      iconName: 'tux',
      days: 10,
      technologies: ['linux']
    },
    {
      id: 'linux-debian-2017',
      name: t('linux.debian.name'),
      description: t('linux.debian.description'),
      type: 'speaker',
      date: new Date('2017-03-01'),
      iconName: 'tux',
      days: 10,
      technologies: ['linux']
    },
    {
      id: 'linux-centos-2017-2',
      name: t('linux.centos.name'),
      description: t('linux.centos.description'),
      type: 'speaker',
      date: new Date('2017-06-01'),
      iconName: 'tux',
      days: 5,
      technologies: ['linux']
    },
    {
      id: 'linux-debian-2018',
      name: t('linux.debian.name'),
      description: t('linux.debian.description'),
      type: 'speaker',
      date: new Date('2018-03-01'),
      iconName: 'tux',
      days: 10,
      technologies: ['linux']
    },
    {
      id: 'linux-debian-2019',
      name: t('linux.debian.name'),
      description: t('linux.debian.description'),
      type: 'speaker',
      date: new Date('2019-04-01'),
      iconName: 'tux',
      days: 10,
      technologies: ['linux']
    },
    {
      id: 'linux-debian-2020',
      name: t('linux.debian.name'),
      description: t('linux.debian.description'),
      type: 'speaker',
      date: new Date('2020-03-01'),
      iconName: 'tux',
      days: 10,
      technologies: ['linux']
    },
    {
      id: 'gitlab-2024-1',
      name: t('gitlab.name'),
      description: t('gitlab.description'),
      type: 'speaker',
      date: new Date('2024-02-01'),
      iconName: 'gitlab',
      days: 2,
      technologies: ['gitlab']
    },
    {
      id: 'gitlab-2024-2',
      name: t('gitlab.name'),
      description: t('gitlab.description'),
      type: 'speaker',
      date: new Date('2024-05-1'),
      iconName: 'gitlab',
      days: 2,
      technologies: ['gitlab']
    },
    {
      id: 'gitlab-2024-3',
      name: t('gitlab.name'),
      description: t('gitlab.description'),
      type: 'speaker',
      date: new Date('2024-08-1'),
      iconName: 'gitlab',
      days: 2,
      technologies: ['gitlab']
    },
    {
      id: 'gitlab-2024-4',
      name: t('gitlab.name'),
      description: t('gitlab.description'),
      type: 'speaker',
      date: new Date('2024-09-01'),
      iconName: 'gitlab',
      days: 2,
      technologies: ['gitlab']
    },
    {
      id: 'git-2023',
      name: t('git.name'),
      description: t('git.description'),
      type: 'speaker',
      date: new Date('2023-06-01'),
      iconName: 'git',
      iconPrefix: 'fab',
      days: 2,
      technologies: ['git']
    },
    {
      id: 'git-2024',
      name: t('git.name'),
      description: t('git.description'),
      type: 'speaker',
      date: new Date('2024-06-01'),
      iconName: 'git',
      iconPrefix: 'fab',
      days: 2,
      technologies: ['git']
    },
    {
      id: 'playwright-2024',
      name: t('playwright.name'),
      description: t('playwright.description'),
      type: 'participant',
      date: new Date('2024-11-01'),
      iconName: 'playwright',
      days: 2,
      technologies: ['playwright']
    }
  ]

  return trainings
    .filter(training => {
      const matchesTechnology =
        !technology || training.technologies.includes(technology)
      const matchesType = !type || training.type === type
      return matchesTechnology && matchesType
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}
