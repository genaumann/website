import {getProjects, ProjectContext} from '../../../../../lib/projects'
import {getDateFunctions} from '@/lib/dates'
import {LOCALES} from '@/locales'
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
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {LocaleParam} from '@/lib/types'

export type ProjectContextObjects = Record<ProjectContext, string>

type TechnologyProjectsPageProps = LocaleParam & {
  technology: string
  title: string
}

export default async function TechnologyProjectsPage({
  technology,
  locale,
  title
}: TechnologyProjectsPageProps) {
  const t = await getTranslate('portfolio')
  const {format} = getDateFunctions(LOCALES[locale])
  const projects = await getProjects({technology})

  const contexts: ProjectContextObjects = {
    personal: t('personalProjects', {count: 1}),
    work: t('workProjects', {count: 1}),
    freelance: t('freelanceProjects', {count: 1})
  }

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map(project => (
            <ProjectCard key={project.id}>
              <StatusBadge
                t={t}
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
                  <ProjectCardInfoLabel>{`${t('start', {
                    ns: 'common'
                  })}:`}</ProjectCardInfoLabel>
                  <ProjectCardInfoValue>
                    {format(project.start, 'MMMM yyyy')}
                  </ProjectCardInfoValue>
                </ProjectCardInfoItem>
                {project.end && (
                  <ProjectCardInfoItem>
                    <ProjectCardInfoLabel>{`${t('end', {
                      ns: 'common'
                    })}:`}</ProjectCardInfoLabel>
                    <ProjectCardInfoValue>
                      {format(project.end, 'MMMM yyyy')}
                    </ProjectCardInfoValue>
                  </ProjectCardInfoItem>
                )}
                <ProjectCardInfoItem>
                  <ProjectCardInfoLabel>{t('context')}:</ProjectCardInfoLabel>
                  <ProjectCardInfoValue>
                    {contexts[project.context]}
                  </ProjectCardInfoValue>
                </ProjectCardInfoItem>
                {project.references && project.references.length > 0 && (
                  <ProjectCardInfoItem>
                    <ProjectCardInfoLabel>{`${t('references')}:`}</ProjectCardInfoLabel>
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
                  <ProjectCardInfoLabel>{`${t('technologies')}:`}</ProjectCardInfoLabel>
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
