import {MDXComponents as MDXComponentsType} from 'mdx/types'
import CodeBlock from '@/components/mdx/codeblock'
import ExternalCodeBlock from '@/components/mdx/external-codeblock'
import Admonition from '@/components/mdx/admonition'
import {Grid, GridItem} from '@/components/mdx/grid'
import ArticleGrid from '@/components/mdx/article-grid'
import {Tabs, TabItem} from '@/components/mdx/tabs'
import Link from 'next/link'

export const MDXComponents: Readonly<MDXComponentsType> = {
  a: props => {
    const href = props.href || ''
    const isExternal = href.startsWith('http')
    return (
      <Link
        {...props}
        {...(isExternal ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
      />
    )
  },
  CodeBlock,
  Admonition,
  Tabs,
  TabItem,
  Grid,
  GridItem,
  ArticleGrid,
  ExternalCodeBlock
}
