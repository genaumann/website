import PortfolioIntroPage from './intro'
import PortfolioStatsPage from './stats'
import PortfolioProjectsPage from './projects'
import '@/styles/swiper.css'
import PortfolioCertsPage from './certs'
import PortfolioTrainingsPage from './trainings'
import PortfolioAboutPage from './about'
import PortfolioOfferPage from './offer'
import PortfolioOfferBanner from './offer-banner'
import {getTranslations, LOCALE_KEY} from '@/locales'
import {Metadata} from 'next'
import getMetadata from '@/lib/metadata'
import ContactSection from '@/components/sections/contact'

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: LOCALE_KEY}>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations('portfolio.metadata')

  return getMetadata({
    title: t('title'),
    description: t('description'),
    slug: '/portfolio',
    index: true,
    locale,
    og: {
      type: 'website',
      title: t('title'),
      description: t('description')
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
