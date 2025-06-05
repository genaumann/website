import {getTrainings} from '@/lib/trainings'
import {getTranslations} from 'next-intl/server'
import {TrainingCard} from './card'
import {JSX} from 'react'
import PortfolioTrainingSwiperClient from './swiper'

export type TrainingSlides = {
  id: string
  component: JSX.Element
}

export default async function PortfolioTrainingSwiper() {
  const t = await getTranslations('portfolio.trainings')
  const trainings = getTrainings({t, type: 'speaker'})

  const slides: TrainingSlides[] = trainings.map(training => ({
    id: training.id,
    component: <TrainingCard training={training} />
  }))

  return <PortfolioTrainingSwiperClient slides={slides} />
}
