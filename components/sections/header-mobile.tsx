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
import {useState} from 'react'

export function HeaderMobile({headerMenu}: {headerMenu: HeaderMenu}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon name="bars" size="2xl" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="mb-4">
          <SheetTitle>
            <Link
              href={headerMenu.logo.href}
              className="flex flex-col items-center">
              <Image
                className="dark:block hidden"
                alt={headerMenu.logo.name}
                src={headerMenu.logo.darkImageUrl}
                width={52}
                height={65}
              />
              <Image
                className="dark:hidden"
                alt={headerMenu.logo.name}
                src={headerMenu.logo.lightImageUrl}
                width={52}
                height={65}
              />
              <span>{headerMenu.logo.name}</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <HeaderMobileItems items={headerMenu.items} />
        <SheetFooter className="mt-auto text-2xl">
          <div className="flex justify-center gap-2">
            {/* {headerMenu.socials.map(social => (
              <Link
                className="hover:text-primary"
                title={social.name}
                rel="noopener noreferrer"
                target="_blank"
                key={social.name}
                href={social.href}>
                <Icon prefix="fab" name={social.icon} />
              </Link>
            ))} */}
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
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (title: string) => {
    setOpenItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  return (
    <div className="px-2 pt-2 pb-3 space-y-4 sm:px-3">
      {items.map(item => (
        <div key={item.name}>
          {item.elements && item.elements.length > 0 ? (
            <div
              onClick={() => toggleItem(item.name)}
              className="flex items-center justify-between w-full text-muted-foreground hover:text-primary"
              aria-expanded={openItems.includes(item.name)}>
              {item.name}
              {item.elements &&
                (openItems.includes(item.name) ? (
                  <Icon name="chevron-up" />
                ) : (
                  <Icon name="chevron-down" />
                ))}
            </div>
          ) : (
            <SheetClose asChild>
              <Link href={item.href || '/'}>{item.name}</Link>
            </SheetClose>
          )}
          {item.elements && openItems.includes(item.name) && (
            <div className="pl-6 space-y-2 mt-2">
              {item.elements.map(subItem => (
                <SheetClose key={subItem.name} asChild>
                  <Link
                    href={subItem.href || '/'}
                    className="block pl-2 text-muted-foreground hover:text-primary">
                    <Icon name={subItem.icon} className="mr-2" />
                    {subItem.name}
                  </Link>
                </SheetClose>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
