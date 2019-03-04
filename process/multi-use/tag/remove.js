const labelKitByLabel = require('../../../label-kit-by-label')

module.exports = function removeTag(label) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  if (!label) return

  const {track, data} = this
  const {labelField} = labelKitByLabel[label]

  if (!labelField) debugger // #debug: Add function call that displays "Label [Label] has no associated labelField".

  const fieldText = data[labelField]
  const beginIndex = fieldText.indexOf(label + ':')

  if (beginIndex === -1) return

  const delimiterIndex = fieldText.indexOf(', ', beginIndex)
  const endIndex = delimiterIndex === -1 ? fieldText.length : delimiterIndex + 2
  const newFieldText = fieldText.slice(0, beginIndex) + fieldText.slice(endIndex)

  track[labelField].set(newFieldText)
  data[labelField] = newFieldText
}
