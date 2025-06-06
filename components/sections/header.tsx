import Link from 'next/link'
import HeaderItems from './header-items'
import {getHeaderMenu} from '@/lib/header-menu'
import {getTranslations} from 'next-intl/server'
import Image from 'next/image'
import {HeaderMobile} from './header-mobile'

export default async function Header() {
  const t = await getTranslations()
  const headerMenu = getHeaderMenu(t)
  return (
    <header className="sticky top-0 backdrop-blur py-4 bg-background/75 z-20 border-b border-dashed border-muted">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={headerMenu.logo.href} className="shrink-0">
              <Image
                alt={headerMenu.logo.name}
                priority
                src={headerMenu.logo.imageUrl}
                width={75}
                height={43}
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <HeaderItems items={headerMenu.items} />
          </div>
          <div className="hidden md:flex gap-3 text-2xl">
            {headerMenu.tools.map(tool => (
              <tool.Component key={tool.name} />
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
