'use client'

import {Article} from '@/lib/types'
import {Button} from '../ui/button'
import Icon from '../ui/icon'
import {ArticleSidebar} from './sidebar'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '../ui/drawer'
import {useTranslations} from 'next-intl'
import {useEffect, useState} from 'react'

export default function MobileSidebar({articles}: {articles: Article[]}) {
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const t = useTranslations()

  useEffect(() => {
    setContainer(document.getElementsByTagName('main')[0])
  }, [])

  return (
    <Drawer container={container}>
      <DrawerTrigger className="md:hidden" asChild>
        <Button size="icon" variant="ghost" className="hover:bg-inherit w-fit">
          <Icon name="list" />
          {t('kb.moreArticles')}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-0 max-h-[70%] overflow-auto h-fit">
        <DrawerHeader>
          <DrawerTitle>{t('common.knowledgebase')}</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <ArticleSidebar articles={articles} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
