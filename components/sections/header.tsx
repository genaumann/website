import Link from 'next/link'
import HeaderItems from './header-items'
import Image from 'next/image'
import {HeaderMobile} from './header-mobile'
import {getHeaderMenu} from '@/lib/header-menu'
import {LocaleParam} from '@/lib/types'
import GlassSurface from '../GlassSurface'

export default async function Header({locale}: LocaleParam) {
  const headerMenu = await getHeaderMenu({locale})
  return (
    <header className="sticky top-3 container z-50">
      <GlassSurface
        width={'100%'}
        height={70}
        borderRadius={50}
        backgroundOpacity={0.3}
        displace={2}
        blur={5}>
        <div className="container flex flex-1 items-center justify-between">
          <div className="flex items-center">
            <Link href={headerMenu.logo.href} className="shrink-0">
              <Image
                alt={headerMenu.logo.name}
                priority
                src={headerMenu.logo.imageUrl}
                width={60}
                height={34}
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <HeaderItems items={headerMenu.items} />
          </div>
          <div className="hidden md:flex gap-3 text-2xl">
            {headerMenu.tools.map(tool => tool.Component)}
          </div>
          <div className="md:hidden">
            <HeaderMobile headerMenu={headerMenu} />
          </div>
        </div>
      </GlassSurface>
    </header>
  )
}
