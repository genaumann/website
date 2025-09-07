import {getSocials} from '@/lib/socials'
import Link from 'next/link'
import Icon from '../ui/icon'
import {cn} from '@/lib/cn'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {getDateFunctions} from '@/lib/dates'
import {getLocale} from '@/lib/cookie'
import {CONTACT} from '@/lib/contact'

export default async function Footer() {
  const t = await getTranslate()
  const locale = await getLocale()
  const {format} = getDateFunctions(locale)
  const socials = getSocials()

  const navigation = {
    main: [
      {name: t('portfolio'), href: '/portfolio'},
      {name: t('techstack'), href: '/portfolio/tools'},
      {name: t('kb'), href: '/kb'},
      {name: t('contact'), href: '/contact'},
      {name: t('privacy'), href: '/privacy'},
      {name: t('imprint'), href: '/imprint'}
    ],
    socials
  }

  return (
    <footer className="py-6 overflow-hidden border-t border-muted border-dashed">
      <div className="container mx-auto space-y-8">
        <nav
          aria-label="Footer"
          className="grid grid-cols-3 sm:flex sm:flex-wrap gap-x-4 gap-y-3 sm:gap-x-12 sm:justify-center text-sm font-medium">
          {navigation.main.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                (index + 1) % 3 === 0 && 'justify-self-end',
                (index + 1 - 2) % 3 === 0 && 'justify-self-center'
              )}>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="space-y-4">
          <div className="flex justify-center gap-x-4">
            {navigation.socials.map(item => (
              <Link
                rel="noopener noreferrer"
                target="_blank"
                key={item.name}
                href={item.href}
                className="text-muted-foreground">
                <span className="sr-only">{item.name}</span>
                <Icon prefix={item.iconPrefix} name={item.icon} />
              </Link>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © {format(new Date(), 'yyyy')} {CONTACT.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
