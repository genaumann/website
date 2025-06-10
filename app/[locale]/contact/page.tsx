import Icon from '@/components/ui/icon'
import {CONTACT} from '@/lib/contact'
import {getTranslations} from 'next-intl/server'
import Link from 'next/link'
import ContactForm from './form'
import {Metadata} from 'next'
import {LOCALE_KEY} from '@/locales'
import getMetadata from '@/lib/metadata'

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: LOCALE_KEY}>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations('contact.metadata')

  return getMetadata({
    title: t('title'),
    description: t('description'),
    slug: '/contact',
    index: true,
    locale,
    og: {
      type: 'website',
      title: t('title'),
      description: t('description')
    }
  })
}

export default async function Page() {
  const t = await getTranslations('contact')
  return (
    <div className="h-[calc(100vh-202px)] flex flex-col md:flex-row items-center md:justify-between gap-10 md:gap-0">
      <div className="relative md:w-1/2 h-full w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="grid-pattern opacity-40"></div>
        </div>
        <div className="flex items-center  md:mt-0 text-center md:text-left h-full">
          <div className="w-full h-full md:h-fit flex flex-col gap-4 bg-background/30 md:shadow-y-md dark:shadow-secondary/30 py-8 px-6 text-center backdrop-blur-3xl relative">
            <div className="absolute inset-0 z-0">
              <div className="grid-pattern opacity-20"></div>
            </div>
            <h1 className="text-5xl font-semibold mb-4 z-10">{t('title')}</h1>
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
