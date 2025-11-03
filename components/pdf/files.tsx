import CVPDF from '@/components/pdf/cv'
import ProjectPDF from '@/components/pdf/project'
import {DocumentProps} from '@react-pdf/renderer'
import {Locale, Project, TType} from '@/lib/types'

export type PDFBuildArgsBase = {
  t: TType
  locale: Locale
}

export type PDFBuildArgsCV = PDFBuildArgsBase

export type PDFBuildArgsProject = PDFBuildArgsBase & {
  project: Project
}

export type PDFBuildArgs = PDFBuildArgsCV | PDFBuildArgsProject

export type PDFFileBuilder<T extends PDFBuildArgs = PDFBuildArgs> = (
  args: T
) => React.ReactElement<DocumentProps>

type PDFFileConfig = {
  cv: {
    builder: PDFFileBuilder<PDFBuildArgsCV>
    params?: never
  }
  project: {
    builder: PDFFileBuilder<PDFBuildArgsProject>
    params: {
      projectid: Project['id']
    }
  }
}

export const PDF_FILES = {
  cv: ({t, locale}: PDFBuildArgsCV) => <CVPDF t={t} locale={locale} />,
  project: ({t, locale, project}: PDFBuildArgsProject) => (
    <ProjectPDF project={project} locale={locale} t={t} />
  )
} satisfies {
  [K in keyof PDFFileConfig]: PDFFileConfig[K]['builder']
}

export type PDFFileId = keyof typeof PDF_FILES
export type PDFFileParams<T extends PDFFileId> = PDFFileConfig[T]['params']

// Helper type to convert params to button props - extracts all params from PDFFileParams
type PDFButtonParams<T extends PDFFileId> =
  PDFFileParams<T> extends undefined | never ? {} : PDFFileParams<T>

// Automatically generate button props from PDFFileConfig
export type DownloadPDFButtonProps = {
  [K in PDFFileId]: {
    file: K
    label?: string
  } & PDFButtonParams<K>
}[PDFFileId]
