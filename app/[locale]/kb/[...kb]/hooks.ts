import {getFlatArticleIndex} from '@/lib/mdx'
import {Article} from '@/lib/types'
import {LOCALES} from '@/locales'
import useSWR from 'swr'

export const useArticleIndex = (locale: string) => {
  const {data, isLoading} = useSWR<Article[]>(['articleIndex', locale], () =>
    getFlatArticleIndex(locale as keyof typeof LOCALES)
  )
  return {data, isLoading}
}
