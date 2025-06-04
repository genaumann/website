import {certs} from '@/lib/cert'
import {getProjects} from '@/lib/projects'
import {getTrainings} from '@/lib/trainings'
import {getTranslations} from 'next-intl/server'
import Link from 'next/link'

export default async function PortfolioStatsPage() {
  const completedProjects = getProjects({
    t: await getTranslations('portfolio.tools.projects')
  }).filter(project => project.end && project.end < new Date()).length
  const speakerTrainings = getTrainings({
    t: await getTranslations('portfolio.trainings'),
    type: 'speaker'
  }).length

  const t = await getTranslations('portfolio.stats')

  const entries = [
    {
      title: t('completedProjects'),
      value: completedProjects,
      link: '#projects'
    },
    {
      title: t('certs'),
      value: certs.length,
      link: '#certs'
    },
    {
      title: t('speakerTrainings'),
      value: speakerTrainings,
      link: '#trainings'
    }
  ]

  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {entries.map((entry, index) => (
            <Link
              key={index}
              href={entry.link}
              className="hover:cursor-pointer group">
              <div className="text-4xl font-bold text-primary mb-2 transition-transform duration-300 ease-in-out group-hover:scale-150 group-focus:scale-150">
                {entry.value}
              </div>
              <div className="text-muted-foreground">{entry.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
