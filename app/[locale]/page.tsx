import ContactSection from '@/components/sections/contact'
import Hero from '@/components/sections/hero'
import PortfolioSection from '@/components/sections/portfolio'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import getMetadata from '@/lib/metadata'
import {LOCALE_KEY} from '@/locales'
import {Metadata} from 'next'

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: LOCALE_KEY}>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslate('common', {noWrap: true})
  return getMetadata({
    title: t('appName'),
    description: t('appMetadata.description'),
    slug: '/',
    index: true,
    locale,
    og: {
      type: 'website',
      title: t('appName'),
      description: t('appMetadata.description')
    }
  })
}

export default async function Page() {
  return (
    <>
      <Hero />
      <PortfolioSection />
      <ContactSection />
    </>
  )
}
