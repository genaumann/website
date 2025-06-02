import {getTranslations} from 'next-intl/server'
import TechnologyGridPage from './grid'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

export default async function Page() {
  const t = await getTranslations('portfolio')
  return (
    <div className="container">
      <Breadcrumb className="mt-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/portfolio">{t('title')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{t('tools.title')}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-10">
        <h1 className="text-5xl text-center font-bold">{t('tools.title')}</h1>
        <p className="text-muted-foreground text-center max-w-lg mx-auto text-sm">
          {t('tools.description')}
        </p>
        <TechnologyGridPage />
      </div>
    </div>
  )
}
