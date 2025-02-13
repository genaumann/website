export interface Article {
  slug: string
  path: string
  title: string
  author: string
  createdAt: Date
  updatedAt: Date
  description?: string
  children?: Article[]
}

export type MDXFrontmatter = {
  readonly title: string
  readonly description?: string
}
