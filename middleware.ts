import createMiddleware from 'next-intl/middleware'
import {routing} from '@/locales/routing'
import {NextRequest, NextResponse} from 'next/server'

const i18nMiddleware = createMiddleware(routing)

export default async function middleware(request: NextRequest) {
  const response = i18nMiddleware(request)

  if (response && !response.ok) {
    return response
  }
  return await kbMiddleware(request, response)
}

// TODO: looks like shit
async function kbMiddleware(request: NextRequest, response: NextResponse) {
  const [, locale, ...segments] = request.nextUrl.pathname.split('/')
  const isLocale = locale === 'en' || locale === 'de'
  const isKBIndex =
    (segments[0] === 'kb' || locale === 'kb') &&
    segments[segments.length - 1] === 'index'

  const requestHeaders = new Headers(response.headers)
  requestHeaders.set('x-url', request.nextUrl.pathname)
  response.headers.set('x-url', request.nextUrl.pathname)

  if (isKBIndex) {
    segments.pop()
    return NextResponse.redirect(
      new URL(
        `${isLocale ? `/${locale}/` : '/'}${
          segments[0] === 'kb' ? '' : 'kb/'
        }${segments.join('/')}`,
        request.url
      ),
      {
        headers: requestHeaders
      }
    )
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
