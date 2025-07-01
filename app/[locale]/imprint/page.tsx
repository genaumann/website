import {getTranslate} from '@/lib/integrations/tolgee/server'
import getMetadata from '@/lib/metadata'
import {LocaleParam} from '@/lib/types'

export async function generateMetadata({
  params
}: {
  params: Promise<LocaleParam>
}) {
  const {locale} = await params
  const t = await getTranslate('misc', {noWrap: true})
  return getMetadata({
    title: t('imprint', {ns: 'common'}),
    description: t('appMetadata.description.imprint'),
    slug: '/imprint',
    index: false,
    locale,
    og: {
      type: 'website',
      title: t('imprint', {ns: 'common'}),
      description: t('appMetadata.description.imprint')
    }
  })
}

export default async function Page({params}: {params: Promise<LocaleParam>}) {
  const locale = (await params).locale
  const MDXPage = (await import(`./imprint_${locale}.mdx`)).default
  return (
    <div className="prose container">
      <MDXPage />
    </div>
  )
}
