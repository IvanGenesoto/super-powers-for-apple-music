const fieldByLabel = require('../../field-by-label')

module.exports = function getTagValue(label, track) {

  const field = fieldByLabel[label]
  const fieldText = track[field]()
  const fullLabel = label + ': '
  const labelIndex = fieldText.indexOf(fullLabel)
  if (labelIndex === -1) return

  const beginIndex = labelIndex + fullLabel.length
  const delimiterIndex = fieldText.indexOf(', ', beginIndex)
  const endIndex = delimiterIndex === -1 ? fieldText.length : delimiterIndex
  return fieldText.slice(beginIndex, endIndex)
}
