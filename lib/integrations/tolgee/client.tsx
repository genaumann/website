'use client'

import {ReactNode, useEffect} from 'react'
import {
  CachePublicRecord,
  TolgeeProvider,
  TolgeeStaticData
} from '@tolgee/react'
import {useRouter} from 'next/navigation'
import {TolgeeBase} from '.'
import {Locale} from '@/lib/types'

type Props = {
  staticData: TolgeeStaticData | CachePublicRecord[]
  language: Locale
  children: ReactNode
}

const tolgee = TolgeeBase().init({
  defaultNs: 'common'
})

export const TolgeeNextProvider = ({language, staticData, children}: Props) => {
  const router = useRouter()

  useEffect(() => {
    const {unsubscribe} = tolgee.on('permanentChange', () => {
      router.refresh()
    })
    return () => unsubscribe()
  }, [tolgee, router])

  return (
    <TolgeeProvider tolgee={tolgee} ssr={{language, staticData}}>
      {children}
    </TolgeeProvider>
  )
}
