import {getParsedArticle} from '@/lib/mdx'
import {notFound} from 'next/navigation'

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
