import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {Button} from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import {cn} from '@/lib/cn'
import {getOffers} from '@/lib/offer'
import {getTranslations} from 'next-intl/server'
import Link from 'next/link'

export default async function PortfolioOfferPage() {
  const t = await getTranslations('portfolio.offers')
  const offers = getOffers({t})

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:justify-between ">
          <h2 className="text-4xl font-bold mb-12 text-center">{t('title')}</h2>
          <div className="block lg:w-8/12">
            <Accordion
              type="multiple"
              className="w-full rounded-lg border border-border shadow dark:shadow-primary">
              {offers.map((offer, index) => (
                <AccordionItem
                  key={offer.id}
                  value={offer.id}
                  className="border-b border-border rounded-none">
                  <AccordionTrigger
                    className={cn(
                      'items-center bg-card px-4 text-lg data-[state=open]:text-primary',
                      index === 0 && 'rounded-t-lg',
                      index === offers.length - 1 &&
                        'data-[state=closed]:rounded-b-lg'
                    )}>
                    <div className="flex gap-2 items-center">
                      <Icon name={offer.iconName} prefix={offer.iconPrefix} />
                      <span className="font-semibold">{offer.name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-base py-3 px-4">
                    {offer.description}
                    <Button className="w-fit" asChild>
                      <Link href="/portfolio/tools">
                        {t('banner.buttonTitle')}
                        <Icon name="arrow-right" />
                      </Link>
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
