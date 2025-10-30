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
