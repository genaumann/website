import {Code, Parent, Root} from 'mdast'
import {MdxJsxFlowElement, MdxJsxAttribute} from 'mdast-util-mdx'
import {Plugin, Transformer} from 'unified'
import {visit} from 'unist-util-visit'

const countLines = (str: string) => {
  const matches = str.match(/\n/g)
  return matches ? matches.length : 0
}

const parseStringToObject = (str: string | null | undefined) => {
  if (!str) {
    return []
  }
  const arr = str.split(' ')

  return arr.map(item => {
    const [name, value] = item.split('=')
    return {
      type: 'mdxJsxAttribute',
      name: name,
      value: value.replace(/"/g, '')
    } as MdxJsxAttribute
  })
}

const transformer: Transformer<Root> = ast => {
  visit(
    ast,
    'code',
    (node: Code, index: number | undefined, parent: Parent | undefined) => {
      parent!.children[index!] = {
        type: 'mdxJsxFlowElement',
        name: 'CodeBlock',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'line',
            value: countLines(node.value) + 1
          },
          {
            type: 'mdxJsxAttribute',
            name: 'language',
            value: node.lang ? node.lang : 'nohighlight'
          },
          ...parseStringToObject(node.meta)
        ],
        children: [
          {
            type: 'code',
            value: node.value,
            lang: node.lang ? node.lang : 'nohighlight'
          }
        ]
      } as MdxJsxFlowElement
    }
  )
}

export const remarkCodeblock: Plugin<[], Root> = () => transformer
export default remarkCodeblock
