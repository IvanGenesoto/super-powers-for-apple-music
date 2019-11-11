const tagKitByLabel = require('../tag-kit-by-label')

module.exports = function getTagValue(label) { // #mustHaveData: true

  const {data} = this
  const tagKit = tagKitByLabel[label]
  const {labelField} = tagKit || {}
  const fieldText = data[labelField] || ''
  const {length: fieldTextLength} = fieldText
  const beginningIndex = fieldText.indexOf(label + ':')

  if (beginningIndex === -1) return

  const delimiterIndex = fieldText.indexOf(', ', beginningIndex)
  const endingIndex = delimiterIndex === -1 ? fieldTextLength : delimiterIndex

  return fieldText.slice(beginningIndex, endingIndex)
}
