import {useTranslations} from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function IntroHero() {
  const t = useTranslations('common')
  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div>
        <Image
          alt="Gino"
          src={'/me-white.png'}
          width={400}
          height={367}
          className="dark:hidden rounded-full border border-primary"
        />
        <Image
          alt="Gino"
          src={'/me-black.png'}
          width={400}
          height={367}
          className="hidden dark:block rounded-full border border-primary"
        />
      </div>
      <div className="flex flex-col justify-center gap-8">
        <span className="text-7xl md:text-8xl font-bold animate-flicker">
          Gino Naumann
        </span>
        <span className="md:ml-6 text-5xl md:text-6xl">{t('jobtitle')}</span>
        <div className="md:ml-7 flex flex-col gap-4 text-3xl md:text-4xl cursor-pointer">
          <Link className="hover:text-primary" href="mailto:job@gnaumann.de">
            job@gnaumann.de
          </Link>
          <Link className="hover:text-primary" href="tel:+4915255403279">
            +49 1525 5403279
          </Link>
        </div>
      </div>
    </div>
  )
}
