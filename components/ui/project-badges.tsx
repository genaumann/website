import {Badge} from './badge'
import Icon from './icon'
import {Locale, Project, ProjectContext, TType} from '@/lib/types'
import {getDateFunctions} from '@/lib/dates'
import {getTechnology} from '@/lib/technologies'
import Link from 'next/link'

export type ProjectContextObjects = Record<ProjectContext, string>

interface ProjectContextBadgeProps {
  context: ProjectContext
  t: TType
}

interface ProjectDateBadgeProps {
  start: Project['start']
  end?: Project['end']
  locale: Locale
}

export function ProjectContextMap({context, t}: ProjectContextBadgeProps) {
  const contexts: ProjectContextObjects = {
    personal: t('personalProjects', {count: 1, ns: 'portfolio'}),
    work: t('workProjects', {count: 1, ns: 'portfolio'}),
    freelance: t('freelanceProjects', {count: 1, ns: 'portfolio'})
  }
  return contexts[context]
}

export function ProjectDateBadge({start, end, locale}: ProjectDateBadgeProps) {
  const {format} = getDateFunctions(locale)
  return (
    <Badge variant="muted">
      <Icon name="calendar" />
      <span>{format(start, 'MMMM yyyy')}</span>
      {end && <span> - {format(end, 'MMM yyyy')}</span>}
    </Badge>
  )
}

export function ProjectContextBadge({context, t}: ProjectContextBadgeProps) {
  const contextMap = ProjectContextMap({context, t})
  return (
    <Badge variant="muted">
      <Icon name="circle-info" />
      <span>{contextMap}</span>
    </Badge>
  )
}

export function ProjectTechnologyBadge({
  technologyName
}: {
  technologyName: string
}) {
  const technology = getTechnology(technologyName)
  return (
    <>
      {technology?.name ? (
        <Link href={`/portfolio/technologies/${technology.slug}`}>
          <Badge
            variant="outline"
            className="font-normal px-1.5 hover:bg-accent">
            {technology.name}
          </Badge>
        </Link>
      ) : (
        <Badge variant="muted">{technologyName}</Badge>
      )}
    </>
  )
}
