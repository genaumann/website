import {getTranslate} from '@/lib/integrations/tolgee/server'
import ProjectsTable from './table'
import PortfolioProjectsMobileList from './mobile-list'
import getMetadata from '@/lib/metadata'
import {Metadata} from 'next'
import {LocaleParam} from '@/lib/types'

export async function generateMetadata({
  params
}: {
  params: Promise<LocaleParam>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslate('portfolio', {noWrap: true})
  return getMetadata({
    title: t('projects', {ns: 'common'}),
    description: t('appMetadata.description.projects'),
    slug: '/portfolio/projects',
    index: true,
    locale,
    og: {
      type: 'website',
      title: t('projects', {ns: 'common'}),
      description: t('appMetadata.description.projects')
    }
  })
}

export default async function ProjectsPage() {
  const t = await getTranslate('portfolio')
  return (
    <section className="container pb-12">
      <h1 className="text-5xl md:text-6xl font-bold py-12 text-center">
        {t('projects')}
      </h1>
      <div className="hidden md:block">
        <ProjectsTable />
      </div>
      <div className="block md:hidden">
        <PortfolioProjectsMobileList />
      </div>
    </section>
  )
}
