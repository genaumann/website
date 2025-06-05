import {ArticleOverview} from '@/components/ui/article-overview'
import {getArticlesByLocale} from '@/lib/mdx'
import getMetadata from '@/lib/metadata'
import {LOCALE_KEY} from '@/locales'
import {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: LOCALE_KEY}>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations('kb.metadata')

  return getMetadata({
    title: t('title'),
    description: t('description'),
    slug: '/kb',
    index: true,
    locale,
    og: {
      type: 'website',
      title: t('title'),
      description: t('description')
    }
  })
}

export default async function Page({
  params
}: {
  params: Promise<{locale: LOCALE_KEY}>
}) {
  const {locale} = await params
  const articles = await getArticlesByLocale(locale)
  const t = await getTranslations('kb')

  if (articles.length === 0) return null

  return (
    <div className="container flex flex-col md:flex-row md:justify-start md:gap-x-5 h-full">
      <div className="md:basis-1/3 md:relative sticky top-[97px] md:top-0">
        <div className="text-center md:text-start md:sticky md:top-1/2 bg-background/75 md:bg-none backdrop-blur md:backdrop-blur-none py-4 md:py-0 w-full md:w-fit md:transform md:-translate-y-1/2">
          <h1 className="text-5xl font-semibold ">{t('title.long')}</h1>
          <p className="text-muted-foreground max-w-9/12 md:max-w-none mx-auto md:mx-0 text-sm mt-2">
            {t('description')}
          </p>
        </div>
      </div>
      <div className="mx-auto md:basis-2/3 md:flex md:justify-center md:border-l md:border-muted md:border-dashed">
        <ArticleOverview articles={articles} />
      </div>
    </div>
  )
}
