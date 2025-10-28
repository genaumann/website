import {IconName, IconPrefix} from '@/components/ui/icon'
import {TType} from './types'

type TrainingType = 'participant' | 'speaker'

export type Training = {
  id: string
  name?: string
  description?: string
  iconName: IconName
  iconPrefix?: IconPrefix
  type: TrainingType
  date: Date
  days: number
  technologies: string[]
}

type TrainingProps = {
  technology?: string
  type?: TrainingType
  t?: TType
  unique?: boolean
}

export const getTrainings = ({
  technology,
  type,
  t,
  unique = false
}: TrainingProps): Training[] => {
  const trainings: Training[] = [
    {
      id: 'linux-debian',
      name: t && t('trainings.linux.debian.name'),
      description: t && t('trainings.linux.debian.description'),
      type: 'speaker',
      date: new Date('2016-02-01'),
      iconName: 'tux',
      days: 10,
      technologies: ['linux']
    },
    {
      id: 'linux-debian',
      name: t && t('trainings.linux.debian.name'),
      description: t && t('trainings.linux.debian.description'),
      type: 'speaker',
      date: new Date('2017-03-01'),
      iconName: 'tux',
      days: 10,
      technologies: ['linux']
    },
    {
      id: 'linux-centos',
      name: t && t('trainings.linux.centos.name'),
      description: t && t('trainings.linux.centos.description'),
      type: 'speaker',
      date: new Date('2017-06-01'),
      iconName: 'tux',
      days: 5,
      technologies: ['linux']
    },
    {
      id: 'linux-debian',
      name: t && t('trainings.linux.debian.name'),
      description: t && t('trainings.linux.debian.description'),
      type: 'speaker',
      date: new Date('2018-03-01'),
      iconName: 'tux',
      days: 10,
      technologies: ['linux']
    },
    {
      id: 'linux-debian',
      name: t && t('trainings.linux.debian.name'),
      description: t && t('trainings.linux.debian.description'),
      type: 'speaker',
      date: new Date('2019-04-01'),
      iconName: 'tux',
      days: 10,
      technologies: ['linux']
    },
    {
      id: 'linux-debian',
      name: t && t('trainings.linux.debian.name'),
      description: t && t('trainings.linux.debian.description'),
      type: 'speaker',
      date: new Date('2020-03-01'),
      iconName: 'tux',
      days: 10,
      technologies: ['linux']
    },
    {
      id: 'gitlab',
      name: t && t('trainings.gitlab.name'),
      description: t && t('trainings.gitlab.description'),
      type: 'speaker',
      date: new Date('2024-02-01'),
      iconName: 'gitlab',
      days: 2,
      technologies: ['gitlab']
    },
    {
      id: 'gitlab',
      name: t && t('trainings.gitlab.name'),
      description: t && t('trainings.gitlab.description'),
      type: 'speaker',
      date: new Date('2024-05-1'),
      iconName: 'gitlab',
      days: 2,
      technologies: ['gitlab']
    },
    {
      id: 'gitlab',
      name: t && t('trainings.gitlab.name'),
      description: t && t('trainings.gitlab.description'),
      type: 'speaker',
      date: new Date('2024-08-1'),
      iconName: 'gitlab',
      days: 2,
      technologies: ['gitlab']
    },
    {
      id: 'gitlab',
      name: t && t('trainings.gitlab.name'),
      description: t && t('trainings.gitlab.description'),
      type: 'speaker',
      date: new Date('2024-09-01'),
      iconName: 'gitlab',
      days: 2,
      technologies: ['gitlab']
    },
    {
      id: 'git',
      name: t && t('trainings.git.name'),
      description: t && t('trainings.git.description'),
      type: 'speaker',
      date: new Date('2023-06-01'),
      iconName: 'git',
      iconPrefix: 'fab',
      days: 2,
      technologies: ['git']
    },
    {
      id: 'git',
      name: t && t('trainings.git.name'),
      description: t && t('trainings.git.description'),
      type: 'speaker',
      date: new Date('2024-06-01'),
      iconName: 'git',
      iconPrefix: 'fab',
      days: 2,
      technologies: ['git']
    }
  ]

  const filtered = trainings.filter(training => {
    const matchesTechnology =
      !technology || training.technologies.includes(technology)
    const matchesType = !type || training.type === type
    return matchesTechnology && matchesType
  })

  let result = filtered

  if (unique) {
    result = Object.values(
      filtered.reduce<Record<string, Training>>((acc, training) => {
        if (!acc[training.id] || training.date < acc[training.id].date) {
          acc[training.id] = training
        }
        return acc
      }, {})
    )
  }

  return result.sort((a, b) => b.date.getTime() - a.date.getTime())
}
