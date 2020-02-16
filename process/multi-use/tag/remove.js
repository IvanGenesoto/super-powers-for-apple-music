const tagKitByLabel = require('../../../tag-kit-by-label')

module.exports = function removeTag(label) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {track, data} = this
  const {labelField} = tagKitByLabel[label] || {}
  const fieldText = data[labelField] || ''
  const {length: characterCount} = fieldText
  const beginningIndex = fieldText.indexOf(label + ':')
  const hasLabel = beginningIndex + 1

  if (!hasLabel) return

  const delimiterIndex = fieldText.indexOf(', ', beginningIndex)
  const endingIndex = delimiterIndex + 1 ? delimiterIndex + 2 : characterCount
  const fieldText_ = fieldText.slice(0, beginningIndex) + fieldText.slice(endingIndex)

  track[labelField].set(fieldText_)
  data[labelField] = fieldText_
}
