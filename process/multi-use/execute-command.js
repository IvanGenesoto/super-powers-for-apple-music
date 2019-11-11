const addTag = require('./tag/add')
const removeTag = require('./tag/remove')
const setField = require('./set-field')
const validate = require('./validate')
const tagKitByLabel = require('../../tag-kit-by-label')
const getTagValue = require('../../get/tag-value')

module.exports = function executeCommand(track) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {state, data, label, tagKit = tagKitByLabel[label], value, didValidate} = this
  const {artist} = data

  const {
    stateKey,
    automaticStateKey,
    value: labelValue = value,
    defaultValue = value,
    antiLabel,
    field,
    fieldValue = value,
    defaultFieldValue = value,
    shouldAntiValidate,
    isInteger
  } = tagKit

  const labels = [label, antiLabel]
  const trueByArtist = state[stateKey]
  const shouldDeriveAutomaticallyByArtist = state[automaticStateKey]
  const isWarranted = didValidate || !shouldAntiValidate || validate.call(this, track, antiLabel)
  const labelValue_ = value === 'No' ? defaultValue : labelValue // #note: Must check value for "No" instead of "Yes" due to "No" being a validation value.
  const fieldValue_ = value === 'No' ? defaultFieldValue : fieldValue
  const isAutomatic = value === 'Automatic'
  const this_ = {track, data}
  const previousValue = isInteger ? getTagValue.call(this_, label) || 0 : null
  const integerValue = value === 'Increment' ? previousValue + 1 : previousValue - 1
  const labelValue__ = isInteger ? integerValue : labelValue_
  const fieldValue__ = isInteger ? integerValue : fieldValue_

  trueByArtist && (trueByArtist[artist] = true)
  isAutomatic && (shouldDeriveAutomaticallyByArtist[artist] = true)
  labels.forEach(removeTag, this_)
  field && setField.call(this_, label, fieldValue__)

  if (!isWarranted) return

  addTag.call(this_, label, labelValue__)
}
