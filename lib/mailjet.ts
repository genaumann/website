import {CONTACT} from './contact'

const MAILJET_API_URL = 'https://api.mailjet.com/v3.1/'
const ALLOWED_TEST_DOMAINS = ['gnaumann.de']

// https://dev.mailjet.com/email/guides/send-api-v31/
type SendMailResponse = {
  Messages: {
    Status: string
    To: [
      {
        Email: string
        MassageUUID: string
        MessageID: number
        MassageHref: string
      }
    ]
  }[]
}

export class MailjetClient {
  private authString: string

  constructor() {
    const apiKey = process.env.MAILJET_API_KEY
    const apiSecret = process.env.MAILJET_API_SECRET

    if (!apiKey || !apiSecret) {
      throw new Error('Mailjet API credentials not configured')
    }

    this.authString = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')
  }

  private async request(
    endpoint: string,
    options: RequestInit = {}
    // Add more specific types for possible responses
  ): Promise<SendMailResponse> {
    const response = await fetch(`${MAILJET_API_URL}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Basic ${this.authString}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    })

    const data = await response.json()
    return data
  }

  async sendMail({
    to,
    bcc,
    subject,
    text,
    html
  }: {
    to: {email: string; name: string}
    bcc?: {email: string; name: string}
    subject: string
    text: string
    html: string
  }): Promise<boolean> {
    const fromEmail = CONTACT.email
    const fromName = CONTACT.name

    const isAllowedTestDomain = ALLOWED_TEST_DOMAINS.some(domain =>
      to.email.endsWith(domain)
    )

    if (process.env.VERCEL_ENV === 'production' || isAllowedTestDomain) {
      const result = await this.request('send', {
        method: 'POST',
        body: JSON.stringify({
          Messages: [
            {
              From: {
                Email: fromEmail,
                Name: fromName
              },
              To: [
                {
                  Email: to.email,
                  Name: to.name
                }
              ],
              ...(bcc ? {Bcc: [{Email: bcc.email, Name: bcc.name}]} : {}),
              Subject: subject,
              TextPart: text,
              HTMLPart: html
            }
          ]
        })
      })
      console.dir(result, {depth: null})
      return result?.Messages?.[0]?.Status === 'success'
    }

    console.log(`Sendmail to ${to.email}`, subject)
    return true
  }
}
