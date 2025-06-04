import {Button} from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import {getTranslations} from 'next-intl/server'
import Link from 'next/link'

export default async function PortfolioOfferBanner() {
  const t = await getTranslations('portfolio.offers')
  return (
    <section className="bg-muted/20">
      <Link
        className="container text-center md:text-left py-16 flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-4 group"
        href="/portfolio/tools">
        <span className="text-2xl font-semibold">{t('banner.title')}</span>
        <Button
          size="lg"
          className="text-base transition-transform duration-300 ease-in-out group-hover:scale-125 hover:cursor-pointer">
          {t('banner.buttonTitle')}
          <Icon name="arrow-right" />
        </Button>
      </Link>
    </section>
  )
}
