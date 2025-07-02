import PortfolioIntroPage from './intro'
import PortfolioStatsPage from './stats'
import PortfolioProjectsPage from './projects'
import '@/styles/swiper.css'
import PortfolioCertsPage from './certs'
import PortfolioTrainingsPage from './trainings'
import PortfolioAboutPage from './about'
import PortfolioOfferPage from './offer'
import PortfolioOfferBanner from './offer-banner'
import {Metadata} from 'next'
import getMetadata from '@/lib/metadata'
import ContactSection from '@/components/sections/contact'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {LocaleParam} from '@/lib/types'

export async function generateMetadata({
  params
}: {
  params: Promise<LocaleParam>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslate('portfolio', {noWrap: true})

  return getMetadata({
    title: t('portfolio', {ns: 'common'}),
    description: t('appMetadata.description'),
    slug: '/portfolio',
    index: true,
    locale,
    og: {
      type: 'website',
      title: t('portfolio', {ns: 'common'}),
      description: t('appMetadata.description')
    }
  })
}

export default async function Page() {
  return (
    <>
      <PortfolioIntroPage />
      <PortfolioAboutPage />
      <PortfolioStatsPage />
      <PortfolioOfferPage />
      <PortfolioOfferBanner />
      <PortfolioProjectsPage />
      <ContactSection className="py-12 bg-muted/20" />
      <PortfolioCertsPage />
      <PortfolioTrainingsPage />
    </>
  )
}
