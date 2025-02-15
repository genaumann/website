import {ArticleOverview} from '@/components/ui/article-overview'
import {getArticlesByLocale} from '@/lib/mdx'
import {getTranslations} from 'next-intl/server'

export default async function Page({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  const articles = await getArticlesByLocale(locale)
  const t = await getTranslations()

  if (articles.length === 0) return null

  return (
    <div className="container flex flex-col md:flex-row md:justify-start md:gap-x-5">
      <h1 className="text-5xl text-center md:text-start font-semibold md:self-center md:basis-1/3 sticky md:static top-24 md:top-0 bg-background/75 md:bg-none backdrop-blur md:backdrop-blur-none py-4 md:py-0 w-full md:w-fit">
        {t('common.knowledgebase')}
      </h1>
      <div className="mx-auto md:basis-2/3 md:flex md:justify-center md:max-h-[calc(100vh-168px)] md:overflow-y-auto md:border md:border-muted md:rounded-lg">
        <ArticleOverview articles={articles} />
      </div>
    </div>
  )
}
