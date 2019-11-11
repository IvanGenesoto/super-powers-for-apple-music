const addTag = require('./tag/add')
const removeTag = require('./tag/remove')
const setField = require('./set-field')
const validate = require('./validate')
const tagKitByLabel = require('../../tag-kit-by-label')

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
    shouldAntiValidate
  } = tagKit

  const labels = [label, antiLabel]
  const trueByArtist = state[stateKey]
  const shouldDeriveAutomaticallyByArtist = state[automaticStateKey]
  const isWarranted = didValidate || !shouldAntiValidate || validate.call(this, track, antiLabel)
  const labelValue_ = value === 'No' ? defaultValue : labelValue
  const fieldValue_ = value === 'No' ? defaultFieldValue : fieldValue
  const isAutomatic = value === 'Automatic'
  const this_ = {track, data}

  trueByArtist && (trueByArtist[artist] = true)
  isAutomatic && (shouldDeriveAutomaticallyByArtist[artist] = true)
  labels.forEach(removeTag, this_)
  field && setField.call(this_, label, fieldValue_)

  if (!isWarranted) return

  addTag.call(this_, label, labelValue_)
}
