import {evaluate} from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import matter from 'gray-matter'
import remarkGfm from 'remark-gfm'
import remarkCodeBlock from './remark/codeblock'
import {MDXComponents} from '@/components/mdx'
import type {MDXFrontmatter} from './types'

interface CompileMdxOptions {
  readonly withCodeBlockPlugin?: boolean
}

export async function compileMdxSource<TFrontmatter = MDXFrontmatter>(
  source: string,
  options?: CompileMdxOptions
) {
  const {content: body, data} = matter(source)
  const {default: Content} = await evaluate(body, {
    ...runtime,
    remarkPlugins: [
      remarkGfm,
      ...(options?.withCodeBlockPlugin !== false ? [remarkCodeBlock] : [])
    ]
  })

  return {
    content: <Content components={MDXComponents} />,
    frontmatter: data as TFrontmatter
  }
}
