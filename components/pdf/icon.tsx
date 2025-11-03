import {Svg, Path} from '@react-pdf/renderer'
import {byPrefixAndName} from '@awesome.me/kit-b84c272999/icons'
import {IconDefinition} from '@fortawesome/fontawesome-svg-core'
import {tw} from './base'
import {defaultPrefix, IconName, IconPrefix} from '../ui/icon'

export interface IconPDFProps {
  name: IconName
  prefix?: IconPrefix
  width?: number | string
  height?: number | string
  fill?: string
  style?: Record<string, unknown> | ReturnType<typeof tw>
}

export default function IconPDF({
  name,
  prefix = defaultPrefix as IconPrefix,
  width = 16,
  height = 16,
  fill = 'currentColor',
  style
}: IconPDFProps) {
  const iconDef = byPrefixAndName[prefix]?.[name] as IconDefinition

  if (!iconDef) {
    console.warn(`Icon "${name}" with prefix "${prefix}" not found`)
    return null
  }

  const [iconWidth, iconHeight, , , svgPathData] = iconDef.icon

  const paths = Array.isArray(svgPathData) ? svgPathData : [svgPathData]

  return (
    <Svg
      viewBox={`0 0 ${iconWidth} ${iconHeight}`}
      style={{width, height, ...style}}>
      {paths.map((pathData, index) => (
        <Path key={index} fill={fill} d={pathData} />
      ))}
    </Svg>
  )
}
