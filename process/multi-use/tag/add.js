const labelKitByLabel = require('../../../label-kit-by-label')

module.exports = function addTag(label, value) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {track, data} = this
  const labelKit = labelKitByLabel[label]
  const {labelField, shouldPrefix} = labelKit

  if (!labelField) return

  const fieldText = data[labelField]
  const delimiter = fieldText ? ', ' : ''

  const newFieldText = shouldPrefix
    ? `${label}: ${value}${delimiter}${fieldText}`
    : `${fieldText}${delimiter}${label}: ${value}`

  track[labelField].set(newFieldText)
  data[labelField] = newFieldText
}
