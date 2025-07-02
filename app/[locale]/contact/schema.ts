import {TType} from '@/lib/types'
import {z} from 'zod'

export const getContactFormSchema = (t: TType) => {
  return z.object({
    name: z
      .string()
      .min(2, {message: t('formErrors.minString', {ns: 'contact', min: 2})}),
    phone: z.string().optional(),
    email: z.string().email({message: t('formErrors.email', {ns: 'contact'})}),
    message: z
      .string()
      .min(5, {message: t('formErrors.minString', {ns: 'contact', min: 5})})
  })
}

export type ContactFormSchema = z.infer<
  Awaited<ReturnType<typeof getContactFormSchema>>
>
