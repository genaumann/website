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
import {useTranslate} from '@tolgee/react'

export default function MobileSidebar({articles}: {articles: Article[]}) {
  const {t} = useTranslate('kb')

  return (
    <Drawer>
      <DrawerTrigger className="md:hidden" asChild>
        <Button size="icon" variant="ghost" className="hover:bg-inherit w-fit">
          <Icon name="list" />
          {t('moreArticles')}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-0 max-h-[70%] overflow-auto h-fit">
        <DrawerHeader>
          <DrawerTitle>{t('kb', {ns: 'common'})}</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <ArticleSidebar articles={articles} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
