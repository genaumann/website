import * as React from 'react'
import {
  Html,
  Head,
  Font,
  Tailwind,
  Body,
  Preview,
  Section,
  Img,
  Container,
  Heading,
  Hr,
  Text,
  Link
} from '@react-email/components'
import {CONTACT} from '@/lib/contact'

export type BaseEmailTemplateProps = {
  title: string
  previewText: string
  children?: React.ReactNode
}

export default function BaseEmailTemplate({
  title,
  previewText,
  children
}: BaseEmailTemplateProps) {
  return (
    <Html lang="de">
      <Head>
        <title>{title}</title>
        <Font
          fontFamily="Oswald"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/oswald/v56/TK3iWkUHHAIjg752GT8Gl-1PKw.woff2',
            format: 'woff2'
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                background: '#fafffb',
                foreground: '#000000',
                muted: '#d6e4cd',
                'muted-foreground': '#555e57',
                primary: '#00e639'
              }
            }
          }
        }}>
        <Body className="bg-background text-foreground">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto py-[24px] px-[33px] border rounded border-muted border-solid">
            <Section>
              <Img
                src="https://gnaumann.de/logo.png"
                height={43}
                width={75}
                className="mx-auto mb-4"
                alt="Gino Naumann Logo"
              />
            </Section>
            <Section>
              <Heading className="text-center text-[30px]">
                {title}
                <Hr />
              </Heading>
            </Section>
            <Section>{children}</Section>
            <Section className="mt-[16px]">
              <Hr />
              <Text className="text-center text-[12px] text-muted-foreground">{`${CONTACT.name} | ${CONTACT.address.street} | ${CONTACT.address.postalCode} ${CONTACT.address.city}`}</Text>
              <Text className="text-center text-[12px] text-muted-foreground mt-0 mb-0">
                {`E-Mail: `}
                <Link
                  href={`mailto:${CONTACT.email}`}
                  className="underline text-muted-foreground">
                  {CONTACT.email}
                </Link>
              </Text>
              <Text className="text-center text-[12px] text-muted-foreground mt-0 mb-0">
                {`Telefon: `}
                <Link
                  href={`tel:${CONTACT.phone}`}
                  className="underline text-muted-foreground">
                  {CONTACT.phone}
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
