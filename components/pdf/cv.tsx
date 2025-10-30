import {Document, Page, Text, View, Image, Link} from '@react-pdf/renderer'
import {BaseLinkBadgePDF, BaseMutedBadgePDF, BasePagePDF, tw} from './base'
import {CONTACT} from '@/lib/contact'
import IconPDF from './icon'
import {TType} from '@/lib/types'
import {getTechnology, getTechnologyCategories} from '@/lib/technologies'
import {getProjects} from '@/lib/projects'
import {LOCALES} from '@/locales'
import {Fragment} from 'react'
import {certs} from '@/lib/cert'
import {origin} from '@/lib/url'

export default function CVPDF({t, locale}: {t: TType; locale: string}) {
  const categories = getTechnologyCategories()
  const projects = getProjects()
  const completedProjects = projects.filter(
    project => project.end && project.cv
  )
  const maxProjects = 5

  return (
    <Document>
      <BasePagePDF style="p-0">
        {/* Header */}
        <View style={tw('flex flex-col gap-6 bg-light p-12 pb-6')}>
          <View style={tw('flex flex-row gap-12 items-center')}>
            <Image
              src={`${origin}/me-black-wide-small.png`}
              style={tw('w-[160px] h-[147px]')}
            />
            <View
              style={tw('flex flex-col items-start justify-center font-oswald')}
              wrap={false}>
              <Text style={tw('text-6xl font-bold leading-none mb-2')}>
                {CONTACT.name}
              </Text>
              <Text style={tw('leading-tight mt-2 pl-1')}>
                {CONTACT.jobTitle}
              </Text>
            </View>
          </View>
          <View
            style={tw(
              'flex flex-row justify-center gap-4 text-base font-oswald'
            )}>
            <Link
              src={'tel:' + CONTACT.phone.replaceAll(' ', '')}
              style={tw('flex flex-row items-center gap-1')}>
              <IconPDF style={tw('mt-1')} name="phone" width={10} height={10} />
              <Text style={tw('text-black')}>{CONTACT.phone}</Text>
            </Link>
            <Link
              src={'mailto:' + CONTACT.email}
              style={tw('flex flex-row items-center gap-1')}>
              <IconPDF
                style={tw('mt-1')}
                name="envelope"
                width={10}
                height={10}
              />
              <Text style={tw('text-black')}>{CONTACT.email}</Text>
            </Link>
            <Link
              src="https://gnaumann.de?utm_source=cv"
              style={tw('flex flex-row items-center gap-1')}>
              <IconPDF style={tw('mt-1')} name="globe" width={10} height={10} />
              <Text style={tw('text-black')}>https://gnaumann.de</Text>
            </Link>
          </View>
        </View>

        {/* Profile */}
        <View style={tw('px-12 pt-6 pb-3')}>
          <Text style={tw('text-3xl font-bold font-oswald')}>
            {t('profile', {ns: 'cv'})}
          </Text>
          <Text style={tw('text-base font-inter')}>
            {t('profileDescription', {ns: 'cv'})}
          </Text>
        </View>

        {/* Techstack */}
        <View style={tw('py-3')}>
          <Text style={tw('text-3xl font-bold font-oswald text-center')}>
            {t('techstack', {ns: 'common'})}
          </Text>
          {categories.map((category, index) => (
            <View
              key={category.name}
              style={tw(
                `flex flex-col gap-4 px-12 py-2 ${index % 2 === 0 ? 'bg-light' : 'bg-white'}`
              )}>
              <View style={tw('flex flex-row justify-between items-center')}>
                <Text style={tw('text-lg font-oswald mt-0.5')}>
                  {t(category.name, {ns: 'cv'})}
                </Text>
                <View style={tw('flex flex-row gap-2')}>
                  {category.technologies.map(technology => (
                    <BaseLinkBadgePDF
                      key={technology.slug}
                      src={`${origin}/portfolio/technologies/${technology.slug}?utm_source=cv`}
                      text={technology.name}
                    />
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      </BasePagePDF>

      <BasePagePDF style="px-0">
        {/* Projects */}
        <Text style={tw('text-3xl font-bold font-oswald text-center')}>
          {t('projects', {ns: 'common'})}
        </Text>
        <View style={tw('flex flex-col')}>
          {completedProjects.slice(0, maxProjects).map((project, index) => (
            <View
              key={project.id}
              style={tw(
                `flex flex-col px-12 py-4 ${index % 2 === 0 ? 'bg-light' : 'bg-white'}`
              )}>
              <View style={tw('flex flex-row justify-between items-center')}>
                <View>
                  <Text style={tw('text-lg font-oswald')}>
                    {project.name[locale as keyof typeof LOCALES]}
                  </Text>
                  <View style={tw('flex flex-row gap-2')}>
                    {project.technologies.map(technology => {
                      const technologyData = getTechnology(technology)
                      return (
                        <Fragment key={technology}>
                          {technologyData ? (
                            <BaseLinkBadgePDF
                              src={`${origin}/portfolio/technologies/${technologyData.slug}?utm_source=cv`}
                              text={technologyData.name}
                            />
                          ) : (
                            <BaseMutedBadgePDF text={technology} />
                          )}
                        </Fragment>
                      )
                    })}
                  </View>
                </View>
                <View style={tw('flex flex-col gap-1')}>
                  <BaseMutedBadgePDF
                    text={
                      project.start.toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'short'
                      }) +
                      ' - ' +
                      project.end?.toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'short'
                      })
                    }
                    icon="calendar"
                    outerStyle="w-[121px] mt-2"
                  />
                  <BaseLinkBadgePDF
                    src={`${origin}/portfolio/projects/${project.id}?utm_source=cv`}
                    outerStyle={`${locale === 'de' ? 'w-[86px]' : 'w-[95px]'}`}
                    text={t('projectRef', {ns: 'cv'})}
                    icon="eye"
                    iconSize={8}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Certifications */}
        <View style={tw('py-6')}>
          <Text style={tw('text-3xl font-bold font-oswald px-12 text-center')}>
            {t('certificates', {ns: 'common'})}
          </Text>
          <View style={tw('flex flex-col')}>
            {certs
              .sort((a, b) => b.validFrom.getTime() - a.validFrom.getTime())
              .map((cert, index) => (
                <View
                  key={cert.name}
                  style={tw(
                    `flex flex-col px-12 py-2 ${index % 2 === 0 ? 'bg-light' : 'bg-white'}`
                  )}>
                  <View
                    style={tw('flex flex-row justify-between items-center')}>
                    <Link src={cert.url} style={tw('no-underline text-black')}>
                      <Text style={tw('text-lg font-oswald')}>{cert.name}</Text>
                    </Link>
                    <View style={tw('flex flex-col gap-1')}>
                      <BaseMutedBadgePDF
                        text={cert.validFrom.toLocaleDateString(locale, {
                          year: 'numeric',
                          month: 'short'
                        })}
                        icon="calendar"
                        outerStyle="w-[66px]"
                      />
                    </View>
                  </View>
                </View>
              ))}
          </View>
        </View>
      </BasePagePDF>
    </Document>
  )
}
