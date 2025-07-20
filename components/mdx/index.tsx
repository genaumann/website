import {MDXComponents as MDXComponentsType} from 'mdx/types'
import CodeBlock from '@/components/mdx/codeblock'
import ExternalCodeBlock from '@/components/mdx/external-codeblock'
import Admonition from '@/components/mdx/admonition'
import {Grid, GridItem} from '@/components/mdx/grid'
import ArticleGrid from '@/components/mdx/article-grid'
import {Tabs, TabItem} from '@/components/mdx/tabs'
import Link from 'next/link'
import Heading from './heading'

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
  h2: props => <Heading tag="h2" {...props} />,
  h3: props => <Heading tag="h3" {...props} />,
  h4: props => <Heading tag="h4" {...props} />,
  h5: props => <Heading tag="h5" {...props} />,
  h6: props => <Heading tag="h6" {...props} />,
  CodeBlock,
  Admonition,
  Tabs,
  TabItem,
  Grid,
  GridItem,
  ArticleGrid,
  ExternalCodeBlock
}
