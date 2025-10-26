'use client'

import {Badge} from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import {
  ProjectCard,
  ProjectCardInfo,
  ProjectCardInfoItem,
  ProjectCardInfoLabel,
  ProjectCardInfoValue,
  ProjectCardMain,
  ProjectCardReference,
  ProjectCardTitle,
  StatusBadge
} from '@/components/ui/project-card'
import {getDateFunctions} from '@/lib/dates'
import {getProjects} from '@/lib/projects'
import {LOCALES} from '@/locales'
import {useEffect, useMemo, useRef, useState} from 'react'
import {Pagination, A11y, FreeMode, Navigation} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import PortfolioProjectFilter, {ProjectContextFilter} from './filter'
import type {Swiper as SwiperType} from 'swiper'
import {ProjectContextObjects} from '@/app/[locale]/portfolio/technologies/[technology]/projects'
import {useTolgee, useTranslate} from '@tolgee/react'

export default function PortfolioProjectSwiper() {
  const tolgee = useTolgee()
  const locale = tolgee.getLanguage() || LOCALES.de
  const {format} = getDateFunctions(locale)
  const {t} = useTranslate('portfolio')
  const [contextFilter, setContextFilter] =
    useState<ProjectContextFilter>('all')

  const itemRefs = useRef<HTMLDivElement[]>([])
  const [maxHeight, setMaxHeight] = useState(0)
  const swiperRef = useRef<SwiperType | undefined>(undefined)

  const projects = useMemo(() => {
    const fetchedProjects = getProjects()
    return fetchedProjects
      .filter(pro => pro.end)
      .filter(pro => {
        if (contextFilter === 'all') return true
        if (contextFilter === 'work')
          return pro.context === 'work' || pro.context === 'freelance'
        return pro.context === contextFilter
      })
  }, [contextFilter])

  const contexts: ProjectContextObjects = {
    personal: t('personalProjects', {count: 1}),
    work: t('workProjects', {count: 1}),
    freelance: t('freelanceProjects', {count: 1})
  }

  useEffect(() => {
    const calculateMaxHeight = () => {
      if (!itemRefs.current.length) return

      const heights = itemRefs.current.map(ref => ref?.offsetHeight || 0)
      setMaxHeight(Math.max(...heights))
    }
    calculateMaxHeight()
    const resizeObserver = new ResizeObserver(() => {
      calculateMaxHeight()
    })
    itemRefs.current.forEach(ref => {
      if (ref) {
        resizeObserver.observe(ref)
      }
    })
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    swiperRef.current?.slideTo(0)
  }, [contextFilter])

  return (
    <>
      <PortfolioProjectFilter
        value={contextFilter}
        onChange={setContextFilter}
      />
      <Swiper
        onSwiper={swiper => {
          swiperRef.current = swiper
        }}
        modules={[Pagination, A11y, FreeMode, Navigation]}
        className="pb-12! pt-6! overflow-visible! min-h-[660px] px-1!"
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={{
          1024: {
            slidesPerView: 2,
            spaceBetween: 32
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 32
          }
        }}
        navigation
        pagination={{clickable: true}}>
        {projects.map((project, index) => (
          <SwiperSlide className="h-full" key={project.id}>
            <ProjectCard
              ref={e => {
                if (e) itemRefs.current[index] = e
              }}
              style={{height: maxHeight || 'auto'}}
              className="w-full lg:w-fit lg:max-w-xl">
              <StatusBadge
                t={t}
                start={project.start}
                end={project.end}
                className="absolute right-2 -top-3"
              />
              <ProjectCardMain>
                <ProjectCardTitle>
                  {project.name?.[locale as keyof typeof project.name]}
                </ProjectCardTitle>
              </ProjectCardMain>
              <ProjectCardInfo>
                <ProjectCardInfoItem>
                  <ProjectCardInfoLabel>{`${t('start', {ns: 'common'})}:`}</ProjectCardInfoLabel>
                  <ProjectCardInfoValue>
                    {format(project.start, 'MMMM yyyy')}
                  </ProjectCardInfoValue>
                </ProjectCardInfoItem>
                {project.end && (
                  <ProjectCardInfoItem>
                    <ProjectCardInfoLabel>{`${t('end', {ns: 'common'})}:`}</ProjectCardInfoLabel>
                    <ProjectCardInfoValue>
                      {format(project.end, 'MMMM yyyy')}
                    </ProjectCardInfoValue>
                  </ProjectCardInfoItem>
                )}
                <ProjectCardInfoItem>
                  <ProjectCardInfoLabel>{`${t('context')}:`}</ProjectCardInfoLabel>
                  <ProjectCardInfoValue>
                    {contexts[project.context]}
                  </ProjectCardInfoValue>
                </ProjectCardInfoItem>
                {project.references && project.references.length > 0 && (
                  <ProjectCardInfoItem>
                    <ProjectCardInfoLabel>{`${t(
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
                  <ProjectCardInfoLabel>{`${t(
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
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
