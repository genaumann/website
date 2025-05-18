import articles from '@/lib/articleIndex.json'
import {Article} from './types'
import {LOCALE_KEY} from '@/locales'

export const findArticleBySlug = async (
  locale: LOCALE_KEY,
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
