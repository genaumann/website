'use server'

type GetParam = {
  language: string
  namespace?: string
}

export const fetchTolgee = async ({
  namespace,
  language
}: GetParam): Promise<Record<string, string>> => {
  const cdn = process.env.TOLGEE_CDN_URL

  const json = await fetch(`${cdn}/${namespace}/${language}.json`, {
    next: {
      revalidate: 3600,
      tags: ['i18n']
    }
  })
  return await json.json()
}
