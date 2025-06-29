import {cn} from '@/lib/cn'
import {NextIntlClientProvider} from 'next-intl'
import {getMessages, getTranslations} from 'next-intl/server'
import {Oswald as FontSans} from 'next/font/google'
import {config as fontawesome} from '@fortawesome/fontawesome-svg-core'
import {Metadata} from 'next'
import Header from '@/components/sections/header'
import '@/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {ThemeProvider} from '@/components/providers/theme'
import Footer from '@/components/sections/footer'
import {LOCALES} from '@/locales'
import {notFound} from 'next/navigation'
import {origin} from '@/lib/url'
import HeightObserver from '@/components/layout/height-observer'
import {VercelToolbar} from '@vercel/toolbar/next'

fontawesome.autoAddCss = false

const fontSans = FontSans({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-sans'
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()
  return {
    title: {
      default: t('app.name'),
      template: `%s · ${t('app.name')}`
    },
    metadataBase: new URL(origin),
    manifest: `${origin}/manifest.webmanifest`
  }
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{locale: string}>
}>) {
  const messages = await getMessages()
  const locale = (await params).locale
  const isDev = process.env.NODE_ENV === 'development'

  if (!locale || !Object.keys(LOCALES).includes(locale as LOCALES)) {
    notFound() // TODO: Throws an error
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased min-h-dvh flex flex-col',
          fontSans.variable
        )}>
        <HeightObserver />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            defaultTheme="system"
            attribute="class"
            disableTransitionOnChange
            themes={['light', 'dark', 'system']}
            enableSystem={true}>
            <Header />
            <main className="grow">{children}</main>
            <Footer />
          </ThemeProvider>
          {isDev && <VercelToolbar />}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
