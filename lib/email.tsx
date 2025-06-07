import {Fragment} from 'react'

export const convertNewlinesToBreaks = (text: string) => {
  return text.split('\n').map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ))
}
