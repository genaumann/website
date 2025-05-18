import {getFlatArticleIndex, getParsedArticle} from '@/lib/mdx'
import {findArticleBySlug} from '@/lib/mdx-edge'
import getMetadata from '@/lib/metadata'
import {LOCALE_KEY} from '@/locales'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'

export async function generateStaticParams() {
  return [
    ...(await getFlatArticleIndex('de')).map(article => ({
      locale: 'de',
      kb: article.slug.replace(/\/index$/, '').split('/')
    })),
    ...(await getFlatArticleIndex('en')).map(article => ({
      locale: 'en',
      kb: article.slug.replace(/\/index$/, '').split('/')
    }))
  ]
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: LOCALE_KEY; kb: string[]}>
}): Promise<Metadata> {
  const {kb, locale} = await params
  const article = await findArticleBySlug(locale, kb.join('/'))
  if (!article) return {}

  return getMetadata({
    title: article.title,
    description: article.description || '',
    slug: `/kb/${kb.join('/')}`,
    index: true,
    locale,
    og: {
      type: 'article',
      title: article.title,
      description: article.description,
      slug: kb.join('/')
    }
  })
}

// 404 for unspecified articles
export const dynamicParams = false

export default async function Page({
  params
}: {
  params: Promise<{locale: LOCALE_KEY; kb: string[]}>
}) {
  const {kb, locale} = await params
  const article = await getParsedArticle(locale, kb)
  if (!article) notFound()

  return article.content
}
