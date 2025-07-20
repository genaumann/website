import createMiddleware from 'next-intl/middleware'
import {routing} from '@/locales/routing'
import {NextRequest, NextResponse} from 'next/server'
import {LOCALES} from './locales'

const i18nMiddleware = createMiddleware(routing)

export default async function middleware(request: NextRequest) {
  const [, ...segments] = request.nextUrl.pathname.split('/')
  const isLocale = Object.values(LOCALES).includes(segments[0] as LOCALES)
  const path = segments.slice(isLocale ? 1 : 0)

  // remove trailing index from kb paths
  if (path[0] === 'kb' && path[path.length - 1] === 'index') {
    return NextResponse.redirect(
      new URL(`/${segments.slice(0, -1).join('/')}`, request.url)
    )
  }

  const response = i18nMiddleware(request)
  response.headers.set('x-url', request.nextUrl.pathname)

  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
