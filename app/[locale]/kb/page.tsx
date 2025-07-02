import {ArticleOverview} from '@/components/ui/article-overview'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {getArticlesByLocale} from '@/lib/mdx'
import getMetadata from '@/lib/metadata'
import {LocaleParam} from '@/lib/types'
import {Metadata} from 'next'

export async function generateMetadata({
  params
}: {
  params: Promise<LocaleParam>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslate('kb', {noWrap: true})

  return getMetadata({
    title: t('kb', {ns: 'common'}),
    description: t('appMetadata.description'),
    slug: '/kb',
    index: true,
    locale,
    og: {
      type: 'website',
      title: t('kb', {ns: 'common'}),
      description: t('appMetadata.description')
    }
  })
}

export default async function Page({params}: {params: Promise<LocaleParam>}) {
  const {locale} = await params
  const articles = await getArticlesByLocale(locale)
  const t = await getTranslate('kb')

  if (articles.length === 0) return null

  return (
    <div className="container flex flex-col md:flex-row md:justify-start md:gap-x-5 min-h-content md:h-content">
      <div className="md:basis-1/3 md:relative sticky top-[var(--header-height)] md:top-0">
        <div className="text-center md:text-start md:sticky md:top-1/2 bg-background/75 md:bg-none backdrop-blur md:backdrop-blur-none py-4 md:py-0 w-full md:w-fit md:transform md:-translate-y-1/2">
          <h1 className="text-5xl font-semibold ">{t('kb', {ns: 'common'})}</h1>
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
