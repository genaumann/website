'use client'

import Icon from '@/components/ui/icon'
import {Technology} from '@/lib/types'
import {useMemo} from 'react'
import {useTheme} from 'next-themes'

type TechnologyIconProps = Pick<Technology, 'icon' | 'iconPrefix'>

export default function TechnologyIcon({
  icon,
  iconPrefix
}: TechnologyIconProps) {
  const {theme, systemTheme} = useTheme()

  const isDark = useMemo(
    () => theme === 'dark' || (theme === 'system' && systemTheme === 'dark'),
    [theme, systemTheme]
  )

  return (
    <Icon
      name={
        typeof icon === 'string' ? icon : icon[`${isDark ? 'dark' : 'light'}`]
      }
      prefix={iconPrefix}
      aria-hidden="true"
    />
  )
}
