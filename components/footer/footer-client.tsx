'use client'

import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion'
import {FooterNavigation} from './footer'

export function MobileFooterElements({
  navigation
}: {
  navigation: FooterNavigation
}) {
  return (
    <Accordion type="multiple">
      {Object.entries(navigation).map(([key, value]) => (
        <AccordionItem key={key} value={key}>
          <AccordionTrigger className="text-base">{key}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {value.map(item => (
              <Link key={item.name} href={item.href}>
                {item.name}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
