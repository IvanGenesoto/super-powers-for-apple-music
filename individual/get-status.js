
const display = require('./dialogue/display')
const app = require('./app')
const selection = app.selection()
const getStatus = (track, index) => {
  const status = track.cloudStatus()
  const existingCount = countByStatus[status] || 0
  countByStatus[status] = existingCount + 1
}
const concatenate = (text, [status, count], index) => {
  const delimiter = index ? '\u000a' : ''
  text += `${delimiter}${status}: ${count}`
  return text
}
let countByStatus = {}
selection.forEach(getStatus)
const text = Object
  .entries(countByStatus)
  .reduce(concatenate, '')
display(text)
