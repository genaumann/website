import {getProjects} from '@/lib/projects'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import ProjectGrid from '@/components/ui/project-grid'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {Badge} from '@/components/ui/badge'

export default async function PortfolioProjectsPage() {
  const t = await getTranslate('portfolio')
  const completedProjects = getProjects().filter(project => project.end)
  if (completedProjects.length === 0) return null
  const maxProjects = 3

  return (
    <section className="py-12 container flex flex-col gap-6" id="projects">
      <div className="w-fit mx-auto relative">
        <h2 className="text-4xl font-bold">
          {t('completedProjects', {ns: 'common'})}
        </h2>
        <Badge
          variant="outline"
          className="absolute top-[-5px] right-[-32px] font-light text-xs px-1.5 border-muted">
          {maxProjects}/{completedProjects.length}
        </Badge>
      </div>
      <ProjectGrid projects={completedProjects.splice(0, maxProjects)} />
      <Link
        href="/portfolio/projects"
        className="text-center group font-oswald">
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
