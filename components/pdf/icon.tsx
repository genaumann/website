import {
  Circle,
  Ellipse,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Svg
} from '@react-pdf/renderer'
import type {ReactElement, ReactNode} from 'react'

type SvgTag =
  | 'path'
  | 'circle'
  | 'line'
  | 'polyline'
  | 'polygon'
  | 'rect'
  | 'ellipse'

type PdfIconProps = {
  icon: string
  size?: number
  color?: string
  strokeWidth?: number
}

type ElementAttrs = Record<string, string | number>

function kebabToCamel(attr: string): string {
  return attr.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase())
}

function parseAttributes(raw: string): ElementAttrs {
  const attrs: ElementAttrs = {}
  const attrRegex = /([a-zA-Z_:][\w:.-]*)\s*=\s*"([^"]*)"/g
  let match: RegExpExecArray | null
  while ((match = attrRegex.exec(raw)) !== null) {
    const key = kebabToCamel(match[1])
    if (key === 'class' || key === 'key' || key === 'fill') continue
    const value = match[2]
    attrs[key] =
      /^-?\d+(\.\d+)?$/.test(value.trim()) ? Number(value) : value
  }
  return attrs
}

function renderElement(
  tag: SvgTag,
  attrs: ElementAttrs,
  key: number,
  color: string,
  strokeWidth: number
): ReactNode {
  const props = {
    key,
    fill: 'none',
    stroke: color,
    strokeWidth,
    ...attrs
  }

  switch (tag) {
    case 'path':
      return <Path {...props} d={String(attrs.d ?? '')} />
    case 'circle':
      return <Circle {...props} r={attrs.r ?? 0} />
    case 'line':
      return (
        <Line
          {...props}
          x1={attrs.x1 ?? 0}
          x2={attrs.x2 ?? 0}
          y1={attrs.y1 ?? 0}
          y2={attrs.y2 ?? 0}
        />
      )
    case 'polyline':
      return <Polyline {...props} points={String(attrs.points ?? '')} />
    case 'polygon':
      return <Polygon {...props} points={String(attrs.points ?? '')} />
    case 'rect':
      return (
        <Rect
          {...props}
          width={attrs.width ?? 0}
          height={attrs.height ?? 0}
        />
      )
    case 'ellipse':
      return (
        <Ellipse {...props} rx={attrs.rx ?? 0} ry={attrs.ry ?? 0} />
      )
  }
}

function parseLucideElements(
  svg: string,
  color: string,
  strokeWidth: number
): ReactElement[] {
  const tagNames = 'path|circle|line|polyline|polygon|rect|ellipse'
  const elementRegex = new RegExp(
    `<(${tagNames})\\s([^>]*?)\\s*\\/?>(?:</\\1>)?`,
    'gi'
  )
  const elements: ReactElement[] = []
  let match: RegExpExecArray | null
  let index = 0

  while ((match = elementRegex.exec(svg)) !== null) {
    const tag = match[1].toLowerCase() as SvgTag
    const element = renderElement(
      tag,
      parseAttributes(match[2]),
      index++,
      color,
      strokeWidth
    )
    if (element) {
      elements.push(element as ReactElement)
    }
  }

  return elements
}

export function PdfIcon({
  icon,
  size = 16,
  color = '#000000',
  strokeWidth = 2
}: PdfIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {parseLucideElements(icon, color, strokeWidth)}
    </Svg>
  )
}
