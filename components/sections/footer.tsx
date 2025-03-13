import {getDateFunctions} from '@/lib/dates'
import {LOCALES} from '@/locales'
import {Link} from '@/locales/routing'
import {getLocale, getTranslations} from 'next-intl/server'

export default async function Footer() {
  const t = await getTranslations()
  const {format} = getDateFunctions((await getLocale()) as LOCALES)

  return (
    <footer className="text-muted-foreground py-6 border-t border-muted border-dashed">
      <div className="container mx-auto flex justify-between">
        <p>© {format(new Date(), 'yyyy')} Gino Naumann</p>
        <Link href="/privacy">{t('common.privacy')}</Link>
      </div>
    </footer>
  )
}
