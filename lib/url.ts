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
