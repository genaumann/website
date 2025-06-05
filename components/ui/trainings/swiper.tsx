'use client'

import {Navigation, EffectCards} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import {useIsMobile} from '@/components/hooks/mobile'
import {TrainingSlides} from '.'

type PortfolioTraniningSwiperProps = {
  slides: TrainingSlides[]
}

export default function PortfolioTrainingSwiperClient({
  slides
}: PortfolioTraniningSwiperProps) {
  const isMobile = useIsMobile()

  return (
    <Swiper
      modules={[EffectCards, Navigation]}
      grabCursor={true}
      className="swiper-training"
      navigation={isMobile ? false : true}
      effect="cards"
      cardsEffect={{slideShadows: false}}>
      {slides.map(slide => (
        <SwiperSlide className="overflow-visible!" key={slide.id}>
          {slide.component}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
