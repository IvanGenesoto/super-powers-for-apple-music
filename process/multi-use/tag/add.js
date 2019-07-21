const labelKitByLabel = require('../../../label-kit-by-label')

module.exports = function addTag(label, value) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {track, data} = this
  const {labelField} = labelKitByLabel[label]

  if (!labelField) return

  const fieldText = data[labelField]
  const delimiter = fieldText ? ', ' : ''
  const newFieldText = `${fieldText}${delimiter}${label}: ${value}`

  track[labelField].set(newFieldText)
  data[labelField] = newFieldText
}
