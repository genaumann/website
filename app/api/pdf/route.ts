import {pdf} from '@react-pdf/renderer'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {NextRequest} from 'next/server'
import {LOCALES} from '@/locales'
import {PDF_FILES, PDFFileId} from '@/components/pdf/files'
import {getProject} from '@/lib/projects'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const locale = searchParams.get('locale') || LOCALES.de
  const file = searchParams.get('file')
  const projectId = searchParams.get('projectId')

  if (!file || !(file in PDF_FILES)) {
    return new Response('File not found', {status: 404})
  }

  const fileId = file as PDFFileId

  // Determine which namespace to use based on file type
  const ns = fileId === 'project' ? 'portfolio' : 'cv'
  const t = await getTranslate(ns, {language: locale})

  let element

  if (fileId === 'project') {
    if (!projectId) {
      return new Response('Project ID is required for project PDF', {
        status: 400
      })
    }

    const project = getProject({id: projectId})
    if (!project) {
      return new Response('Project not found', {status: 404})
    }

    element = PDF_FILES.project({t, locale, project})
  } else {
    element = PDF_FILES[fileId]({t, locale})
  }

  const blob = await pdf(element).toBlob()

  // Generate filename
  let filename = `ginonaumann-${fileId}-${locale}.pdf`
  if (fileId === 'project' && projectId) {
    filename = `ginonaumann-project-${projectId}-${locale}.pdf`
  }

  return new Response(blob, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store'
    }
  })
}
