const fieldByLabel = require('../../field-by-label')

module.exports = function addTag(track, label, value) {

  const field = fieldByLabel[label]
  const existingText = track[field]()
  const delimiter = existingText ? ', ' : ''
  const newFieldText = `${existingText}${delimiter}${label}: ${value}`

  track[field].set(newFieldText)
}
