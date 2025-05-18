import About from '@/components/sections/about'
import Certs from '@/components/sections/certs'
import Experience from '@/components/sections/experience'
import Hero from '@/components/sections/hero'
import getMetadata from '@/lib/metadata'
import {getTranslations, LOCALE_KEY} from '@/locales'
import {Metadata} from 'next'

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: LOCALE_KEY}>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations()
  return getMetadata({
    title: t('app.name'),
    description: t('app.metadata.description'),
    slug: '/',
    index: true,
    locale,
    og: {
      type: 'website',
      title: t('app.name'),
      description: t('app.metadata.description')
    }
  })
}

export default async function Page() {
  return (
    <>
      <Hero />
      <About />
      <Certs />
      <Experience />
    </>
  )
}
