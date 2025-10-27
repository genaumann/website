import Link from 'next/link'
import {Button} from '../ui/button'
import Image from 'next/image'
import Icon from '../ui/icon'
import {getTranslate} from '@/lib/integrations/tolgee/server'

export default async function PortfolioSection() {
  const t = await getTranslate()
  return (
    <section className="py-20 bg-muted/20" id="portfolio">
      <div className="container">
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
          <div className="flex flex-col gap-6">
            <div>
              <span className="ml-1 font-oswald">{t('devOpsFromBerlin')}</span>
              <h2 className="text-5xl font-bold">{t('appName')}</h2>
            </div>
            <div className="md:hidden self-center rounded-xl shadow dark:shadow-primary w-full flex justify-center pt-2">
              <Image
                src="/me-black-wide.png"
                alt="Me"
                width={250}
                height={229}
              />
            </div>
            <div className="flex flex-col gap-4 md:gap-2 ml-0.5">
              <p className="text-muted-foreground lg:max-w-7/12 max-w-sm">
                {t('portfolioDescription')}
              </p>
              <Button
                className="w-fit text-base self-center md:self-start"
                asChild>
                <Link href="/portfolio/" className="font-oswald">
                  {t('viewPortfolio')}
                  <Icon name="arrow-right" />
                </Link>
              </Button>
            </div>
          </div>
          <Image
            src="/me-black.png"
            alt="Me"
            width={250}
            priority
            height={337}
            className="hidden md:block rounded-xl shadow dark:shadow-primary"
          />
        </div>
      </div>
    </section>
  )
}
