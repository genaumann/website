import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import Icon from '@/components/ui/icon'
import {getOffers} from '@/lib/offer'
import {getTranslations} from 'next-intl/server'

export default async function PortfolioOfferPage() {
  const t = await getTranslations('portfolio.offers')
  const offets = getOffers({t})

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:justify-between ">
          <h2 className="text-4xl font-bold mb-12 text-center">{t('title')}</h2>
          <div className="block lg:w-8/12">
            <Accordion
              type="multiple"
              className="w-full bg-card rounded-lg px-4 border border-border">
              {offets.map(offer => (
                <AccordionItem key={offer.id} value={offer.id}>
                  <AccordionTrigger className="items-center text-lg">
                    <div className="flex gap-2 items-center">
                      <Icon name={offer.iconName} prefix={offer.iconPrefix} />
                      <span className="font-semibold">{offer.name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    {offer.description}
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
