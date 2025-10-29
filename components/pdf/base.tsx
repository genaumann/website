import {Document, Page, Text, View, Font, Link} from '@react-pdf/renderer'
import {createTw} from 'react-pdf-tailwind'

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
    muted: '#d6e4cd'
  }
})

export function BasePagePDF({
  children,
  style
}: {
  children: React.ReactNode
  style?: string
}) {
  return (
    <Page size="A4" style={tw(`p-12 font-inter bg-white ${style}`)}>
      {children}
    </Page>
  )
}

export function BaseLinkBadgePDF({src, text}: {src: string; text: string}) {
  return (
    <Link
      src={src}
      style={tw('border border-black rounded-md px-1.5 py-1 no-underline')}>
      <Text style={tw('font-inter text-xs text-black font-light -mt-0.5')}>
        {text}
      </Text>
    </Link>
  )
}
