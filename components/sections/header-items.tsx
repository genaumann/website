'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import Image from 'next/image'
import {cn} from '@/lib/cn'
import Icon from '../ui/icon'
import {HeaderItem} from '@/lib/header-menu'

export default function HeaderItems({items}: {items: HeaderItem[]}) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map(item => (
          <NavigationMenuItem key={item.name}>
            {item.elements && item.elements.length > 0 ? (
              <>
                <NavigationMenuTrigger className="bg-secondary/40 font-semibold">
                  {item.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid p-4 md:w-[400px] lg:w-[500px] grid-cols-2 gap-y-4 bg-popover/70">
                    {item.lightImageUrl && item.darkImageUrl && (
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link href={item.imageLink || '/'}>
                            <Image
                              alt={item.name}
                              src={item.lightImageUrl}
                              className="dark:hidden"
                              width={200}
                              height={200}
                            />
                            <Image
                              alt={item.name}
                              src={item.darkImageUrl}
                              className="dark:block hidden"
                              width={200}
                              height={200}
                            />
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    )}
                    {item.headline && (
                      <div>
                        <p className="text-xl font-bold">{item.headline}</p>
                      </div>
                    )}
                    <div>
                      {item.elements.map(({name, href, icon}) => (
                        <ListItem
                          className="row-span-auto"
                          key={name}
                          title={name}
                          href={href}>
                          <div className="space-x-2">
                            <Icon name={icon} />
                            <span>{name}</span>
                          </div>
                        </ListItem>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-secondary/40 font-semibold'
                )}
                asChild>
                <Link href={item.href || '/'}>{item.name}</Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({className, children, href, ...props}, ref) => {
  return (
    <>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href || '/'}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}>
          {children}
        </Link>
      </NavigationMenuLink>
    </>
  )
})
ListItem.displayName = 'ListItem'
