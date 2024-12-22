import {getRequestConfig} from 'next-intl/server'
export {getTranslations, getLocale} from 'next-intl/server'
export {useTranslations, useLocale} from 'next-intl'

export enum LOCALES {
  de = 'de_DE',
  en = 'en_US'
}

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale

  if (!locale || !Object.keys(LOCALES).includes(locale as LOCALES)) {
    locale = 'de'
  }

  const importLocale = LOCALES[locale as keyof typeof LOCALES]

  return {
    locale: locale,
    messages: (await import(`./${importLocale}.json`)).default
  }
})
