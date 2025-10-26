'use client'

import {useTranslate} from '@tolgee/react'
import PortfolioProjectsMobileList from './projects/mobile-list'

export default function PortfolioProjectsPage() {
  const {t} = useTranslate()

  return (
    <section className="py-12 container" id="projects">
      <div className="flex flex-col gap-12 md:flex-row">
        <h2 className="text-4xl font-bold mb-6 text-center">
          {t('completedProjects')}
        </h2>
        <div className="grow">
          <PortfolioProjectsMobileList />
        </div>
      </div>
    </section>
  )
}
