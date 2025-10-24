import {getTranslate} from '@/lib/integrations/tolgee/server'
import ProjectsTable from './table'

export default async function ProjectsPage() {
  const t = await getTranslate('portfolio')
  return (
    <section className="container">
      <h1 className="text-6xl font-bold py-12 text-center">{t('projects')}</h1>
      <ProjectsTable />
    </section>
  )
}
