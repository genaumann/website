import {DevTools, Tolgee, FormatSimple, BackendFetch} from '@tolgee/web'

const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY
const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL
const cdn = process.env.NEXT_PUBLIC_TOLGEE_CDN_URL

export function TolgeeBase() {
  return Tolgee()
    .use(
      BackendFetch({
        prefix: cdn,
        next: {revalidate: 60, tags: ['i18n']}
      })
    )
    .use(FormatSimple())
    .use(DevTools())
    .updateDefaults({
      apiKey,
      apiUrl
    })
}
