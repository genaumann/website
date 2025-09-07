import articles from '@/lib/articleIndex.json'
import {Article, Locale} from './types'

export const findArticleBySlug = async (
  locale: Locale,
  slug: string
): Promise<Article | null> => {
  const localeArticles = articles[locale as keyof typeof articles]
  if (!localeArticles) return null

  const findInChildren = (items: Article[]): Article | null => {
    for (const article of items) {
      if (article.slug === slug || article.slug === `${slug}/index`) {
        return article
      }

      if (article.children?.length) {
        const found = findInChildren(article.children)
        if (found) return found
      }
    }
    return null
  }

  return findInChildren(localeArticles as unknown as Article[])
}

export const absoluteRelativePath = (path: string, currentPath: string) => {
  if (path.startsWith('/')) {
    const pathWithoutSlash = path.substring(1)
    if (pathWithoutSlash.split('/').length === 1) {
      return `${pathWithoutSlash}/index`
    }
    return pathWithoutSlash
  }

  return `${currentPath}/${path}`
}
