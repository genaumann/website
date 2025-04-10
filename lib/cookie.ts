'use server'

import {LOCALES} from '@/locales'
import {cookies} from 'next/headers'

// This cookie name is used by `next-intl` on the public pages too. By
// reading/writing to this locale, we can ensure that the user's locale
// is consistent across public and private pages. In case you save the
// locale of registered users in a database, you can of course also use
// that instead when the user is logged in.
const LOCALE_COOKIE_NAME = 'NEXT_LOCALE'

export async function getLocale(): Promise<LOCALES> {
  const cookieStore = await cookies()
  return cookieStore.get(LOCALE_COOKIE_NAME)?.value as LOCALES
}

export async function setUserLocale(locale: LOCALES): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(LOCALE_COOKIE_NAME, locale)
}
