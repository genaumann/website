import {NextRequest} from 'next/server'
import OGImage from './og'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    const title = searchParams.get('title')
    const description = searchParams.get('description')

    if (!title || !description) {
      return new Response('No title or description provided', {
        status: 400
      })
    }

    return OGImage({
      title,
      description
    })
  } catch (e) {
    console.error(e)
    return new Response('Failed to generate image', {
      status: 500
    })
  }
}
