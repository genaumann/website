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
  intro?: string
  slug: string
}

export const tools = (t?: ReturnType<typeof useTranslations>): Tool[] => [
  {
    name: 'TypeScript',
    icon: 'typescript',
    intro: t && t('intro.typescript'),
    slug: 'typescript'
  },
  {
    name: 'React',
    icon: 'react',
    intro: t && t('intro.react'),
    slug: 'react'
  },
  {
    name: 'Container',
    icon: 'podman',
    intro: t && t('intro.container'),
    slug: 'container'
  },
  {
    name: 'Git',
    icon: 'git',
    intro: t && t('intro.git'),
    slug: 'git',
    iconPrefix: 'fab'
  },
  {
    name: 'Python',
    icon: 'python',
    intro: t && t('intro.python'),
    slug: 'python'
  },
  {
    name: 'Uyuni',
    icon: 'uyuni',
    intro: t && t('intro.uyuni'),
    slug: 'uyuni'
  },
  {
    name: 'Salt',
    icon: 'salt',
    intro: t && t('intro.salt'),
    slug: 'salt'
  },
  {
    name: 'GitLab',
    icon: 'gitlab',
    intro: t && t('intro.gitlab'),
    slug: 'gitlab'
  },
  {
    name: 'Ansible',
    icon: 'ansible',
    intro: t && t('intro.ansible'),
    slug: 'ansible'
  },
  {
    name: 'AWX',
    icon: 'awx',
    intro: t && t('intro.awx'),
    slug: 'awx'
  },
  {
    name: 'GitHub',
    icon: 'github',
    iconPrefix: 'fab',
    intro: t && t('intro.github'),
    slug: 'github'
  },
  {
    name: 'Linux',
    icon: 'tux',
    intro: t && t('intro.linux'),
    slug: 'linux'
  },
  {
    name: 'Icinga2',
    icon: {dark: 'icingaDark', light: 'icinga'},
    intro: t && t('intro.icinga2'),
    slug: 'icinga2'
  },
  {
    name: 'Playwright',
    icon: 'playwright',
    intro: t && t('intro.playwright'),
    slug: 'playwright'
  },
  {
    name: 'Next.js',
    icon: {dark: 'nextjsDark', light: 'nextjs'},
    intro: t && t('intro.nextjs'),
    slug: 'nextjs'
  }
]
