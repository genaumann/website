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
  keywords?: string[]
}

export type MDXFrontmatter = {
  readonly title: string
  readonly description?: string
  readonly icon?: IconName
  readonly iconPrefix?: IconPrefix
  readonly keywords?: string[]
}

export type ArticleIndex = {
  -readonly [K in keyof typeof LOCALES]: Article[]
}

export type TType =
  | Awaited<ReturnType<typeof getTranslate>>
  | ReturnType<typeof useTranslate>['t']
