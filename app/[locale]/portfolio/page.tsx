import PortfolioIntroPage from './intro'
import PortfolioStatsPage from './stats'
import PortfolioProjectsPage from './projects'
import '@/styles/swiper.css'
import PortfolioCertsPage from './certs'
import PortfolioTrainingsPage from './trainings'
import PortfolioAboutPage from './about'
import PortfolioOfferPage from './offer'
import PortfolioOfferBanner from './offer-banner'

export default async function Page() {
  return (
    <>
      <PortfolioIntroPage />
      <PortfolioAboutPage />
      <PortfolioStatsPage />
      <PortfolioOfferPage />
      <PortfolioOfferBanner />
      <PortfolioProjectsPage />
      <PortfolioCertsPage />
      <PortfolioTrainingsPage />
    </>
  )
}
