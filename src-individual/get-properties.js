const display = require('../src/dialogue/display')
const app = require('../src/app')
const selection = app.selection()

const concatenate = (text, [name, value], index) => {
  const delimiter = index ? '\u000a' : ''
  text += `${delimiter}${name}: ${value}`
  return text
}

const [track] = selection
const properties = track.properties()

const text = Object
  .entries(properties)
  .reduce(concatenate, '')

display(text)
