import {certs} from '@/lib/cert'
import {getProjects} from '@/lib/projects'
import {getTrainings} from '@/lib/trainings'
import {getTranslations} from 'next-intl/server'

export default async function PortfolioStatsPage() {
  const completedProjects = getProjects({
    t: await getTranslations('portfolio.tools.projects')
  }).filter(project => project.end && project.end < new Date()).length
  const speakerTrainings = getTrainings({
    t: await getTranslations('portfolio.trainings'),
    type: 'speaker'
  }).length

  const t = await getTranslations('portfolio.stats')

  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">
              {completedProjects}
            </div>
            <div className="text-muted-foreground">
              {t('completedProjects')}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">
              {certs.length}
            </div>
            <div className="text-muted-foreground">{t('certs')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">
              {speakerTrainings}
            </div>
            <div className="text-muted-foreground">{t('speakerTrainings')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
