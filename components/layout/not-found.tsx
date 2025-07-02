import Link from 'next/link'
import {Button} from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import {getTranslate} from '@/lib/integrations/tolgee/server'

export default async function NotFound() {
  const t = await getTranslate()
  return (
    <div className="flex min-h-[calc(100vh-203px)] flex-col items-center justify-center">
      <div className="container flex max-w-md flex-col items-center justify-center gap-6 px-4 py-16 text-center md:py-24">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Icon
            name="circle-exclamation"
            className="h-10 w-10 text-primary"
            aria-hidden="true"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">404</h1>
        <h2 className="text-xl font-semibold">{t('siteNotFound')}</h2>
        <Button asChild className="mt-4 gap-2">
          <Link href="/">
            <Icon name="arrow-left" className="h-4 w-4" />
            {t('goBack')}
          </Link>
        </Button>
      </div>
    </div>
  )
}
