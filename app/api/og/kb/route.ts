import {NextRequest} from 'next/server'
import {findArticleBySlug} from '@/lib/mdx-edge'
import {customIconMap} from '@/components/icons'
import OGImage from '../og'
import {LOCALE_KEY, LOCALES} from '@/locales'
import {getTolgee} from '@/lib/integrations/tolgee/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    const locale = searchParams.get('locale') as LOCALES
    const slug = searchParams.get('slug')
    const tolgee = await getTolgee()
    await tolgee.changeLanguage(locale || 'de')

    if (!slug) {
      return new Response('No slug provided', {
        status: 400
      })
    }

    const article = await findArticleBySlug(
      (locale || 'de') as LOCALE_KEY,
      slug
    )

    if (!article) {
      return new Response('Article not found', {
        status: 404
      })
    }

    if (article.icon && !(article.icon in customIconMap)) {
      article.icon = 'bookOpen'
    }

    return OGImage({
      article,
      description: tolgee.t('kbArticles', {language: locale})
    })
  } catch (e) {
    console.error(e)
    return new Response('Failed to generate image', {
      status: 500
    })
  }
}
