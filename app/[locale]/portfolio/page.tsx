import PortfolioIntroPage from './intro'
import PortfolioStatsPage from './stats'
import PortfolioProjectsPage from './projects'
import '@/styles/swiper.css'
import PortfolioCertsPage from './certs'

export default async function Page() {
  return (
    <>
      <PortfolioIntroPage />
      <PortfolioStatsPage />
      <PortfolioProjectsPage />
      <PortfolioCertsPage />
    </>
  )
}
