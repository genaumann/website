import {getTranslations} from 'next-intl/server'
import {getProjects, Project} from '../../../../../lib/projects'
import {getDateFunctions} from '@/lib/dates'
import {LOCALE_KEY, LOCALES} from '@/locales'
import {Badge, BadgeProps} from '@/components/ui/badge'
import Link from 'next/link'
import Icon from '@/components/ui/icon'

type TechnologyProjectsPageProps = {
  technology: string
  locale: LOCALE_KEY
  title: string
}

interface StatusBadgeProps extends BadgeProps {
  start: Project['start']
  end?: Project['end']
}

export default async function TechnologyProjectsPage({
  technology,
  locale,
  title
}: TechnologyProjectsPageProps) {
  const t = await getTranslations('portfolio.tools.projects')
  const {format} = getDateFunctions(LOCALES[locale])
  const projects = getProjects(technology, t)

  if (!projects || projects.length === 0) return null

  const StatusBadge = ({start, end, ...props}: StatusBadgeProps) => {
    const now = new Date()
    if (end && end < now) {
      return <Badge {...props}>{t('status.completed')}</Badge>
    } else if (start > now) {
      return (
        <Badge variant="secondary" {...props}>
          {t('status.upcoming')}
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" {...props}>
          {t('status.in_progress')}
        </Badge>
      )
    }
  }

  return (
    <section className="py-10">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('description', {technology: title})}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map(project => (
            <div
              key={project.id}
              className="rounded-lg border border-muted shadow bg-background relative flex flex-col">
              <StatusBadge
                start={project.start}
                end={project.end}
                className="absolute -right-2 -top-3"
              />
              <div className="flex flex-col p-6 gap-4 border-b border-muted grow">
                <span className="line-clamp-2 text-2xl font-bold">
                  {project.name}
                </span>
                <p className="text-muted-foreground whitespace-pre-line">
                  {project.description}
                </p>
              </div>
              <div className="p-6 flex flex-col gap-2 bg-card min-h-[154px]">
                <div className="flex gap-2 text-sm">
                  <span className="font-semibold">{`${t('start')}:`}</span>
                  <span className="text-muted-foreground">
                    {format(project.start, 'MMMM yyyy')}
                  </span>
                </div>
                {project.end && (
                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">{`${t('end')}:`}</span>
                    <span className="text-muted-foreground">
                      {format(project.end, 'MMMM yyyy')}
                    </span>
                  </div>
                )}
                {project.references && project.references.length > 0 && (
                  <div className="flex gap-2 text-sm flex-wrap">
                    <span className="font-semibold">{`${t(
                      'references'
                    )}:`}</span>
                    {project.references.map((ref, index) => (
                      <Link
                        key={index}
                        className="underline inline-flex items-center gap-0.5"
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer">
                        <span>{ref.label}</span>
                        <Icon
                          name="arrow-up-right-from-square"
                          size="xs"
                          className="relative -top-1"
                        />
                      </Link>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 text-sm flex-wrap">
                  <span className="font-semibold">{`${t(
                    'technologies'
                  )}:`}</span>
                  {project.technologies.map((tech, index) => (
                    <Badge variant="secondary" key={index}>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
