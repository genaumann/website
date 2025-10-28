'use client'

import Link from 'next/link'
import {useEffect, useRef} from 'react'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from './card'
import Icon from './icon'
import {Badge} from './badge'
import {getDateFunctions} from '@/lib/dates'
import {certs as certData, getCertsByTechnology} from '@/lib/cert'
import {ProjectTechnologyBadge} from './project-badges'
import {useTolgee, useTranslate} from '@tolgee/react'
import {LOCALES} from '@/locales'

type CertGridProps = {
  technology?: string
}

export default function CertGrid({technology}: CertGridProps) {
  const {t} = useTranslate()
  const tolgee = useTolgee()
  const locale = tolgee.getLanguage() || LOCALES.de
  const {format} = getDateFunctions(locale)
  const certs = technology ? getCertsByTechnology(technology) : certData
  const titles = useRef<Record<string, HTMLDivElement>>({})

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
  }, [certs])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {certs.map(cert => {
        const isActive = cert.validTo ? new Date() < cert.validTo : true
        return (
          <Link
            href={cert.url}
            key={cert.name}
            rel="noopener noreferrer"
            target="_blank"
            className="group">
            <Card className="bg-background border border-dashed border-muted shadow shadow-primary transition-all duration-300 ease-out transform-gpu hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20">
              <CardHeader className="relative">
                <CardTitle
                  ref={el => {
                    if (el) titles.current[cert.name] = el as HTMLDivElement
                  }}
                  className="text-2xl font-semibold text-center">
                  {cert.name}
                </CardTitle>
                <Badge
                  variant={isActive ? 'default' : 'destructive'}
                  className="absolute -top-3 -right-2">
                  {isActive ? t('active') : t('expired')}
                </Badge>

                <div className="absolute -top-3 -left-2 flex items-center gap-2 bg-secondary p-2 rounded-xl">
                  <Icon
                    name="file-certificate"
                    className="text-xl text-muted-foreground"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex justify-center gap-2">
                <Badge variant="muted">
                  <Icon name="calendar" />
                  <span>{format(cert.validFrom, 'MMM yyyy')}</span>
                </Badge>
                <Badge variant="muted">
                  <Icon name="file-certificate" />
                  <span>{cert.issuer}</span>
                </Badge>
              </CardContent>
              <CardFooter className="flex justify-center gap-2 py-4 border-t border-muted border-dashed">
                {cert.technologies?.map(technology => (
                  <ProjectTechnologyBadge
                    key={technology}
                    technologyName={technology}
                  />
                ))}
              </CardFooter>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
