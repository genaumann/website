'use client'

import {useTheme} from 'next-themes'
import {SunIcon, MoonIcon, MonitorIcon} from 'lucide-react'
import {useEffect, useState, startTransition} from 'react'
import {useTranslate} from '@tolgee/react'
import {Button} from './button'

const themeConfig = [
  {
    name: 'dark',
    icon: MoonIcon
  },
  {
    name: 'light',
    icon: SunIcon
  },
  {
    name: 'system',
    icon: MonitorIcon
  }
] as const

export default function ThemeSwitch() {
  const {theme, setTheme} = useTheme()
  const {t} = useTranslate()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    startTransition(() => {
      setMounted(true)
    })
  }, [])

  const currentIndex = mounted
    ? themeConfig.findIndex(({name}) => name === theme)
    : -1
  const CurrentIcon =
    themeConfig[currentIndex >= 0 ? currentIndex : 2].icon

  const cycleTheme = () => {
    if (!mounted) return
    const nextIndex =
      currentIndex < 0 ? 0 : (currentIndex + 1) % themeConfig.length
    setTheme(themeConfig[nextIndex].name)
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="bg-background"
      onClick={cycleTheme}
      aria-label={t('themeSwitch')}>
      <CurrentIcon width={16} height={16} />
    </Button>
  )
}
