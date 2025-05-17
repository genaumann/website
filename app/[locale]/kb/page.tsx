import {ArticleOverview} from '@/components/ui/article-overview'
import {getArticlesByLocale} from '@/lib/mdx'
import {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()

  return {
    title: `${t('app.name')} · ${t('kb.title.short')}`,
    description: t('kb.metadata.description')
  }
}

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
    <div className="container flex flex-col md:flex-row md:justify-start md:gap-x-5 h-full">
      <div className="md:basis-1/3 md:relative sticky top-[97px] md:top-0">
        <h1 className="text-5xl text-center md:text-start font-semibold md:sticky md:top-1/2 bg-background/75 md:bg-none backdrop-blur md:backdrop-blur-none py-4 md:py-0 w-full md:w-fit md:transform md:-translate-y-1/2">
          {t('common.knowledgebase')}
        </h1>
      </div>
      <div className="mx-auto md:basis-2/3 md:flex md:justify-center md:border-l md:border-muted md:border-dashed">
        <ArticleOverview articles={articles} />
      </div>
    </div>
  )
}
