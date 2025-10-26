import {getProjects} from '@/lib/projects'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import ProjectGrid from '@/components/ui/project-grid'

type TechnologyProjectsPageProps = {
  technology: string
  title: string
}

export default async function TechnologyProjectsPage({
  technology,
  title
}: TechnologyProjectsPageProps) {
  const t = await getTranslate('portfolio')
  const projects = getProjects().filter(project =>
    project.technologies.includes(technology)
  )

  if (!projects || projects.length === 0) return null

  return (
    <section className="py-10">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('projects')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('projectsDescription', {technology: title})}
          </p>
        </div>
        <ProjectGrid projects={projects} />
      </div>
    </section>
  )
}
