const labelKitByLabel = require('../../../label-kit-by-label')

module.exports = function removeTag(label) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  if (!label) return

  const {track, data} = this
  const {labelField} = labelKitByLabel[label]

  if (!labelField) return

  const fieldText = data[labelField]
  const beginningIndex = fieldText.indexOf(label + ':')
  const hasLabel = beginningIndex + 1

  if (!hasLabel) return

  const delimiterIndex = fieldText.indexOf(', ', beginningIndex)
  const endingIndex = delimiterIndex === -1 ? fieldText.length : delimiterIndex + 2
  const newFieldText = fieldText.slice(0, beginningIndex) + fieldText.slice(endingIndex)

  track[labelField].set(newFieldText)
  data[labelField] = newFieldText
}
