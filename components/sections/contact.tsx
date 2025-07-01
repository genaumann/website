import Link from 'next/link'
import Icon from '../ui/icon'
import {CONTACT} from '@/lib/contact'
import {Button} from '../ui/button'
import {cn} from '@/lib/cn'
import {getTranslate} from '@/lib/integrations/tolgee/server'

export default async function ContactSection({
  className
}: {
  className?: string
}) {
  const t = await getTranslate()
  return (
    <section className={cn('py-20', className)}>
      <div className="container flex flex-col justify-center items-center gap-5">
        <div className="flex flex-col">
          <span>{t('questions')}?</span>
          <span className="text-3xl font-semibold text-center">
            {t('getInTouch')}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-[800px]">
          <Link
            href={`mailto:${CONTACT.email}`}
            className="flex flex-row md:flex-col gap-4 justify-between items-center bg-muted/20 p-4 rounded-lg shadow-all-md shadow-secondary space-y-4 w-full order-2 md:order-1">
            <div className="text-xl mb-0">
              <Icon name="envelope" />
              <span className="ml-2">{t('email')}</span>
            </div>
            <span className="underline md:hidden mb-0">{CONTACT.email}</span>
            <Button className="hidden md:block" variant="outline">
              {CONTACT.email}
            </Button>
          </Link>
          <Link
            href="/contact"
            className="flex flex-row md:flex-col gap-4 justify-between items-center bg-muted/20 p-4 rounded-lg space-y-4 order-1 md:order-2 shadow-all-md shadow-primary">
            <div className="text-xl mb-0">
              <Icon name="message" />
              <span className="ml-2">{t('contactForm')}</span>
            </div>
            <div className="md:hidden mb-0">
              <Icon name="arrow-right" size="xl" />
            </div>
            <Button className="hidden md:block" variant="outline">
              {t('goToContactForm')}
              <Icon className="md:hidden" name="arrow-right" />
            </Button>
          </Link>
          <Link
            href={`tel:${CONTACT.phone}`}
            className="flex flex-row md:flex-col gap-4 justify-between items-center bg-muted/20 p-4 shadow-all-md shadow-secondary rounded-lg space-y-4 order-3">
            <div className="text-xl mb-0">
              <Icon name="phone" />
              <span className="ml-2">{t('phone')}</span>
            </div>
            <span className="underline md:hidden mb-0">{CONTACT.phone}</span>
            <Button className="hidden md:block" variant="outline">
              {CONTACT.phone}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
