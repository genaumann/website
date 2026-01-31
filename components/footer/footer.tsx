import Link from 'next/link'
import Icon, {IconName, IconPrefix} from '../ui/icon'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {getDateFunctions} from '@/lib/dates'
import {getLocale} from '@/lib/cookie'
import {CONTACT} from '@/lib/contact'
import {MobileFooterElements} from './footer-client'

interface SocialItem {
  name: string
  href: string
  icon: IconName
  iconPrefix?: IconPrefix
}

export type FooterNavigation = Record<string, {name: string; href: string}[]>

export default async function Footer() {
  const t = await getTranslate()
  const locale = await getLocale()
  const {format} = getDateFunctions(locale)

  const socials: SocialItem[] = [
    {
      name: 'LinkedIn',
      href: 'https://de.linkedin.com/in/gino-naumann-356993240',
      icon: 'linkedin',
      iconPrefix: 'fab'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/genaumann',
      icon: 'github',
      iconPrefix: 'fab'
    }
  ]

  const navigation: FooterNavigation = {
    [t('portfolio')]: [
      {
        name: t('overview'),
        href: '/portfolio'
      },
      {
        name: t('projects'),
        href: '/portfolio/projects'
      },
      {
        name: t('downloads'),
        href: '/downloads'
      }
    ],
    [t('kb')]: [
      {
        name: t('overview'),
        href: '/kb'
      }
    ],
    [t('legal')]: [
      {
        name: t('privacy'),
        href: '/privacy'
      },
      {
        name: t('imprint'),
        href: '/imprint'
      },
      {
        name: t('contact'),
        href: '/contact'
      }
    ]
  }

  return (
    <footer className="py-6 overflow-hidden border-t border-muted border-dashed">
      <div className="container grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-2">
          <span className="text-xl font-bold font-oswald mb-4">
            {t('appName')}
          </span>
          <Link
            href={`mailto:${CONTACT.email}`}
            className="text-sm text-muted-foreground hover:underline">
            {CONTACT.email}
          </Link>
          <Link
            href={`tel:${CONTACT.phone}`}
            className="text-sm text-muted-foreground hover:underline">
            {CONTACT.phone}
          </Link>
          <div className="flex gap-2">
            {socials.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:underline">
                <Icon prefix={item.iconPrefix} name={item.icon} />
              </Link>
            ))}
          </div>
        </div>
        {/* Mobile: accordion (client component for interactivity) */}
        <div className="lg:hidden">
          <MobileFooterElements navigation={navigation} />
        </div>
        {/* Desktop: navigation columns */}
        {Object.entries(navigation).map(([key, value]) => (
          <div
            key={key}
            className="hidden lg:flex flex-col gap-2 col-span-1 lg:ml-auto">
            <span className="font-bold font-oswald mb-2">{key}</span>
            <ul className="flex flex-col gap-2">
              {value.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container pb-4 mt-8">
        <p className="text-sm text-muted-foreground">
          © {format(new Date(), 'yyyy')} {CONTACT.name}
        </p>
      </div>
    </footer>
  )
}
