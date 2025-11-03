import {getProjects} from '@/lib/projects'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import ProjectGrid from '@/components/ui/project-grid'
import {getTechnology, getTechnologies} from '@/lib/technologies'

type TechnologyProjectsPageProps = {
  technology: string
  title: string
}

export default async function TechnologyProjectsPage({
  technology,
  title
}: TechnologyProjectsPageProps) {
  const t = await getTranslate('portfolio')

  const currentTechnology = getTechnology(technology)

  const searchTerms = new Set<string>([
    technology,
    ...(currentTechnology?.altNames || [])
  ])

  const allTechnologies = getTechnologies()

  const projects = getProjects().filter(project => {
    const hasDirectMatch = project.technologies.some(tech =>
      searchTerms.has(tech)
    )

    const hasReverseMatch = project.technologies.some(projectTech => {
      const projectTechnology = allTechnologies.find(
        t => t.slug === projectTech || t.altNames?.includes(projectTech)
      )

      return (
        projectTechnology?.altNames?.some(altName =>
          searchTerms.has(altName)
        ) || false
      )
    })

    return hasDirectMatch || hasReverseMatch
  })

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
