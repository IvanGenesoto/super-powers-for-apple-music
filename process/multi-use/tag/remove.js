const fieldByLabel = require('../../field-by-label')

module.exports = function removeTag(label) {
  if (!label) return
  const track = this
  const field = fieldByLabel[label]
  const fieldText = track[field]()
  const beginIndex = fieldText.indexOf(label + ':')
  if (beginIndex === -1) return
  const delimiterIndex = fieldText.indexOf(', ', beginIndex)
  const endIndex = delimiterIndex === -1 ? fieldText.length : delimiterIndex + 2
  const newFieldText = fieldText.slice(0, beginIndex) + fieldText.slice(endIndex)
  track[field].set(newFieldText)
}
