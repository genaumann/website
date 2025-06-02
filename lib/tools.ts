import {IconName, IconPrefix} from '@/components/ui/icon'
import {useTranslations} from 'next-intl'

// t = useTranslations('portfolio.tools')

type ToolIcon = {
  dark: IconName
  light: IconName
}

export type Tool = {
  name: string
  icon: IconName | ToolIcon
  iconPrefix?: IconPrefix
  intro: string
  slug: string
}

export const tools = (t: ReturnType<typeof useTranslations>): Tool[] => [
  {
    name: 'TypeScript',
    icon: 'typescript',
    intro: t('intro.typescript'),
    slug: 'typescript'
  },
  {
    name: 'React',
    icon: 'react',
    intro: t('intro.react'),
    slug: 'react'
  },
  {
    name: 'Container',
    icon: 'podman',
    intro: t('intro.container'),
    slug: 'container'
  },
  {
    name: 'Git',
    icon: 'git',
    intro: t('intro.git'),
    slug: 'git',
    iconPrefix: 'fab'
  },
  {
    name: 'Python',
    icon: 'python',
    intro: t('intro.python'),
    slug: 'python'
  },
  {
    name: 'Uyuni',
    icon: 'uyuni',
    intro: t('intro.uyuni'),
    slug: 'uyuni'
  },
  {
    name: 'Salt',
    icon: 'salt',
    intro: t('intro.salt'),
    slug: 'salt'
  },
  {
    name: 'GitLab',
    icon: 'gitlab',
    intro: t('intro.gitlab'),
    slug: 'gitlab'
  },
  {
    name: 'Ansible',
    icon: 'ansible',
    intro: t('intro.ansible'),
    slug: 'ansible'
  },
  {
    name: 'AWX',
    icon: 'awx',
    intro: t('intro.awx'),
    slug: 'awx'
  },
  {
    name: 'GitHub',
    icon: 'github',
    iconPrefix: 'fab',
    intro: t('intro.github'),
    slug: 'github'
  },
  {
    name: 'Linux',
    icon: 'tux',
    intro: t('intro.linux'),
    slug: 'linux'
  },
  {
    name: 'Icinga2',
    icon: {dark: 'icingaDark', light: 'icinga'},
    intro: t('intro.icinga2'),
    slug: 'icinga2'
  },
  {
    name: 'Playwright',
    icon: 'playwright',
    intro: t('intro.playwright'),
    slug: 'playwright'
  },
  {
    name: 'Next.js',
    icon: {dark: 'nextjsDark', light: 'nextjs'},
    intro: t('intro.nextjs'),
    slug: 'nextjs'
  }
]
