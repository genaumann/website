import Icon from '@/components/ui/icon'
import {CONTACT} from '@/lib/contact'
import Link from 'next/link'
import ContactForm from './form'
import {Metadata} from 'next'
import getMetadata from '@/lib/metadata'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {LocaleParam} from '@/lib/types'

export async function generateMetadata({
  params
}: {
  params: Promise<LocaleParam>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslate('contact', {noWrap: true})

  return getMetadata({
    title: t('contact', {ns: 'common'}),
    description: t('appMetadata.description'),
    slug: '/contact',
    index: true,
    locale,
    og: {
      type: 'website',
      title: t('contact', {ns: 'common'}),
      description: t('appMetadata.description')
    }
  })
}

export default async function Page() {
  const t = await getTranslate()
  return (
    <div className="min-h-content md:h-content flex flex-col md:flex-row items-center md:justify-between gap-10 md:gap-0">
      <div className="relative md:w-1/2 h-full w-full">
        <div className="absolute inset-0 z-0">
          <div className="grid-pattern opacity-40"></div>
        </div>
        <div className="flex items-center  md:mt-0 text-center md:text-left h-full">
          <div className="w-full h-full md:h-fit flex flex-col gap-4 bg-background/30 md:shadow-y-md dark:shadow-secondary/30 py-8 px-6 text-center backdrop-blur-3xl relative">
            <div className="absolute inset-0 z-0">
              <div className="grid-pattern opacity-20"></div>
            </div>
            <h1 className="text-5xl font-semibold mb-4 z-10">{t('contact')}</h1>
            <div className="space-y-2 w-fit mx-auto z-10">
              <div className="flex gap-2 items-center">
                <Icon name="envelope" />
                <Link href={`mailto:${CONTACT.email}`} className="underline">
                  {CONTACT.email}
                </Link>
              </div>
              <div className="flex gap-2 items-center">
                <Icon name="phone" />
                <Link href={`tel:${CONTACT.phone}`} className="underline">
                  {CONTACT.phone}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 mb-5 md:mb-0 container">
        <ContactForm />
      </div>
    </div>
  )
}
