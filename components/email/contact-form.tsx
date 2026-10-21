import BaseEmailTemplate from './base'
import {Column, Link, Row, Section, Text} from 'react-email'
import {ContactFormSchema} from '@/app/[locale]/contact/schema'
import {convertNewlinesToBreaks} from '@/lib/email'
import {getTranslate} from '@/lib/integrations/tolgee/server'

const TEL_HREF = /^\+?\d+$/

const toTelHref = (phone: string): string | null => {
  const compact = phone.replace(/[^\d+]/g, '')
  if (!TEL_HREF.test(compact)) return null
  return `tel:${compact}`
}

export default async function ContactFormEmailTemplate({
  name,
  phone,
  message,
  email
}: ContactFormSchema) {
  const t = await getTranslate('contact', {noWrap: true})
  const telHref = phone ? toTelHref(phone) : null
  return (
    <BaseEmailTemplate
      title={t('contactFormSubmitted')}
      previewText={t('contactFormSubmittedBy', {name})}>
      <Text className="text-[16px]">{t('contactFormSubmittedBy', {name})}</Text>
      <Section>
        <Row>
          <Column className="font-semibold w-[30%]">
            {t('name', {ns: 'common'})}
          </Column>
          <Column>{name}</Column>
        </Row>
        <Row>
          <Column className="font-semibold w-[30%]">
            {t('email', {ns: 'common'})}
          </Column>
          <Column>
            <Link href={`mailto:${email}`} className="text-primary underline">
              {email}
            </Link>
          </Column>
        </Row>
        {phone && (
          <Row>
            <Column className="font-semibold w-[30%]">
              {t('phone', {ns: 'common'})}
            </Column>
            <Column>
              {telHref ? (
                <Link href={telHref} className="text-primary underline">
                  {phone}
                </Link>
              ) : (
                phone
              )}
            </Column>
          </Row>
        )}
        <Row>
          <Column className="font-semibold w-[30%]">
            {t('message', {ns: 'common'})}
          </Column>
          <Column>{convertNewlinesToBreaks(message)}</Column>
        </Row>
      </Section>
    </BaseEmailTemplate>
  )
}
