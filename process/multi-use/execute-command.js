const addTag = require('./tag/add')
const removeTag = require('./tag/remove')
const setField = require('./set-field')
const validate = require('./validate')
const labelKitByLabel = require('../../label-kit-by-label')

module.exports = function executeCommand(track) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {state, data, label, labelKit = labelKitByLabel[label], value, didValidate} = this
  const {artist} = data

  const {
    commandStateKey,
    automaticStateKey,
    value: labelValue = value,
    defaultValue = value,
    antiLabel,
    field,
    fieldValue = value,
    defaultFieldValue = value,
    shouldAntiValidate
  } = labelKit

  const labels = [label, antiLabel]
  const shouldDeriveByArtist = state[commandStateKey]
  const shouldDeriveAutomaticallyByArtist = state[automaticStateKey]
  const isWarranted = didValidate || !shouldAntiValidate || validate.call(this, track, antiLabel)
  const labelValue_ = value === 'No' ? defaultValue : labelValue
  const fieldValue_ = value === 'No' ? defaultFieldValue : fieldValue
  const isAutomatic = value === 'Automatic'
  const this_ = {track, data}

  shouldDeriveByArtist && (shouldDeriveByArtist[artist] = true)
  isAutomatic && (shouldDeriveAutomaticallyByArtist[artist] = true)
  labels.forEach(removeTag, this_)
  field && setField.call(this_, label, fieldValue_)

  if (!isWarranted) return

  addTag.call(this_, label, labelValue_)
}
