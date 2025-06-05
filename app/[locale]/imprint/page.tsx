import getMetadata from '@/lib/metadata'
import {getTranslations, LOCALE_KEY} from '@/locales'

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: LOCALE_KEY}>
}) {
  const {locale} = await params
  const t = await getTranslations('imprint.metadata')
  return getMetadata({
    title: t('title'),
    description: t('description'),
    slug: '/imprint',
    index: false,
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
  const locale = (await params).locale
  const MDXPage = (await import(`./imprint_${locale}.mdx`)).default
  return (
    <div className="prose container">
      <MDXPage />
    </div>
  )
}
