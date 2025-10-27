'use client'

import {useTolgee, useTranslate} from '@tolgee/react'
import {useEffect, useRef} from 'react'
import {LOCALES} from '@/locales'
import {useRouter} from 'next/navigation'
import {Project} from '@/lib/types'
import {
  ProjectCard,
  ProjectCardInfo,
  ProjectCardInfoItem,
  ProjectCardTitle
} from './project-card'
import {cn} from '@/lib/cn'
import {
  ProjectContextBadge,
  ProjectDateBadge,
  ProjectTechnologyBadge
} from './project-badges'

interface ProjectGridProps {
  projects: Project[]
  gridClassName?: string
}

export default function ProjectGrid({
  projects,
  gridClassName
}: ProjectGridProps) {
  const {t} = useTranslate('portfolio')
  const tolgee = useTolgee()
  const locale = tolgee.getLanguage() || LOCALES.de
  const titles = useRef<Record<string, HTMLDivElement>>({})
  const router = useRouter()

  useEffect(() => {
    const titleElements = Object.values(titles.current)
    if (titleElements.length === 0) return
    titleElements.forEach(el => {
      el.style.height = 'auto'
    })
    const maxHeight = Math.max(...titleElements.map(el => el.scrollHeight))
    titleElements.forEach(el => {
      el.style.height = `${maxHeight}px`
    })
  }, [projects])

  const isOdd = projects.length % 2 !== 0

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 gap-4 p-2',
        gridClassName
      )}>
      {projects.map((project, index) => {
        const isLastItem = index === projects.length - 1
        const shouldCenterLast = isOdd && isLastItem

        return (
          <ProjectCard
            key={project.id}
            className={cn(
              'cursor-pointer',
              'md:col-span-2',
              shouldCenterLast && 'md:col-start-2 xl:col-span-1 xl:col-start-2'
            )}
            onClick={e => {
              const target = e.target as HTMLElement
              if (target.closest('a') || target.closest('button')) {
                return
              }
              router.push(`/portfolio/projects/${project.id}`)
            }}>
            <ProjectCardTitle
              ref={el => {
                if (el) titles.current[project.id] = el as HTMLDivElement
              }}>
              {project.name?.[locale as keyof typeof project.name]}
            </ProjectCardTitle>
            <ProjectCardInfo>
              <ProjectCardInfoItem className="flex-wrap">
                <ProjectDateBadge
                  start={project.start}
                  end={project.end}
                  locale={locale}
                />
                <ProjectContextBadge context={project.context} t={t} />
              </ProjectCardInfoItem>
              <ProjectCardInfoItem className="flex-wrap">
                {project.technologies.map(technology => (
                  <ProjectTechnologyBadge
                    key={technology}
                    technologyName={technology}
                  />
                ))}
              </ProjectCardInfoItem>
            </ProjectCardInfo>
          </ProjectCard>
        )
      })}
    </div>
  )
}
