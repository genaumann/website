'use client'

import Icon from '@/components/ui/icon'
import {Technology} from '@/lib/types'
import {useMemo, useState, useEffect, startTransition} from 'react'
import {useTheme} from 'next-themes'

type TechnologyIconProps = Pick<Technology, 'icon' | 'iconPrefix'>

export default function TechnologyIcon({
  icon,
  iconPrefix
}: TechnologyIconProps) {
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

  return <Icon name={iconName} prefix={iconPrefix} aria-hidden="true" />
}
