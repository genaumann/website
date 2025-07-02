import PortfolioTrainingSwiper from '@/components/ui/trainings'
import {getTranslate} from '@/lib/integrations/tolgee/server'

export default async function PortfolioTrainingsPage() {
  const t = await getTranslate('portfolio')
  return (
    <section className="py-12 bg-muted/20" id="trainings">
      <div className="md:container">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <h2 className="text-4xl font-bold mb-12 text-center lg:self-center">
            {t('trainings')}
          </h2>
          <div className="max-w-full mx-auto lg:mx-0 block md:max-w-8/12">
            <PortfolioTrainingSwiper />
          </div>
        </div>
      </div>
    </section>
  )
}
