import {getTranslations} from 'next-intl/server'
import BaseEmailTemplate from './base'
import {Column, Link, Row, Section, Text} from '@react-email/components'
import {ContactFormSchema} from '@/app/[locale]/contact/schema'
import {convertNewlinesToBreaks} from '@/lib/email'

export default async function ContactFormEmailTemplate({
  name,
  phone,
  message,
  email
}: ContactFormSchema) {
  const t = await getTranslations('contact.mail')
  return (
    <BaseEmailTemplate title={t('title')} previewText={t('preview', {name})}>
      <Text className="text-[16px]">{t('intro')}</Text>
      <Section>
        <Row>
          <Column className="font-semibold w-[30%]">{t('name')}</Column>
          <Column>{name}</Column>
        </Row>
        <Row>
          <Column className="font-semibold w-[30%]">{t('email')}</Column>
          <Column>
            <Link href={`mailto:${email}`} className="text-primary underline">
              {email}
            </Link>
          </Column>
        </Row>
        {phone && (
          <Row>
            <Column className="font-semibold w-[30%]">{t('phone')}</Column>
            <Column>
              <Link href={`tel:${phone}`} className="text-primary underline">
                {phone}
              </Link>
            </Column>
          </Row>
        )}
        <Row>
          <Column className="font-semibold w-[30%]">{t('message')}</Column>
          <Column>{convertNewlinesToBreaks(message)}</Column>
        </Row>
      </Section>
    </BaseEmailTemplate>
  )
}
