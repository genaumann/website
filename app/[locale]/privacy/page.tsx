import getMetadata from '@/lib/metadata'
import {getTranslations, LOCALE_KEY} from '@/locales'

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: LOCALE_KEY}>
}) {
  const {locale} = await params
  const t = await getTranslations()
  return getMetadata({
    title: t('privacy.title'),
    description: t('privacy.metadata.description'),
    slug: '/privacy',
    index: false,
    locale,
    og: {
      type: 'website',
      title: t('privacy.title'),
      description: t('privacy.metadata.description')
    }
  })
}

export default async function Page({
  params
}: {
  params: Promise<{locale: LOCALE_KEY}>
}) {
  const locale = (await params).locale
  const MDXPage = (await import(`./privacy_${locale}.mdx`)).default
  return (
    <div className="prose container">
      <MDXPage />
    </div>
  )
}
