'use client'

import TocSkeleton from './skeleton'
import dynamic from 'next/dynamic'

const TableOfContents = dynamic(
  () => import('@/components/kb/toc').then(mod => mod.default),
  {
    loading: () => <TocSkeleton />,
    ssr: false
  }
)

export default function TocWrapper() {
  return <TableOfContents />
}
