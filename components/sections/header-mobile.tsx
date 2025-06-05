'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import Icon from '../ui/icon'
import {Button} from '../ui/button'
import {HeaderItem, HeaderMenu} from '@/lib/header-menu'
import Link from 'next/link'
import Image from 'next/image'
import {useTranslations} from 'next-intl'

export function HeaderMobile({headerMenu}: {headerMenu: HeaderMenu}) {
  const t = useTranslations()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('common.sidebar')}>
          <Icon name="bars" size="2xl" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="mb-4">
          <SheetTitle>
            <SheetClose asChild>
              <Link
                href={headerMenu.logo.href}
                className="flex items-center flex-col mx-auto w-9/12">
                <Image
                  alt={headerMenu.logo.name}
                  src={headerMenu.logo.imageUrl}
                  width={75}
                  height={43}
                />
                <span>{headerMenu.logo.name}</span>
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <HeaderMobileItems items={headerMenu.items} />
        <SheetFooter className="mt-auto text-2xl">
          <div className="flex justify-center gap-2">
            {headerMenu.tools.map(tool => (
              <tool.Component key={tool.name} />
            ))}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function HeaderMobileItems({items}: {items: HeaderItem[]}) {
  return (
    <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
      {items.map(item => (
        <div key={item.name} className="w-full">
          <SheetClose asChild>
            <Link
              className="font-semibold bg-secondary/40 w-full block p-2 rounded-lg"
              href={item.href || '/'}>
              {item.name}
            </Link>
          </SheetClose>
        </div>
      ))}
    </div>
  )
}
