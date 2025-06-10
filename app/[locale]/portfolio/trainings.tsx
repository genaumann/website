import PortfolioTrainingSwiper from '@/components/ui/trainings'
import {getTranslations} from 'next-intl/server'

export default async function PortfolioTrainingsPage() {
  const t = await getTranslations('portfolio.trainings')
  return (
    <section className="py-12 md:container bg-muted/20" id="trainings">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <h2 className="text-4xl font-bold mb-12 text-center lg:self-center">
          {t('title')}
        </h2>
        <div className="max-w-full mx-auto lg:mx-0 block md:max-w-8/12">
          <PortfolioTrainingSwiper />
        </div>
      </div>
    </section>
  )
}
