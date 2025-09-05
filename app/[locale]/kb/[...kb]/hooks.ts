import {getFlatArticleIndex} from '@/lib/mdx'
import {Article, Locale} from '@/lib/types'
import useSWR from 'swr'

export const useArticleIndex = (locale: Locale) => {
  const {data, isLoading} = useSWR<Article[]>(['articleIndex', locale], () =>
    getFlatArticleIndex(locale)
  )
  return {data, isLoading}
}
