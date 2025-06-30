import {getTrainings} from '@/lib/trainings'
import {TrainingCard} from './card'
import {JSX} from 'react'
import PortfolioTrainingSwiperClient from './swiper'

export type TrainingSlides = {
  id: string
  component: JSX.Element
}

export default async function PortfolioTrainingSwiper() {
  const trainings = await getTrainings({type: 'speaker'})

  const slides: TrainingSlides[] = trainings.map(training => ({
    id: training.id,
    component: <TrainingCard training={training} />
  }))

  return <PortfolioTrainingSwiperClient slides={slides} />
}
