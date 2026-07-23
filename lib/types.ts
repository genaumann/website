import {CustomIconName} from '@/components/icons'
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
  icon?: CustomIconName
  children?: Article[]
  remoteRepo?: string
  keywords?: string[]
}

export type MDXFrontmatter = {
  readonly title: string
  readonly description?: string
  readonly icon?: CustomIconName
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
  cv?: boolean
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

type TechnologyIcon = {
  dark: CustomIconName
  light: CustomIconName
}

export type Technology = {
  name: string
  icon: CustomIconName | TechnologyIcon
  slug: string
  keywords?: string[]
  altNames?: string[]
  intro: {
    [K in keyof typeof LOCALES]: string
  }
  category?: string
}
