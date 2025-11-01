import {Page, Text, View, Font, Link} from '@react-pdf/renderer'
import {createTw} from 'react-pdf-tailwind'
import {IconName, IconPrefix} from '../ui/icon'
import IconPDF from './icon'
import {getDateFunctions} from '@/lib/dates'
import {Locale} from '@/lib/types'
import {LOCALES} from '@/locales'

Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuOKfMZg.ttf',
      fontWeight: 300,
      fontStyle: 'normal'
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf',
      fontWeight: 400,
      fontStyle: 'normal'
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf',
      fontWeight: 700,
      fontStyle: 'normal'
    }
  ]
})

Font.register({
  family: 'Oswald',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/oswald/v57/TK3_WkUHHAIjg75cFRf3bXL8LICs169vgUE.ttf',
      fontWeight: 300,
      fontStyle: 'normal'
    },
    {
      src: 'https://fonts.gstatic.com/s/oswald/v57/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvgUE.ttf',
      fontWeight: 400,
      fontStyle: 'normal'
    },
    {
      src: 'https://fonts.gstatic.com/s/oswald/v57/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZogUE.ttf',
      fontWeight: 700,
      fontStyle: 'normal'
    }
  ]
})

export const tw = createTw({
  fontFamily: {
    inter: ['Inter'],
    oswald: ['Oswald']
  },
  colors: {
    light: '#f1f8f1',
    muted: '#d6e4cd',
    primary: '#00e639'
  }
})

export function BasePagePDF({
  children,
  locale,
  style
}: {
  children: React.ReactNode
  style?: string
  locale?: Locale
}) {
  const {format} = getDateFunctions(locale || LOCALES.de)
  const date = format(new Date(), 'dd. MMMM yyyy')
  return (
    <Page
      size="A4"
      style={tw(`p-12 font-inter bg-white relative${style ? ` ${style}` : ''}`)}
      wrap>
      {children}
      <View
        fixed
        style={tw(
          'px-12 flex flex-row justify-between absolute bottom-0 left-0 right-0 py-12'
        )}>
        <Text style={tw('text-xs font-inter')}>{date}</Text>
        <Text
          style={{fontFamily: 'Inter', fontSize: '8px'}}
          render={({pageNumber, totalPages}) => `${pageNumber} / ${totalPages}`}
        />
      </View>
    </Page>
  )
}

type IconPDFProps = {
  icon?: IconName
  iconPrefix?: IconPrefix
  iconSize?: number
}

export function BaseLinkBadgePDF({
  src,
  text,
  icon,
  iconPrefix,
  outerStyle,
  iconSize = 10
}: {src: string; outerStyle?: string; text: string} & IconPDFProps) {
  return (
    <Link
      src={src}
      style={tw(
        `flex flex-row gap-1 items-center border border-black rounded-md px-1.5 py-1 no-underline${outerStyle ? ` ${outerStyle}` : ''}`
      )}>
      {icon && (
        <IconPDF
          name={icon}
          prefix={iconPrefix}
          width={iconSize}
          height={iconSize}
        />
      )}
      <Text style={tw('font-inter text-xs text-black font-light -mt-0.5')}>
        {text}
      </Text>
    </Link>
  )
}

export function BaseMutedBadgePDF({
  text,
  icon,
  iconPrefix,
  outerStyle,
  iconSize = 8
}: {
  text: string
  outerStyle?: string
} & IconPDFProps) {
  return (
    <View
      style={tw(
        `flex flex-row gap-1 items-center border border-muted rounded-md px-1.5 py-1 text-xs${outerStyle ? ` ${outerStyle}` : ''}`
      )}>
      {icon && (
        <IconPDF
          name={icon}
          prefix={iconPrefix}
          width={iconSize}
          height={iconSize}
        />
      )}
      <Text style={tw('font-inter text-xs font-light -mt-0.5')}>{text}</Text>
    </View>
  )
}

type TextSegment = {
  text: string
  bold?: boolean
  italic?: boolean
}

function parseMarkdownToSegments(markdown: string): TextSegment[] {
  const boldRegex = /\*\*(.+?)\*\*/g
  const boldMatches: Array<{start: number; end: number; text: string}> = []
  let match
  while ((match = boldRegex.exec(markdown)) !== null) {
    boldMatches.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[1]
    })
  }

  const isBoldRange = new Array(markdown.length).fill(false)
  for (const boldMatch of boldMatches) {
    for (let i = boldMatch.start; i < boldMatch.end; i++) {
      isBoldRange[i] = true
    }
  }

  const italicRegex = /\*([^*]+?)\*/g
  const italicMatches: Array<{start: number; end: number; text: string}> = []
  let italicMatch
  while ((italicMatch = italicRegex.exec(markdown)) !== null) {
    const start = italicMatch.index
    const end = italicMatch.index + italicMatch[0].length

    let isInsideBold = false
    for (let i = start; i < end; i++) {
      if (isBoldRange[i]) {
        isInsideBold = true
        break
      }
    }

    if (!isInsideBold) {
      italicMatches.push({
        start,
        end,
        text: italicMatch[1]
      })
    }
  }

  const allMatches = [
    ...boldMatches.map(m => ({...m, type: 'bold' as const})),
    ...italicMatches.map(m => ({...m, type: 'italic' as const}))
  ].sort((a, b) => a.start - b.start)

  const segments: TextSegment[] = []
  let lastIndex = 0

  for (const matchItem of allMatches) {
    if (matchItem.start > lastIndex) {
      const textBefore = markdown.slice(lastIndex, matchItem.start)
      if (textBefore) {
        segments.push({text: textBefore})
      }
    }

    segments.push({
      text: matchItem.text,
      bold: matchItem.type === 'bold',
      italic: matchItem.type === 'italic'
    })

    lastIndex = matchItem.end
  }

  if (lastIndex < markdown.length) {
    const textAfter = markdown.slice(lastIndex)
    if (textAfter) {
      segments.push({text: textAfter})
    }
  }

  if (segments.length === 0) {
    return [{text: markdown}]
  }

  return segments
}

type ContentBlock = {
  type: 'text' | 'list-item'
  content: string
}

function parseMarkdownContent(content: string): ContentBlock[] {
  const lines = content.split('\n')
  const blocks: ContentBlock[] = []
  let lastWasEmpty = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()

    // Prüfe ob es eine Liste ist (beginnt mit - oder *)
    if (trimmedLine.match(/^[-*]\s+/)) {
      // Entferne das Listen-Präfix (- oder *) und das folgende Leerzeichen
      const listContent = trimmedLine.replace(/^[-*]\s+/, '')
      blocks.push({
        type: 'list-item',
        content: listContent
      })
      lastWasEmpty = false
    } else if (trimmedLine) {
      // Normale Textzeile
      // Wenn die letzte Zeile leer war oder es ein anderer Block-Typ war, starte neuen Block
      if (
        lastWasEmpty ||
        blocks.length === 0 ||
        blocks[blocks.length - 1].type !== 'text'
      ) {
        blocks.push({
          type: 'text',
          content: trimmedLine
        })
      } else {
        // Ansonsten füge zum letzten Textblock hinzu
        blocks[blocks.length - 1].content += ' ' + trimmedLine
      }
      lastWasEmpty = false
    } else {
      // Leere Zeile - markiere für nächste Iteration
      lastWasEmpty = true
    }
  }

  return blocks
}

function renderMarkdownText(content: string) {
  const segments = parseMarkdownToSegments(content)

  return (
    <Text>
      {segments.map((segment, index) => (
        <Text
          key={index}
          style={
            segment.bold
              ? tw('font-bold')
              : segment.italic
                ? tw('italic')
                : undefined
          }>
          {segment.text}
        </Text>
      ))}
    </Text>
  )
}

export function MarkdownTextPDF({children}: {children: string}) {
  const blocks = parseMarkdownContent(children)

  return (
    <View style={tw('flex flex-col gap-1')}>
      {blocks.map((block, index) => {
        if (block.type === 'list-item') {
          return (
            <View key={index} style={tw('flex flex-row gap-2 pl-4')}>
              <Text style={tw('font-inter')}>•</Text>
              <View style={tw('flex-1')}>
                {renderMarkdownText(block.content)}
              </View>
            </View>
          )
        } else if (block.content) {
          return <View key={index}>{renderMarkdownText(block.content)}</View>
        }
        return null
      })}
    </View>
  )
}
