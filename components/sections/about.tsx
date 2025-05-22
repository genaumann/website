import {getTranslations} from 'next-intl/server'
import Image from 'next/image'

export default async function About() {
  const t = await getTranslations()
  return (
    <section id="about" className="py-20 container">
      <div className="md:grid md:grid-cols-3">
        <div className="relative">
          <Image
            alt="Gino"
            src={'/me-white.png'}
            width={200}
            height={200}
            className="hidden md:block dark:hidden"
          />
          <Image
            alt="Gino"
            src={'/me-black.png'}
            width={217}
            height={200}
            className="hidden dark:md:block"
          />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-background to-transparent" />
        </div>
        <div className="space-y-4 md:col-span-2">
          <h2 className="sr-only">{t('common.aboutMe')}</h2>
          <div className="text-5xl">{t('aboutMe.title')}</div>
          <div className="relative md:hidden">
            <Image
              alt="Gino"
              src={'/me-white.png'}
              width={217}
              height={200}
              className="md:hidden mx-auto dark:hidden"
            />
            <Image
              alt="Gino"
              src={'/me-black.png'}
              width={200}
              height={200}
              className="hidden dark:md:hidden mx-auto dark:block "
            />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-background to-transparent" />
          </div>
          <p className="text-muted-foreground max-w-xl whitespace-pre-line">
            {t('aboutMe.description')}
          </p>
        </div>
      </div>
    </section>
  )
}
