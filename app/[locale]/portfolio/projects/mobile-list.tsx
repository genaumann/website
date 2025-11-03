'use client'

import {getProjects} from '@/lib/projects'
import {useTolgee, useTranslate} from '@tolgee/react'
import {LOCALES} from '@/locales'
import {useRouter} from 'next/navigation'
import {Input} from '@/components/ui/input'
import {useState} from 'react'
import {
  ProjectDateBadge,
  ProjectTechnologyBadge
} from '@/components/ui/project-badges'
import {
  ProjectCard,
  ProjectCardInfo,
  ProjectCardInfoItem,
  ProjectCardTechnologies,
  ProjectCardTitle
} from '@/components/ui/project-card'
import DownloadPDFButton from '@/components/pdf/download-button'

export default function PortfolioProjectsMobileList() {
  const [search, setSearch] = useState('')
  const projects = getProjects()
  const tolgee = useTolgee()
  const locale = tolgee.getLanguage() || LOCALES.de
  const {t} = useTranslate()
  const router = useRouter()

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
      <ul role="list">
        {filteredProjects.map(project => (
          <li
            key={project.id}
            onClick={e => {
              const target = e.target as HTMLElement
              if (target.closest('a') || target.closest('button')) {
                return
              }
              router.push(`/portfolio/projects/${project.id}`)
            }}
            className="cursor-pointer py-2">
            <ProjectCard>
              <ProjectCardTitle className="text-xl">
                {project.name?.[locale as keyof typeof project.name]}
              </ProjectCardTitle>
              <ProjectCardInfo>
                <ProjectCardInfoItem>
                  <ProjectDateBadge
                    start={project.start}
                    end={project.end}
                    locale={locale}
                  />
                </ProjectCardInfoItem>
                <ProjectCardInfoItem>
                  <DownloadPDFButton
                    file="project"
                    size="sm"
                    variant="outline"
                    className="p-1.5 font-inter border-foreground"
                    projectid={project.id}
                    label={t('downloadProjectRef', {ns: 'portfolio'})}
                  />
                </ProjectCardInfoItem>
              </ProjectCardInfo>
              <ProjectCardTechnologies>
                {project.technologies.map(technology => (
                  <ProjectTechnologyBadge
                    key={technology}
                    technologyName={technology}
                  />
                ))}
              </ProjectCardTechnologies>
            </ProjectCard>
          </li>
        ))}
      </ul>
    </div>
  )
}
