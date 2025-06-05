import {getTranslations} from 'next-intl/server'

export default async function PortfolioAboutPage() {
  const t = await getTranslations('portfolio.about')
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <h2 className="text-4xl font-bold mb-12 text-center lg:self-center">
            {t('title')}
          </h2>
          <div className="block lg:max-w-8/12">
            <p
              className="whitespace-pre-wrap text-lg "
              dangerouslySetInnerHTML={{__html: t.raw('description')}}></p>
          </div>
        </div>
      </div>
    </section>
  )
}
