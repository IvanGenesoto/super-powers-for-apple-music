const tagKitByLabel = require('../tag-kit-by-label')

module.exports = function getTagValue(label) { // #mustHaveData: true

  if (!label) return

  const {data} = this
  const tagKit = tagKitByLabel[label]
  const {labelField} = tagKit

  if (!labelField) return

  const fieldText = data[labelField]
  const beginIndex = fieldText.indexOf(label + ':')

  if (beginIndex === -1) return

  const delimiterIndex = fieldText.indexOf(', ', beginIndex)
  const endIndex = delimiterIndex === -1 ? fieldText.length : delimiterIndex

  return fieldText.slice(beginIndex, endIndex)
}
