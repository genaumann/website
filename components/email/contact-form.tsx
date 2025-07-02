import BaseEmailTemplate from './base'
import {Column, Link, Row, Section, Text} from '@react-email/components'
import {ContactFormSchema} from '@/app/[locale]/contact/schema'
import {convertNewlinesToBreaks} from '@/lib/email'
import {getTranslate} from '@/lib/integrations/tolgee/server'

export default async function ContactFormEmailTemplate({
  name,
  phone,
  message,
  email
}: ContactFormSchema) {
  const t = await getTranslate('contact', {noWrap: true})
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
              <Link href={`tel:${phone}`} className="text-primary underline">
                {phone}
              </Link>
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
