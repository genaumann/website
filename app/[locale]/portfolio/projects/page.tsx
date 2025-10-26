import {getTranslate} from '@/lib/integrations/tolgee/server'
import ProjectsTable from './table'
import PortfolioProjectsMobileList from './mobile-list'
import {Breadcrumb, BreadcrumbList} from '@/components/ui/breadcrumb'
import {BreadcrumbItem} from '@/components/ui/breadcrumb'
import {BreadcrumbLink} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import {BreadcrumbSeparator} from '@/components/ui/breadcrumb'

export default async function ProjectsPage() {
  const t = await getTranslate('portfolio')
  return (
    <>
      <Breadcrumb className="container mt-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/portfolio">{t('portfolio', {ns: 'common'})}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{t('projects')}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="container pb-12">
        <h1 className="text-6xl font-bold py-12 text-center">
          {t('projects')}
        </h1>
        <div className="hidden md:block">
          <ProjectsTable />
        </div>
        <div className="block md:hidden">
          <PortfolioProjectsMobileList />
        </div>
      </section>
    </>
  )
}
