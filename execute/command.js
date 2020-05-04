const addTag = require('../tag/add')
const removeTag = require('../tag/remove')
const setField = require('../set/field')
const validate = require('../validate')
const tagKitByLabel = require('../static/tag-kit-by-label')

module.exports = function executeCommand(track) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {state, data, label, value, didValidate, tagKit = tagKitByLabel[label]} = this
  const {artist} = data
  const shouldUseDefault = value === 'No' // #note: Must check value for "No" instead of "Yes" due to "No" being a validation value.
  const shouldDeriveAutomatically = value === 'Automatic'

  const {
    stateKey,
    automaticStateKey,
    antiLabel,
    shouldAntiValidate,
    getValue = () => value,
    value: value_ = shouldUseDefault || getValue(track, data, label),
    getDefaultValue = () => value,
    defaultValue = shouldUseDefault && getDefaultValue(track, data, label),
    field,
    getFieldValue = () => value,
    fieldValue = shouldUseDefault || getFieldValue(track, data, label),
    getDefaultFieldValue = () => value,
    defaultFieldValue = shouldUseDefault && getDefaultFieldValue(track, data, label),
    triggeredLabel
  } = tagKit

  const labels = [label, antiLabel]
  const trueByArtist = state[stateKey]
  const shouldDeriveAutomaticallyByArtist = state[automaticStateKey]
  const isWarranted = didValidate || !shouldAntiValidate || validate.call(this, track, antiLabel)
  const value__ = shouldUseDefault ? defaultValue : value_
  const fieldValue_ = shouldUseDefault ? defaultFieldValue : fieldValue
  const this_ = {track, data}
  const this__ = {...this, label: triggeredLabel, tagKit: undefined}

  trueByArtist && (trueByArtist[artist] = true)
  shouldDeriveAutomatically && (shouldDeriveAutomaticallyByArtist[artist] = true)
  labels.forEach(removeTag, this_)
  field && setField.call(this_, label, fieldValue_)
  isWarranted && addTag.call(this_, label, value__)
  triggeredLabel && executeCommand.call(this__, track)
}
