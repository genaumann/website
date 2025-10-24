import {IconName, IconPrefix} from '@/components/ui/icon'
import {LOCALES} from '@/locales'
import {getTranslate} from './integrations/tolgee/server'
import {useTranslate} from '@tolgee/react'

export interface Article {
  slug: string
  path: string
  title: string
  author: string
  createdAt: Date
  updatedAt: Date
  content: string
  description?: string
  icon?: IconName
  iconPrefix?: IconPrefix
  children?: Article[]
  remoteRepo?: string
  keywords?: string[]
}

export type MDXFrontmatter = {
  readonly title: string
  readonly description?: string
  readonly icon?: IconName
  readonly iconPrefix?: IconPrefix
  readonly keywords?: string[]
  readonly remoteRepo?: string
}

export type ArticleIndex = {
  -readonly [K in keyof typeof LOCALES]: Article[]
}

export type TType =
  | Awaited<ReturnType<typeof getTranslate>>
  | ReturnType<typeof useTranslate>['t']

export type LocaleParam = {
  locale: Locale
}

export type Locale = keyof typeof LOCALES | string

export type ProjectContext = 'personal' | 'work' | 'freelance'

export type Project = {
  id: string
  name: {
    [K in keyof typeof LOCALES]: string
  }
  technologies: string[]
  references?: {label?: string; url: string}[]
  context: ProjectContext
  start: Date
  end?: Date
  content: {
    [K in keyof typeof LOCALES]: {
      project_overview: string
      challenge: string
      goals?: string
      approach: string
      implementation?: string
      results?: string
      insights?: string
    }
  }
}
