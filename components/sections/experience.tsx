import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {getExperience} from '@/lib/experience'
import {getLocale, getTranslations} from 'next-intl/server'
import Icon from '../ui/icon'
import {getDateFunctions} from '@/lib/dates'
import {LOCALES} from '@/locales'
import Image from 'next/image'
import {cn} from '@/lib/cn'

export interface ExperienceItem {
  company: string
  position: string
  from: Date
  to?: Date
  description: string[]
  technologies: string[]
  companylogo?: string
  type: 'fulltime' | 'parttime'
}

export default async function Experience() {
  const t = await getTranslations()
  const experiences: ExperienceItem[] = getExperience(t)
  const {format} = getDateFunctions((await getLocale()) as LOCALES)

  return (
    <section id="experience" className="max-w-3xl mx-auto py-20 container">
      <h2 className="text-5xl text-center mb-12">
        {t('common.workExperience')}
      </h2>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block" />

        {experiences.map((exp, index) => {
          const isActive = exp.to ? new Date() < exp.to : true
          return (
            <div key={index} className="mb-8 relative">
              <div
                className={cn(
                  'absolute left-4 top-8 w-3 h-3 rounded-full transform -translate-x-1/2 hidden md:block',
                  isActive ? 'bg-primary' : 'bg-muted-foreground'
                )}
              />

              <Card className="md:ml-12 overflow-hidden">
                <CardHeader className="py-4 px-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-semibold">
                        {exp.position}
                      </CardTitle>
                      <div className="flex items-center mt-2 text-muted-foreground">
                        {exp.companylogo ? (
                          <Image
                            src={exp.companylogo}
                            alt={exp.company}
                            width={25}
                            height={25}
                            className="mr-2"
                          />
                        ) : (
                          <Icon
                            name="building"
                            className="w-4 h-4 mr-2 hidden md:block"
                          />
                        )}
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-muted-foreground text-right max-w-[80px]">
                        <Icon
                          name="calendar"
                          className="w-4 h-4 mr-2 hidden md:block"
                        />
                        <span>{`${format(exp.from, 'MM/yyyy')} ${
                          exp?.to
                            ? format(exp.to, 'MM/yyyy')
                            : t('common.today')
                        }`}</span>
                      </div>
                      <div className="flex items-center mt-2 text-muted-foreground">
                        {exp.type === 'fulltime' ? (
                          <Badge variant="secondary">
                            {t('experience.fulltime')}
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            {t('experience.parttime')}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="bg-background py-4">
                  <ul className="list-disc list-inside space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="bg-secondary/40">
                  <div className="mt-4 flex flex-wrap gap-2 bg-secondary/40">
                    {exp.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </div>
          )
        })}
      </div>
    </section>
  )
}
