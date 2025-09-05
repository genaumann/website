'use server'

import fs from 'fs/promises'
import {compileMDX} from 'next-mdx-remote/rsc'
import {JSXElementConstructor, ReactElement} from 'react'
import articles from '@/lib/articleIndex.json'
import {Article, ArticleIndex, Locale, MDXFrontmatter} from './types'
import remarkGfm from 'remark-gfm'
import remarkCodeBlock from './remark/codeblock'
import {findArticleBySlug} from './mdx-edge'
import {headers} from 'next/headers'
import {MDXComponents} from '@/components/mdx'
import {LOCALES} from '@/locales'

type MDXReturnType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly content: ReactElement<any, string | JSXElementConstructor<any>>
  readonly frontmatter: MDXFrontmatter
  readonly createdAt: Article['createdAt']
  readonly updatedAt: Article['updatedAt']
  readonly author: Article['author']
}

export const getParsedArticle = async (
  locale: Locale,
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
      components: MDXComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkCodeBlock]
        }
      }
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
  locale: Locale
): Promise<Article[]> => {
  const localeArticles = articles[locale as LOCALES] || []
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
  locale: Locale
): Promise<Article[]> => {
  const articleIndex = articles as unknown as ArticleIndex
  const localeArticles = articleIndex[locale as LOCALES] || []

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

export const getArticlesByKeyword = async (
  locale: Locale,
  keyword: string
): Promise<Article[] | null> => {
  const articlesByLocale = await getFlatArticleIndex(locale)
  if (!articlesByLocale) return null
  return articlesByLocale.filter(article => article.keywords?.includes(keyword))
}

export const getKBPath = async () => {
  const headersList = await headers()
  const fullpath = headersList.get('x-url') || ''

  return fullpath.replace(/^\/en/, '').split('/').slice(2).join('/')
}
