const labelKitByLabel = require('../../../label-kit-by-label')

module.exports = function getTagValue(label) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  if (!label) return

  const {data} = this
  const {labelField} = labelKitByLabel[label]

  if (!labelField) return // #debug: Add function call that displays "Label [Label] has no associated labelField".

  const fieldText = data[labelField]
  const beginIndex = fieldText.indexOf(label + ':')

  if (beginIndex === -1) return

  const delimiterIndex = fieldText.indexOf(', ', beginIndex)
  const endIndex = delimiterIndex === -1 ? fieldText.length : delimiterIndex

  return fieldText.slice(beginIndex, endIndex)
}
