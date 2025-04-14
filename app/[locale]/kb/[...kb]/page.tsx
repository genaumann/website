import {getFlatArticleIndex, getParsedArticle} from '@/lib/mdx'
import {notFound} from 'next/navigation'

export async function generateStaticParams() {
  return [
    ...(await getFlatArticleIndex('de')).map(article => ({
      locale: 'de',
      kb: article.slug.split('/')
    })),
    ...(await getFlatArticleIndex('en')).map(article => ({
      locale: 'en',
      kb: article.slug.split('/')
    }))
  ]
}

// 404 for unspecified articles
export const dynamicParams = false

export default async function Page({
  params
}: {
  params: Promise<{locale: string; kb: string[]}>
}) {
  const {kb, locale} = await params
  const article = await getParsedArticle(locale, kb)
  if (!article) notFound()

  return article.content
}
