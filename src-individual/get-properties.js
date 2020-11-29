import {app, display} from '.'

const selection = app.selection()
const [track] = selection
const properties = track.properties()

const concatenate = (text, [name, value], index) => {
  const delimiter = index ? '\u000a' : ''
  text += `${delimiter}${name}: ${value}`
  return text
}

const text = Object
  .entries(properties)
  .reduce(concatenate, '')

display(text)
