const disposableLabels = require('../static/disposable-labels')

module.exports = function removeDisposableTag(fieldText, index) {

  const {length: characterCount} = fieldText
  const label = disposableLabels[index]

  if (!label) throw new Error('All disposable labels removed')

  const beginningIndex = fieldText.indexOf(label + ':')
  const hasLabel = beginningIndex + 1

  if (!hasLabel) return fieldText

  const delimiterIndex = fieldText.indexOf(', ', beginningIndex)
  const endingIndex = delimiterIndex + 1 ? delimiterIndex + 2 : characterCount

  return fieldText.slice(0, beginningIndex) + fieldText.slice(endingIndex)
}
