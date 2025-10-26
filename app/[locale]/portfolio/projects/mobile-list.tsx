'use client'

import {getProjects} from '@/lib/projects'
import {useTolgee, useTranslate} from '@tolgee/react'
import {LOCALES} from '@/locales'
import {useRouter} from 'next/navigation'
import Icon from '@/components/ui/icon'
import {getDateFunctions} from '@/lib/dates'
import {cn} from '@/lib/cn'
import {Input} from '@/components/ui/input'
import {useState} from 'react'
import {ProjectTechnologyBadge} from '@/components/ui/project-badges'

export default function PortfolioProjectsMobileList() {
  const [search, setSearch] = useState('')
  const projects = getProjects()
  const tolgee = useTolgee()
  const locale = tolgee.getLanguage() || LOCALES.de
  const {t} = useTranslate()
  const router = useRouter()
  const {format} = getDateFunctions(locale)
  const filteredProjects = projects.filter(project => {
    const searchLower = search.toLowerCase()
    const nameMatch = project.name?.[locale as keyof typeof project.name]
      ?.toLowerCase()
      .includes(searchLower)
    const techMatch = project.technologies.some(tech =>
      tech.toLowerCase().includes(searchLower)
    )
    return nameMatch || techMatch
  })

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder={t('tableFilter')}
        className="border border-muted border-dashed shadow-none placeholder:text-sm placeholder:text-muted-foreground placeholder:font-light"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul role="list" className="border border-muted border-dashed rounded-lg">
        {filteredProjects.map((project, index) => (
          <li
            key={project.id}
            onClick={e => {
              const target = e.target as HTMLElement
              if (target.closest('a')) {
                return
              }
              router.push(`/portfolio/projects/${project.id}`)
            }}
            className={cn(
              'cursor-pointer hover:bg-accent hover:text-accent-foreground p-2 border-b border-muted border-dashed',
              index === filteredProjects.length - 1 && 'border-b-0'
            )}>
            <div className="flex flex-col gap-2">
              <span className="font-bold">
                {project.name?.[locale as keyof typeof project.name]}
              </span>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Icon name="calendar" />
                <span>
                  {format(project.start, 'MMMM yyyy')} -{' '}
                  {project.end ? format(project.end, 'MMMM yyyy') : 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                {project.technologies.map(technology => (
                  <ProjectTechnologyBadge
                    key={technology}
                    technologyName={technology}
                  />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
