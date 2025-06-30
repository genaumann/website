'use client'

import PortfolioProjectSwiperSkeleton from '@/components/ui/projects/swiper-skeleton'
import {useTranslate} from '@tolgee/react'
import dynamic from 'next/dynamic'

export default function PortfolioProjectsPage() {
  const {t} = useTranslate()

  const PortfolioProjectSwiper = dynamic(
    () => import('@/components/ui/projects/swiper'),
    {
      ssr: false,
      loading: () => <PortfolioProjectSwiperSkeleton />
    }
  )

  return (
    <section className="py-12 container" id="projects">
      <div className="overflow-hidden">
        <h2 className="text-4xl font-bold mb-6 text-center">
          {t('completedProjects')}
        </h2>
        <PortfolioProjectSwiper />
      </div>
    </section>
  )
}
