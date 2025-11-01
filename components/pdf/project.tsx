import {Locale, Project, TType} from '@/lib/types'
import {Document, Text, View} from '@react-pdf/renderer'
import {
  BaseLinkBadgePDF,
  BaseMutedBadgePDF,
  BasePagePDF,
  MarkdownTextPDF,
  tw
} from './base'
import {getDateFunctions} from '@/lib/dates'
import {ProjectContextMap} from '../ui/project-badges'
import {Fragment} from 'react'
import {getTechnology} from '@/lib/technologies'
import {origin} from '@/lib/url'

type ContentMap = {
  key: string
  translationKey: string
  content?: string
}

export default function ProjectPDF({
  project,
  locale,
  t
}: {
  project: Project
  locale: Locale
  t: TType
}) {
  const name = project.name[locale as keyof typeof project.name]
  const content = project.content[locale as keyof typeof project.content]
  const {format} = getDateFunctions(locale)

  const dateText = project.end
    ? `${format(project.start, 'MMMM yyyy')} - ${format(project.end, 'MMMM yyyy')}`
    : format(project.start, 'MMMM yyyy')

  const contentMap: ContentMap[] = [
    {
      key: 'challenge',
      translationKey: 'challenge',
      content: content['challenge']
    },
    {key: 'goals', translationKey: 'goals', content: content['goals']},
    {key: 'approach', translationKey: 'approach', content: content['approach']},
    {
      key: 'implementation',
      translationKey: 'implementation',
      content: content['implementation']
    },
    {key: 'results', translationKey: 'results', content: content['results']},
    {key: 'insights', translationKey: 'insights', content: content['insights']}
  ]

  return (
    <Document>
      <BasePagePDF style="p-0 pt-12 pb-20">
        <View style={tw('p-4 pb-6 bg-light')}>
          <Text
            style={tw(
              'px-12 text-4xl font-bold font-oswald text-center leading-tight'
            )}>
            {name}
          </Text>
        </View>
        <View
          style={tw('px-12 flex flex-col gap-2 justify-center items-center')}>
          <View style={tw('flex flex-row gap-2 mt-6')}>
            <BaseMutedBadgePDF text={dateText} icon="calendar" iconSize={8} />
            <BaseMutedBadgePDF
              text={ProjectContextMap({context: project.context, t})}
              icon="circle-info"
              iconSize={8}
            />
          </View>
          <View style={tw('flex flex-row gap-2')}>
            {project.technologies.map(technology => {
              const technologyData = getTechnology(technology)
              if (!technologyData) return null
              return (
                <BaseLinkBadgePDF
                  key={technology}
                  src={`${origin}/portfolio/technologies/${technologyData.slug}?utm_source=cv`}
                  text={technologyData.name}
                />
              )
            })}
          </View>
        </View>

        {/* Content */}
        <View style={tw('px-12 mt-6 text-base flex flex-col gap-6')}>
          <>
            <MarkdownTextPDF>{content['project_overview']}</MarkdownTextPDF>
            {contentMap.map(item => (
              <Fragment key={item.key}>
                {item.content && (
                  <View style={tw('flex flex-col gap-3')} wrap={false}>
                    <Text wrap style={tw('text-2xl font-bold font-oswald')}>
                      {t(item.translationKey, {ns: 'portfolio'})}
                    </Text>
                    <MarkdownTextPDF>{item.content}</MarkdownTextPDF>
                  </View>
                )}
              </Fragment>
            ))}
          </>
        </View>
      </BasePagePDF>
    </Document>
  )
}
