import Link from 'next/link'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from './card'
import Icon from './icon'
import {cn} from '@/lib/cn'
import {Badge} from './badge'
import {getDateFunctions} from '@/lib/dates'
import {getLocale} from '@/lib/cookie'
import {LOCALES} from '@/locales'
import {getCertsByKeyword, certs as certData} from '@/lib/cert'
import {getTranslate} from '@/lib/integrations/tolgee/server'

type CertGridProps = {
  keyword?: string
}

export default async function CertGrid({keyword}: CertGridProps) {
  const t = await getTranslate()
  const {format} = getDateFunctions((await getLocale()) as LOCALES)
  const certs = keyword ? getCertsByKeyword(keyword) : certData

  return (
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
            <Card className="overflow-hidden bg-transparent border border-border shadow dark:shadow-primary">
              <CardHeader className="py-4 px-6 min-h-[88px] bg-card">
                <CardTitle className="text-xl font-semibold">
                  {cert.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center p-0">
                <Icon
                  name={cert.icon || 'file-certificate'}
                  prefix={cert.iconPrefix}
                  className={cn(
                    'text-7xl py-7 text-muted-foreground transition-transform duration-300 ease-in-out group-hover:scale-150',
                    cert.className
                  )}
                />
              </CardContent>
              <CardFooter className="grid grid-cols-3 py-4 bg-card">
                <p className="text-muted-foreground place-self-start">
                  {cert.issuer}
                </p>
                <Badge className="place-self-center">
                  {isActive ? t('active') : t('expired')}
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
  )
}
