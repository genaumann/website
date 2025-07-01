import {buildArticleIndex} from './articleIndex'
import {fetchTolgee} from './fetchTolgee'

const build = async () => {
  console.log('Calling build script...')

  await fetchTolgee()
  await buildArticleIndex()
}

build()
