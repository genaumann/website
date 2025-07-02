import {IconName, IconPrefix} from '@/components/ui/icon'
import {TType} from './types'

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

export const tools = (t?: TType): Tool[] => [
  {
    name: 'TypeScript',
    icon: 'typescript',
    intro: t && t('techstack.typescript', {ns: 'portfolio'}),
    slug: 'typescript'
  },
  {
    name: 'React',
    icon: 'react',
    intro: t && t('techstack.react', {ns: 'portfolio'}),
    slug: 'react'
  },
  {
    name: 'Container',
    icon: 'podman',
    intro: t && t('techstack.container', {ns: 'portfolio'}),
    slug: 'container'
  },
  {
    name: 'Git',
    icon: 'git',
    intro: t && t('techstack.git', {ns: 'portfolio'}),
    slug: 'git',
    iconPrefix: 'fab'
  },
  {
    name: 'Python',
    icon: 'python',
    intro: t && t('techstack.python', {ns: 'portfolio'}),
    slug: 'python'
  },
  {
    name: 'Uyuni',
    icon: 'uyuni',
    intro: t && t('techstack.uyuni', {ns: 'portfolio'}),
    slug: 'uyuni'
  },
  {
    name: 'Salt',
    icon: 'salt',
    intro: t && t('techstack.salt', {ns: 'portfolio'}),
    slug: 'salt'
  },
  {
    name: 'GitLab',
    icon: 'gitlab',
    intro: t && t('techstack.gitlab', {ns: 'portfolio'}),
    slug: 'gitlab'
  },
  {
    name: 'Ansible',
    icon: 'ansible',
    intro: t && t('techstack.ansible', {ns: 'portfolio'}),
    slug: 'ansible'
  },
  {
    name: 'AWX',
    icon: 'awx',
    intro: t && t('techstack.awx', {ns: 'portfolio'}),
    slug: 'awx'
  },
  {
    name: 'GitHub',
    icon: 'github',
    iconPrefix: 'fab',
    intro: t && t('techstack.github', {ns: 'portfolio'}),
    slug: 'github'
  },
  {
    name: 'Linux',
    icon: 'tux',
    intro: t && t('techstack.linux', {ns: 'portfolio'}),
    slug: 'linux'
  },
  {
    name: 'Icinga2',
    icon: {dark: 'icingaDark', light: 'icinga'},
    intro: t && t('techstack.icinga2', {ns: 'portfolio'}),
    slug: 'icinga2'
  },
  {
    name: 'Playwright',
    icon: 'playwright',
    intro: t && t('techstack.playwright', {ns: 'portfolio'}),
    slug: 'playwright'
  },
  {
    name: 'Next.js',
    icon: {dark: 'nextjsDark', light: 'nextjs'},
    intro: t && t('techstack.nextjs', {ns: 'portfolio'}),
    slug: 'nextjs'
  }
]
