'use server'

import {MailjetClient} from '@/lib/mailjet'
import {ContactFormSchema} from './schema'
import {render} from '@react-email/render'
import ContactFormEmailTemplate from '@/components/email/contact-form'
import {CONTACT} from '@/lib/contact'
import {getTranslate} from '@/lib/integrations/tolgee/server'

export async function sendContactEmail({
  name,
  phone,
  email,
  message
}: ContactFormSchema) {
  const t = await getTranslate('contact', {noWrap: true})
  const mailClient = new MailjetClient()
  const subject = t('contactFormSubmittedBy', {name})

  const template = (
    <ContactFormEmailTemplate
      name={name}
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
