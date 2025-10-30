import {pdf} from '@react-pdf/renderer'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {NextRequest} from 'next/server'
import {LOCALES} from '@/locales'
import {PDF_FILES, PDFFileId} from '@/components/pdf/files'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const locale = searchParams.get('locale') || LOCALES.de
  const file = searchParams.get('file')
  const t = await getTranslate('cv', {language: locale})

  if (!file || !(file in PDF_FILES)) {
    return new Response('File not found', {status: 404})
  }

  const element = PDF_FILES[file as PDFFileId]({t, locale})
  const blob = await pdf(element).toBlob()

  return new Response(blob, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="ginonaumann-${file}-${locale}.pdf"`,
      'Cache-Control': 'no-store'
    }
  })
}
