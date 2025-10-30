import CVPDF from '@/components/pdf/cv'
import {DocumentProps} from '@react-pdf/renderer'
import {Locale, TType} from '@/lib/types'

export type PDFBuildArgs = {
  t: TType
  locale: Locale
}

export type PDFFileBuilder = (
  args: PDFBuildArgs
) => React.ReactElement<DocumentProps>

export const PDF_FILES = {
  cv: ({t, locale}) => <CVPDF t={t} locale={locale} />
} satisfies Record<string, PDFFileBuilder>

export type PDFFileId = keyof typeof PDF_FILES


