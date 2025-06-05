'use client'

import PortfolioProjectSwiperSkeleton from '@/components/ui/projects/swiper-skeleton'
import {useTranslations} from '@/locales'
import dynamic from 'next/dynamic'

export default function PortfolioProjectsPage() {
  const t = useTranslations('portfolio.projects')

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
        <h2 className="text-4xl font-bold mb-4 text-center">{t('title')}</h2>
        <PortfolioProjectSwiper />
      </div>
    </section>
  )
}
