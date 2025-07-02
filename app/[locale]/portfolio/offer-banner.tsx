import {Button} from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import Link from 'next/link'

export default async function PortfolioOfferBanner() {
  const t = await getTranslate('portfolio')
  return (
    <section className="bg-muted/20">
      <Link
        className="container text-center md:text-left py-16 flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-4 group"
        href="/portfolio/tools">
        <span className="text-2xl font-semibold">{t('techStackOverview')}</span>
        <Button
          size="lg"
          className="text-base transition-transform duration-300 ease-in-out group-hover:scale-125 hover:cursor-pointer">
          {t('myTechStack')}
          <Icon name="arrow-right" />
        </Button>
      </Link>
    </section>
  )
}
