'use server'

import {origin} from '@/lib/url'

type FetchI18nParams = {
  isCdn: boolean
  namespace?: string
  language: string
}

export const fetchI18n = async ({
  namespace,
  language,
  isCdn
}: FetchI18nParams): Promise<Record<string, string> | null> => {
  const cdn = process.env.TOLGEE_CDN_URL
  const url = isCdn
    ? `${cdn}/${namespace ? `${namespace}/` : ''}${language}.json`
    : `${origin}/i18n/${namespace ? `${namespace}/` : ''}${language}.json`

  const result = await fetch(url, {
    next: {
      revalidate: 3600,
      tags: ['i18n']
    }
  })

  if (!result.ok) {
    return null
  }

  return await result.json()
}
