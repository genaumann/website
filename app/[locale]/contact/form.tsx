'use client'

import {Button} from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import Icon, {IconName, IconPrefix} from '@/components/ui/icon'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {zodResolver} from '@hookform/resolvers/zod'
import {HTMLInputTypeAttribute, useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {ContactFormSchema, getContactFormSchema} from './schema'
import {sendContactEmail} from './actions'
import {useTranslate} from '@tolgee/react'

export default function ContactForm() {
  const {t} = useTranslate('contact')
  const inputRef = useRef<HTMLInputElement>(null)
  const formSchema = getContactFormSchema(t)
  const [submitState, setSubmitState] = useState<{
    submitted: boolean
    submitSuccess: boolean
  }>({submitSuccess: false, submitted: false})

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: ''
    },
    mode: 'onSubmit'
  })

  const onSubmit = async (data: ContactFormSchema) => {
    let response = false
    try {
      response = await sendContactEmail(data)
    } catch {
    } finally {
      setSubmitState({
        submitted: true,
        submitSuccess: response
      })
    }
  }

  type ContactFormField = {
    name: keyof ContactFormSchema
    label: string
    placeholder?: string
    type?: HTMLInputTypeAttribute
    element?: 'input' | 'textarea'
    icon: IconName
    iconPrefix?: IconPrefix
    initialFoucs?: boolean
  }

  const fields: ContactFormField[] = [
    {
      name: 'name',
      label: t('name', {ns: 'common'}),
      icon: 'user',
      type: 'text',
      element: 'input',
      initialFoucs: true
    },
    {
      name: 'phone',
      label: t('phone', {ns: 'common'}),
      type: 'tel',
      icon: 'phone',
      element: 'input'
    },
    {
      name: 'email',
      label: t('email', {ns: 'common'}),
      type: 'text',
      icon: 'envelope',
      element: 'input'
    },
    {
      name: 'message',
      label: t('message', {ns: 'common'}),
      type: 'textarea',
      icon: 'mailbox-flag-up',
      element: 'textarea'
    }
  ]

  return (
    <>
      {submitState.submitted && submitState.submitSuccess ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <Icon name="check-circle" className="text-primary" size="2xl" />
          <p className="text-center text-lg font-semibold">
            {t('successMessage')}
          </p>
          <Button
            className="mx-auto"
            onClick={() => {
              setSubmitState({submitted: false, submitSuccess: false})
              form.resetField('message')
            }}>
            {t('sendAnotherMessage')}
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="space-y-4">
            {fields.map(field => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({field: formField}) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-2">
                        <Icon name={field.icon} prefix={field.iconPrefix} />
                        {field.label}
                      </div>
                    </FormLabel>
                    <FormControl>
                      {field.element === 'input' ? (
                        <Input
                          {...formField}
                          type={field.type}
                          placeholder={field.placeholder}
                          disabled={form.formState.isSubmitting}
                          className="w-full"
                          ref={field.initialFoucs ? inputRef : undefined}
                        />
                      ) : (
                        <Textarea
                          {...formField}
                          placeholder={field.placeholder}
                          disabled={form.formState.isSubmitting}
                          rows={10}
                          className="w-full h-9"
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <Icon name="loader" spin />
              ) : (
                <Icon name="paper-plane" />
              )}
              {t('sendMessage')}
            </Button>
            {submitState.submitted && !submitState.submitSuccess && (
              <p className="text-destructive text-sm">{t('errorMessage')}</p>
            )}
          </form>
        </Form>
      )}
    </>
  )
}
