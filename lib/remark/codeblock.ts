import {visit} from 'unist-util-visit'
import {Plugin} from 'unified'
import {Code} from 'mdast'
import {codeToHtml} from 'shiki'
import {getShikiConfig} from '../shiki'

const parseMeta = (meta: string): Record<string, string | boolean> => {
  const result: Record<string, string | boolean> = {}

  meta.split(' ').forEach(entry => {
    const [key, value] = entry.split('=')
    if (value === undefined) {
      result[key] = true
    } else {
      result[key] = value
    }
  })

  return result
}

const remarkCodeMeta: Plugin = () => {
  return async tree => {
    const codeNodes: Code[] = []
    visit(tree, 'code', (node: Code) => {
      codeNodes.push(node)
    })

    for (const node of codeNodes) {
      if (node.meta || node.value) {
        const meta = parseMeta(node.meta || '')
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
            ...Object.entries(meta).map(([key, value]) => ({
              type: 'mdxJsxAttribute',
              name: key,
              value: value.toString()
            }))
          ],
          children: []
        })
      }
    }
  }
}

export default remarkCodeMeta
