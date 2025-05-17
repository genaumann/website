import {getFlatArticleIndex, getParsedArticle} from '@/lib/mdx'
import {LOCALE_KEY} from '@/locales'
import {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
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

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: LOCALE_KEY; kb: string[]}>
}): Promise<Metadata> {
  const {kb, locale} = await params
  const t = await getTranslations()
  const article = await getParsedArticle(locale, kb)
  if (!article) return {}

  return {
    title: `${t('app.name')} · ${t('kb.title.short')} · ${
      article.frontmatter.title
    }`,
    description: article.frontmatter.description
  }
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
