import {getProjects} from '@/lib/projects'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import ProjectGrid from '@/components/ui/project-grid'
import {getTranslate} from '@/lib/integrations/tolgee/server'

export default async function PortfolioProjectsPage() {
  const t = await getTranslate('portfolio')
  const completedProjects = getProjects().filter(project => project.end)
  if (completedProjects.length === 0) return null

  return (
    <section className="py-12 container flex flex-col gap-6" id="projects">
      <h2 className="text-4xl font-bold text-center">
        {t('completedProjects', {ns: 'common'})}
      </h2>
      <ProjectGrid projects={completedProjects} />
      <Link href="/portfolio/projects" className="text-center group">
        <Button
          size="lg"
          className="group-hover:scale-125 transition-transform duration-300 ease-in-out">
          {t('allProjects')}
          <Icon name="arrow-right" />
        </Button>
      </Link>
    </section>
  )
}
