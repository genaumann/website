import {useTranslations} from 'next-intl'
import {z} from 'zod'

// const t = useTranslations('contact.form')

export const getContactFormSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    name: z.string().min(2, {message: t('errors.minString', {min: 2})}),
    phone: z.string().optional(),
    email: z.string().email({message: t('errors.email')}),
    message: z.string().min(5, {message: t('errors.minString', {min: 5})})
  })

export type ContactFormSchema = z.infer<ReturnType<typeof getContactFormSchema>>
