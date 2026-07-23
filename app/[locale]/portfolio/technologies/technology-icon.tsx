'use client'

import CustomIcon from '@/components/icons'
import {Technology} from '@/lib/types'
import {useMemo, useState, useEffect, startTransition} from 'react'
import {useTheme} from 'next-themes'

type TechnologyIconProps = Pick<Technology, 'icon'>

export default function TechnologyIcon({icon}: TechnologyIconProps) {
  const {theme, systemTheme} = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    startTransition(() => {
      setMounted(true)
    })
  }, [])

  const isDark = useMemo(
    () =>
      mounted &&
      (theme === 'dark' || (theme === 'system' && systemTheme === 'dark')),
    [mounted, theme, systemTheme]
  )

  const iconName =
    typeof icon === 'string' ? icon : icon[`${isDark ? 'dark' : 'light'}`]

  return <CustomIcon name={iconName} aria-hidden="true" />
}
