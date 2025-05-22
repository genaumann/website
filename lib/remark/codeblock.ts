import {visit} from 'unist-util-visit'
import {Plugin} from 'unified'
import {Code} from 'mdast'
import {codeToHtml} from 'shiki'
import {getShikiConfig} from '../shiki'

const parseMeta = (str: string | null | undefined) => {
  if (!str) {
    return []
  }

  const regex = /(\w+)=(['"])(.*?)\2/g
  const matches = str.matchAll(regex)

  return Array.from(matches).map(match => {
    const [, name, , value] = match
    return {
      type: 'mdxJsxAttribute',
      name,
      value
    }
  })
}

const remarkCodeMeta: Plugin = () => {
  return async tree => {
    const codeNodes: Code[] = []
    visit(tree, 'code', (node: Code) => {
      codeNodes.push(node)
    })

    for (const node of codeNodes) {
      if (node.meta || node.value) {
        const line = node.value ? node.value.split('\n').length : 0

        let code = node.value

        if (node.lang) {
          code = await codeToHtml(node.value, getShikiConfig(node.lang))
        }

        Object.assign(node, {
          type: 'mdxJsxFlowElement',
          name: 'CodeBlock',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'language',
              value: node.lang
            },
            {
              type: 'mdxJsxAttribute',
              name: 'line',
              value: line.toString()
            },
            {
              type: 'mdxJsxAttribute',
              name: 'code',
              value: code
            },
            ...parseMeta(node.meta)
          ],
          children: []
        })
      }
    }
  }
}

export default remarkCodeMeta
