'use server'

import fs from 'fs/promises'
import {compileMDX} from 'next-mdx-remote/rsc'
import {JSXElementConstructor, ReactElement} from 'react'
import articles from '@/lib/articleIndex.json'
import {Article, ArticleIndex, MDXFrontmatter} from './types'
import {LOCALES} from '@/locales'

type MDXReturnType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly content: ReactElement<any, string | JSXElementConstructor<any>>
  readonly frontmatter: MDXFrontmatter
  readonly createdAt: Article['createdAt']
  readonly updatedAt: Article['updatedAt']
  readonly author: Article['author']
}

export const findArticleBySlug = async (
  locale: string,
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

export const getParsedArticle = async (
  locale: string,
  kb: string[]
): Promise<MDXReturnType | null> => {
  try {
    const article = await findArticleBySlug(locale, kb.join('/'))
    if (!article) return null

    const articleSource = await fs.readFile(
      `${process.cwd()}/${article.path}`,
      'utf8'
    )
    const {content, frontmatter} = await compileMDX<MDXFrontmatter>({
      source: articleSource,
      options: {parseFrontmatter: true}
    })
    return {
      content,
      frontmatter,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      author: article.author
    }
  } catch {
    return null
  }
}

export const getArticlesByLocale = async (
  locale: string
): Promise<Article[]> => {
  const localeArticles = articles[locale as keyof typeof articles] || []
  return localeArticles.map(article => ({
    ...article,
    createdAt: new Date(article.createdAt),
    updatedAt: new Date(article.updatedAt),
    children: article.children?.map(child => ({
      ...child,
      createdAt: new Date(child.createdAt),
      updatedAt: new Date(child.updatedAt)
    }))
  })) as Article[]
}

export const getFlatArticleIndex = async (
  locale: keyof typeof LOCALES
): Promise<Article[]> => {
  const articleIndex = articles as unknown as ArticleIndex
  const localeArticles = articleIndex[locale] || []

  const flattenArticles = (items: Article[]): Article[] => {
    return items.reduce((flat: Article[], article: Article) => {
      const articleWithoutChildren = {...article}
      delete articleWithoutChildren.children
      return article.children
        ? [
            ...flat,
            articleWithoutChildren,
            ...flattenArticles(article.children)
          ]
        : [...flat, articleWithoutChildren]
    }, [])
  }

  return flattenArticles(localeArticles)
}
