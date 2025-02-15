import {IconName, IconPrefix} from '@/components/ui/icon'

export interface Article {
  slug: string
  path: string
  title: string
  author: string
  createdAt: Date
  updatedAt: Date
  description?: string
  icon?: IconName
  iconPrefix?: IconPrefix
  children?: Article[]
}

export type MDXFrontmatter = {
  readonly title: string
  readonly description?: string
  readonly icon?: IconName
  readonly iconPrefix?: IconPrefix
}
