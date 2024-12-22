import Link from 'next/link'
import Icon from '../ui/icon'
import HeaderItems from './header-items'
import {getHeaderMenu} from '@/lib/header-menu'
import {getTranslations} from 'next-intl/server'
import Image from 'next/image'
import {HeaderMobile} from './header-mobile'

export default async function Header() {
  const t = await getTranslations()
  const headerMenu = getHeaderMenu(t)
  return (
    <header className="sticky top-0 backdrop-blur py-4 bg-background/75 z-20">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={headerMenu.logo.href} className="flex-shrink-0">
              <Image
                className="dark:block hidden"
                alt={headerMenu.logo.name}
                src={headerMenu.logo.darkImageUrl}
                width={39}
                height={50}
              />
              <Image
                className="dark:hidden"
                alt={headerMenu.logo.name}
                src={headerMenu.logo.lightImageUrl}
                width={39}
                height={50}
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <HeaderItems items={headerMenu.items} />
          </div>
          <div className="hidden md:flex gap-3 text-2xl">
            {headerMenu.socials.map(social => (
              <Link
                className="hover:text-primary"
                title={social.name}
                rel="noopener noreferrer"
                target="_blank"
                key={social.name}
                href={social.href}>
                <Icon prefix="fab" name={social.icon} />
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <HeaderMobile headerMenu={headerMenu} />
          </div>
        </div>
      </div>
    </header>
  )
}
