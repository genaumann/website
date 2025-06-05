'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import {cn} from '@/lib/cn'
import {HeaderItem} from '@/lib/header-menu'

export default function HeaderItems({items}: {items: HeaderItem[]}) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map(item => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                'bg-secondary/40 font-semibold'
              )}
              asChild>
              <Link href={item.href || '/'}>{item.name}</Link>
            </NavigationMenuLink>
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
