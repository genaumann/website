import {certs} from '@/lib/cert'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {getProjects} from '@/lib/projects'
import {getTrainings} from '@/lib/trainings'
import Link from 'next/link'

export default async function PortfolioStatsPage() {
  const projects = getProjects()
  const completedProjects = projects.filter(
    project => project.end && project.end < new Date()
  ).length
  const speakerTrainings = (
    await getTrainings({
      type: 'speaker'
    })
  ).length

  const t = await getTranslate()

  const entries = [
    {
      title: t('completedProjects'),
      value: completedProjects,
      link: '#projects'
    },
    {
      title: t('certificates'),
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
              <div className="text-4xl font-bold mb-2 transition-transform  ease-in-out group-hover:scale-150 group-focus:scale-150 animate-flicker text-primary">
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
