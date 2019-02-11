
const display = require('./dialogue/display')
const app = require('./app')
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
