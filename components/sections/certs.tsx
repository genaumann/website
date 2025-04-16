import Icon, {IconName, IconPrefix} from '@/components/ui/icon'
import {getLocale, getTranslations} from 'next-intl/server'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '../ui/card'
import {getCert} from '@/lib/cert'
import {cn} from '@/lib/cn'
import {Badge} from '../ui/badge'
import {getDateFunctions} from '@/lib/dates'
import {LOCALES} from '@/locales'
import Link from 'next/link'

export interface CertItem {
  name: string
  issuer: string
  validFrom: Date
  validTo?: Date
  url: string
  icon?: IconName
  iconPrefix?: IconPrefix
  className?: string
}

export default async function Certs() {
  const t = await getTranslations()
  const certs = getCert()
  const {format} = getDateFunctions((await getLocale()) as LOCALES)

  return (
    <section id="cert" className="py-20 container">
      <h2 className="text-5xl text-center mb-12">{t('common.certificates')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certs.map(cert => {
          const isActive = cert.validTo ? new Date() < cert.validTo : true
          return (
            <Link
              href={cert.url}
              key={cert.name}
              rel="noopener noreferrer"
              target="_blank"
              className="group">
              <Card className="overflow-hidden bg-secondary/40">
                <CardHeader className="bg-secondary/40 py-4 px-6 min-h-[88px]">
                  <CardTitle className="text-xl font-semibold">
                    {cert.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center bg-background p-0">
                  <Icon
                    name={cert.icon || 'file-certificate'}
                    prefix={cert.iconPrefix}
                    className={cn(
                      'text-7xl py-7 text-muted-foreground transition-transform duration-300 ease-in-out group-hover:scale-150',
                      cert.className
                    )}
                  />
                </CardContent>
                <CardFooter className="bg-secondary/40 grid grid-cols-3 py-4">
                  <p className="text-muted-foreground place-self-start">
                    {cert.issuer}
                  </p>
                  <Badge className="place-self-center">
                    {isActive ? t('common.active') : t('common.expired')}
                  </Badge>
                  <p className="text-muted-foreground place-self-end">
                    {format(cert.validFrom, 'MM/yyyy')}
                  </p>
                </CardFooter>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
