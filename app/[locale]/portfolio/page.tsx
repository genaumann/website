import PortfolioIntroPage from './intro'
import PortfolioStatsPage from './stats'
import PortfolioProjectsPage from './projects'
import '@/styles/swiper.css'
import PortfolioCertsPage from './certs'
import PortfolioTrainingsPage from './trainings'
import PortfolioAboutPage from './about'

export default async function Page() {
  return (
    <>
      <PortfolioIntroPage />
      <PortfolioAboutPage />
      <PortfolioStatsPage />
      <PortfolioProjectsPage />
      <PortfolioCertsPage />
      <PortfolioTrainingsPage />
    </>
  )
}
