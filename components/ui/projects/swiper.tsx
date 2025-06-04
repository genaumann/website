'use client'

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
import {getDateFunctions} from '@/lib/dates'
import {getProjects} from '@/lib/projects'
import {LOCALE_KEY, LOCALES} from '@/locales'
import {useLocale, useTranslations} from 'next-intl'
import {useEffect, useRef, useState} from 'react'
import {Pagination, A11y, FreeMode, Navigation} from 'swiper/modules'

import {Swiper, SwiperSlide} from 'swiper/react'

export default function PortfolioProjectSwiper() {
  const locale = useLocale() as LOCALE_KEY
  const projects = getProjects({
    t: useTranslations('portfolio.tools.projects')
  }).filter(pro => pro.end)
  const {format} = getDateFunctions(LOCALES[locale])
  const t = useTranslations('portfolio.projects')

  const itemRefs = useRef<HTMLDivElement[]>([])
  const [maxHeight, setMaxHeight] = useState(0)

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

  return (
    <Swiper
      modules={[Pagination, A11y, FreeMode, Navigation]}
      className="py-12! overflow-visible! min-h-[660px] px-1!"
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
              start={project.start}
              end={project.end}
              className="absolute right-2 -top-3"
            />
            <ProjectCardMain>
              <ProjectCardTitle>{project.name}</ProjectCardTitle>
              <ProjectCardDescription>
                {project.description}
              </ProjectCardDescription>
            </ProjectCardMain>
            <ProjectCardInfo>
              <ProjectCardInfoItem>
                <ProjectCardInfoLabel>{`${t('start')}:`}</ProjectCardInfoLabel>
                <ProjectCardInfoValue>
                  {format(project.start, 'MMMM yyyy')}
                </ProjectCardInfoValue>
              </ProjectCardInfoItem>
              {project.end && (
                <ProjectCardInfoItem>
                  <ProjectCardInfoLabel>{`${t('end')}:`}</ProjectCardInfoLabel>
                  <ProjectCardInfoValue>
                    {format(project.end, 'MMMM yyyy')}
                  </ProjectCardInfoValue>
                </ProjectCardInfoItem>
              )}
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
  )
}
