import {getFlatArticleIndex} from '@/lib/mdx'
import {Article} from '@/lib/types'
import {LOCALES} from '@/locales'
import useSWR from 'swr'

export const useArticleIndex = (locale: LOCALES) => {
  const {data, isLoading} = useSWR<Article[]>(['articleIndex', locale], () =>
    getFlatArticleIndex(locale)
  )
  return {data, isLoading}
}
