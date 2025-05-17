import {ReadonlyURLSearchParams} from 'next/navigation'

export const createQueryString = (
  searchParams: ReadonlyURLSearchParams,
  name: string,
  value: string
) => {
  const params = new URLSearchParams(searchParams.toString())
  if (value === '') {
    params.delete(name)
  } else {
    params.set(name, value)
  }
  return params.toString()
}

export const origin =
  process.env.VERCEL_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || ''}`
    : process.env.VERCEL_ENV === 'preview'
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : 'http://localhost:3000'
