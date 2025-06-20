import {getTranslations} from 'next-intl/server'
import {getProjects, ProjectContext} from '../../../../../lib/projects'
import {getDateFunctions} from '@/lib/dates'
import {LOCALE_KEY, LOCALES} from '@/locales'
import {Badge} from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import {
  ProjectCard,
  ProjectCardDescription,
  ProjectCardInfo,
  ProjectCardInfoItem,
  ProjectCardInfoLabel,
  ProjectCardInfoValue,
  ProjectCardMain,
  ProjectCardReference,
  ProjectCardTitle,
  StatusBadge
} from '@/components/ui/project-card'

type ProjectContextObjects = Record<ProjectContext, string>

type TechnologyProjectsPageProps = {
  technology: string
  locale: LOCALE_KEY
  title: string
}

export default async function TechnologyProjectsPage({
  technology,
  locale,
  title
}: TechnologyProjectsPageProps) {
  const t = await getTranslations('portfolio.tools.projects')
  const tProject = await getTranslations('portfolio.projects')
  const {format} = getDateFunctions(LOCALES[locale])
  const projects = getProjects({technology, t})

  const contexts: ProjectContextObjects = {
    personal: tProject('filter.personal'),
    work: tProject('filter.work')
  }

  if (!projects || projects.length === 0) return null

  return (
    <section className="py-10">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('description', {technology: title})}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map(project => (
            <ProjectCard key={project.id}>
              <StatusBadge
                start={project.start}
                end={project.end}
                className="absolute -right-2 -top-3"
              />
              <ProjectCardMain>
                <ProjectCardTitle>{project.name}</ProjectCardTitle>
                <ProjectCardDescription>
                  {project.description}
                </ProjectCardDescription>
              </ProjectCardMain>
              <ProjectCardInfo>
                <ProjectCardInfoItem>
                  <ProjectCardInfoLabel>{`${tProject(
                    'start'
                  )}:`}</ProjectCardInfoLabel>
                  <ProjectCardInfoValue>
                    {format(project.start, 'MMMM yyyy')}
                  </ProjectCardInfoValue>
                </ProjectCardInfoItem>
                {project.end && (
                  <ProjectCardInfoItem>
                    <ProjectCardInfoLabel>{`${tProject(
                      'end'
                    )}:`}</ProjectCardInfoLabel>
                    <ProjectCardInfoValue>
                      {format(project.end, 'MMMM yyyy')}
                    </ProjectCardInfoValue>
                  </ProjectCardInfoItem>
                )}
                <ProjectCardInfoItem>
                  <ProjectCardInfoLabel>
                    {tProject('context')}:
                  </ProjectCardInfoLabel>
                  <ProjectCardInfoValue>
                    {contexts[project.context]}
                  </ProjectCardInfoValue>
                </ProjectCardInfoItem>
                {project.references && project.references.length > 0 && (
                  <ProjectCardInfoItem>
                    <ProjectCardInfoLabel>{`${tProject(
                      'references'
                    )}:`}</ProjectCardInfoLabel>
                    {project.references.map((ref, index) => (
                      <ProjectCardInfoValue key={index} className="flex-wrap">
                        <ProjectCardReference
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer">
                          <span>{ref.label}</span>
                          <Icon
                            name="arrow-up-right-from-square"
                            size="xs"
                            className="relative -top-1"
                          />
                        </ProjectCardReference>
                      </ProjectCardInfoValue>
                    ))}
                  </ProjectCardInfoItem>
                )}
                <ProjectCardInfoItem>
                  <ProjectCardInfoLabel>{`${tProject(
                    'technologies'
                  )}:`}</ProjectCardInfoLabel>
                  <ProjectCardInfoValue className="flex-wrap">
                    {project.technologies.map((tech, index) => (
                      <Badge
                        variant="secondary"
                        key={index}
                        className="mr-1 mb-1">
                        {tech}
                      </Badge>
                    ))}
                  </ProjectCardInfoValue>
                </ProjectCardInfoItem>
              </ProjectCardInfo>
            </ProjectCard>
          ))}
        </div>
      </div>
    </section>
  )
}
