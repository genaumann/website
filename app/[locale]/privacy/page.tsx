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
    title: t('privacy', {ns: 'common'}),
    description: t('appMetadata.description.privacy'),
    slug: '/privacy',
    index: false,
    locale,
    og: {
      type: 'website',
      title: t('privacy', {ns: 'common'}),
      description: t('appMetadata.description.privacy')
    }
  })
}

export default async function Page({params}: {params: Promise<LocaleParam>}) {
  const locale = (await params).locale
  const MDXPage = (await import(`./privacy_${locale}.mdx`)).default
  return (
    <div className="prose container">
      <MDXPage />
    </div>
  )
}
