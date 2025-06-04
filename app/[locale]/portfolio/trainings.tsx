import PortfolioTrainingSwiper from '@/components/ui/trainings/swiper'
import {getTranslations} from 'next-intl/server'

export default async function PortfolioTrainingsPage() {
  const t = await getTranslations('portfolio.trainings')
  return (
    <section className="py-12 container">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <h2 className="text-4xl font-bold mb-12 text-center lg:self-center">
          {t('title')}
        </h2>
        <div className="block lg:max-w-8/12">
          <PortfolioTrainingSwiper />
        </div>
      </div>
    </section>
  )
}
