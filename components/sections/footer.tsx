import {getDateFunctions} from '@/lib/dates'
import {getSocials} from '@/lib/socials'
import {LOCALES} from '@/locales'
import {Link} from '@/locales/routing'
import {getLocale, getTranslations} from 'next-intl/server'
import Icon from '../ui/icon'

export default async function Footer() {
  const t = await getTranslations('footer')
  const {format} = getDateFunctions((await getLocale()) as LOCALES)
  const socials = getSocials()

  return (
    <footer className="text-muted-foreground py-6 border-t border-muted border-dashed">
      <div className="container mx-auto flex justify-between">
        <div className="flex flex-col gap-2">
          <p>© {format(new Date(), 'yyyy')} Gino Naumann</p>
          <div className="flex gap-2">
            {socials.map(social => (
              <Link
                className="dark:hover:text-primary/60 hover:text-primary"
                title={social.name}
                rel="noopener noreferrer"
                target="_blank"
                key={social.name}
                href={social.href}>
                <Icon prefix="fab" name={social.icon} />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link className="hover:underline" href="/contact">
            {t('contact')}
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <Link className="hover:underline" href="/privacy">
            {t('privacy')}
          </Link>
          <Link className="hover:underline" href="/imprint">
            {t('imprint')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
