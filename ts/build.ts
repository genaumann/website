import {buildArticleIndex} from './articleIndex'
import {buildProjectIndex} from './projectIndex'
import {fetchTolgee} from './fetchTolgee'

const build = async () => {
  console.log('Calling build script...')

  await fetchTolgee()
  await buildArticleIndex()
  await buildProjectIndex()
}

build()
