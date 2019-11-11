const tagKitByLabel = require('../../../tag-kit-by-label')

module.exports = function addTag(label, value) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {track, data} = this
  const tagKit = tagKitByLabel[label]
  const {labelField, shouldPrefix} = tagKit || {}
  const fieldText = data[labelField] || ''
  const delimiter = fieldText ? ', ' : ''

  const newFieldText = shouldPrefix
    ? `${label}: ${value}${delimiter}${fieldText}`
    : `${fieldText}${delimiter}${label}: ${value}`

  if (!labelField) return

  track[labelField].set(newFieldText)
  data[labelField] = newFieldText
}
