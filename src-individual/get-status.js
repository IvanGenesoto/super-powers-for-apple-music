const display = require('../src/dialog/display')
const app = require('../src/app')
const selection = app.selection()

const getStatus = (countByStatus, track) => {
  const status = track.cloudStatus()
  const count = countByStatus[status] || 0
  countByStatus[status] = count + 1
  return countByStatus
}

const concatenate = (text, [status, count], index) => {
  const delimiter = index ? '\u000a' : ''
  text += `${delimiter}${status}: ${count}`
  return text
}

const countByStatus = selection.reduce(getStatus, {})

const text = Object
  .entries(countByStatus)
  .reduce(concatenate, '')

display(text)
