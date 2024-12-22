import {defineRouting} from 'next-intl/routing'
import {createNavigation} from 'next-intl/navigation'
import {LOCALES} from '.'

export const routing = defineRouting({
  locales: Object.keys(LOCALES),
  defaultLocale: Object.keys(LOCALES)[0],
  localePrefix: 'as-needed'
})

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing)
