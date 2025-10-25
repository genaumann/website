import {getTranslate} from '@/lib/integrations/tolgee/server'
import ProjectsTable from './table'
import PortfolioProjectsMobileList from './mobile-list'

export default async function ProjectsPage() {
  const t = await getTranslate('portfolio')
  return (
    <section className="container pb-12">
      <h1 className="text-6xl font-bold py-12 text-center">{t('projects')}</h1>
      <div className="hidden md:block">
        <ProjectsTable />
      </div>
      <div className="block md:hidden">
        <PortfolioProjectsMobileList />
      </div>
    </section>
  )
}
