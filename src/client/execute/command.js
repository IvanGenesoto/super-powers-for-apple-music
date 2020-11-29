import {addTag, removeTag, setField, validate, tagKitByLabel} from '..'

export function executeCommand(track) { // #mustBeCalledInTryBlock, #mustPassData

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
    triggeredLabel,
  } = tagKit

  const labels = [label, antiLabel]
  const trueByArtist = state[stateKey]
  const shouldDeriveAutomaticallyByArtist = state[automaticStateKey]
  const isWarranted = didValidate || !shouldAntiValidate || validate.call(this, track, antiLabel)
  const value__ = shouldUseDefault ? defaultValue : value_
  const fieldValue_ = shouldUseDefault ? defaultFieldValue : fieldValue
  const this__ = {...this, label: triggeredLabel, tagKit: undefined}

  trueByArtist && (trueByArtist[artist] = true)
  shouldDeriveAutomatically && (shouldDeriveAutomaticallyByArtist[artist] = true)
  labels.forEach(label => removeTag.call(this, track, label))
  field && setField.call(this, track, label, fieldValue_)
  isWarranted && addTag.call(this, track, label, value__)
  triggeredLabel && executeCommand.call(this__, track)
}
