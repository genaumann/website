'use client'

import {Badge} from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import {getDateFunctions} from '@/lib/dates'
import {LOCALE_KEY, LOCALES} from '@/locales'
import {useLocale, useTranslations} from 'next-intl'
import {Navigation, EffectCards} from 'swiper/modules'

import {Swiper, SwiperSlide} from 'swiper/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../card'
import {getTrainings} from '@/lib/trainings'
import {useIsMobile} from '@/components/hooks/mobile'

export default function PortfolioTrainingSwiper() {
  const locale = useLocale() as LOCALE_KEY
  const {format} = getDateFunctions(LOCALES[locale])
  const t = useTranslations('portfolio.trainings')
  const trainings = getTrainings({t, type: 'speaker'})
  const isMobile = useIsMobile()

  return (
    <Swiper
      modules={[EffectCards, Navigation]}
      grabCursor={true}
      className="swiper-training"
      navigation={isMobile ? false : true}
      effect="cards"
      cardsEffect={{slideShadows: false}}>
      {trainings.map(training => (
        <SwiperSlide className="overflow-visible!" key={training.id}>
          <Card className="max-w-9/12 md:max-w-2/3 mx-auto dark:shadow dark:shadow-primary">
            <CardHeader className="py-3">
              <div className="flex justify-between">
                <Icon
                  name={training.iconName}
                  prefix={training.iconPrefix}
                  className="text-4xl"
                />
                <Badge variant="secondary" className="gap-1">
                  <Icon name="calendar" />
                  {training.days > 1
                    ? t('days', {days: training.days})
                    : t('day')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 bg-background pt-4">
              <div className="space-y-2">
                <CardTitle className="text-2xl">{training.name}</CardTitle>
                <span className="flex gap-0.5 items-center">
                  <Icon name="calendar" />
                  {format(training.date, 'MMMM yyyy')}
                </span>
              </div>

              <CardDescription className="text-base">
                {training.description}
              </CardDescription>
            </CardContent>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
