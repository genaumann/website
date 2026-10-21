'use server'

import {checkBotId} from 'botid/server'
import {headers} from 'next/headers'
import {MailjetClient} from '@/lib/mailjet'
import {getContactFormSchema} from './schema'
import {render} from 'react-email'
import ContactFormEmailTemplate from '@/components/email/contact-form'
import {CONTACT} from '@/lib/contact'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {allowContactSubmit} from '@/lib/contact-rate-limit'

const clientIp = (
  headerStore: Awaited<ReturnType<typeof headers>>
): string => {
  const realIp = headerStore.get('x-real-ip')?.trim()
  if (realIp) return realIp

  const forwarded = headerStore.get('x-forwarded-for')
  const first = forwarded?.split(',')[0]?.trim()
  return first || 'unknown'
}

export async function sendContactEmail(input: unknown): Promise<boolean> {
  const t = await getTranslate('contact', {noWrap: true})
  const parsed = getContactFormSchema(t).safeParse(input)
  if (!parsed.success) return false

  const verification = await checkBotId()
  if (verification.isBot) return false

  const headerStore = await headers()
  if (!allowContactSubmit(clientIp(headerStore))) return false

  const {name, phone, email, message} = parsed.data
  const subjectName = name.replace(/[\r\n]/g, '')
  const mailClient = new MailjetClient()
  const subject = t('contactFormSubmittedBy', {name: subjectName})

  const template = (
    <ContactFormEmailTemplate
      name={subjectName}
      email={email}
      phone={phone}
      message={message}
    />
  )

  const [html, text] = await Promise.all([
    render(template),
    render(template, {plainText: true})
  ])

  return await mailClient.sendMail({
    to: {email: CONTACT.email, name: CONTACT.name},
    subject,
    text,
    html
  })
}
