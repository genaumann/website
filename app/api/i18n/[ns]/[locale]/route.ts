import {LocaleParam} from '@/lib/types'
import {NextRequest} from 'next/server'

type GetParam = LocaleParam & {
  ns: string
}

export async function GET(
  _: NextRequest,
  {params}: {params: Promise<GetParam>}
) {
  const cdn = process.env.TOLGEE_CDN_URL
  const {ns, locale} = await params

  const json = await fetch(`${cdn}/${ns}/${locale}.json`, {
    next: {
      revalidate: 3600,
      tags: ['i18n']
    }
  })
  console.dir(json, {depth: null})
  return new Response(await json.text(), {
    status: json.status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}
