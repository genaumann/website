import {TType} from '@/lib/types'
import {z} from 'zod'

const CONTROL_CHARS = /[\u0000-\u001F\u007F]/
const PHONE_CHARS = /^[+0-9\s()./-]*$/

export const getContactFormSchema = (t: TType) => {
  const nameMessage = t('formErrors.minString', {ns: 'contact', min: 2})
  const messageError = t('formErrors.minString', {ns: 'contact', min: 5})
  const emailMessage = t('formErrors.email', {ns: 'contact'})

  return z.object({
    name: z
      .string()
      .trim()
      .min(2, {message: nameMessage})
      .max(100, {message: nameMessage})
      .refine(value => !CONTROL_CHARS.test(value), {message: nameMessage}),
    phone: z
      .string()
      .trim()
      .max(30, {message: emailMessage})
      .regex(PHONE_CHARS, {message: emailMessage})
      .optional(),
    email: z
      .string()
      .trim()
      .max(254, {message: emailMessage})
      .check(z.email({error: emailMessage})),
    message: z
      .string()
      .trim()
      .min(5, {message: messageError})
      .max(5000, {message: messageError})
  })
}

export type ContactFormSchema = z.infer<
  Awaited<ReturnType<typeof getContactFormSchema>>
>
