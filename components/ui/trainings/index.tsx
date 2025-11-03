import {getTrainings} from '@/lib/trainings'
import {TrainingCard} from './card'
import {JSX} from 'react'
import PortfolioTrainingSwiperClient from './swiper'
import {getTranslate} from '@/lib/integrations/tolgee/server'

export type TrainingSlides = {
  id: string
  component: JSX.Element
}

export default async function PortfolioTrainingSwiper() {
  const t = await getTranslate('portfolio')
  const trainings = getTrainings({type: 'speaker', t, unique: true})

  const slides: TrainingSlides[] = trainings.map(training => ({
    id: training.id,
    component: <TrainingCard training={training} />
  }))

  return <PortfolioTrainingSwiperClient slides={slides} />
}
