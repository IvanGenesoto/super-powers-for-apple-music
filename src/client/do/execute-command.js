import {addTag, removeTag, setField, validate, tagKitByLabel} from '..'

export function executeCommand(song, label, value) { // #mustBeCalledInTryBlock, #mustPassSong

  const {state, didValidate, tagKit = tagKitByLabel[label]} = this
  const {nil} = state
  const {artist} = song
  const shouldUseDefault = value === 'No' // #note: Must check value for "No" instead of "Yes" due to "No" being a validation value of "Song Vocals".
  const shouldDeriveAutomatically = value === 'Automatic'

  const {
    stateKey,
    automaticStateKey,
    antiLabel,
    shouldAntiValidate,
    getValue = () => value,
    value: value_ = shouldUseDefault || getValue(song, label),
    getDefaultValue = () => value,
    defaultValue = shouldUseDefault && getDefaultValue(song, label),
    field,
    getFieldValue = () => value,
    fieldValue = shouldUseDefault || getFieldValue(song, label),
    getDefaultFieldValue = () => value,
    defaultFieldValue = shouldUseDefault && getDefaultFieldValue(song, label),
    triggeredLabel,
  } = tagKit

  const labels = [label, antiLabel]
  const trueByArtist = state[stateKey]
  const shouldDeriveAutomaticallyByArtist = state[automaticStateKey]
  const isWarranted = didValidate || !shouldAntiValidate || validate.call(this, song, antiLabel)
  const value__ = shouldUseDefault ? defaultValue : value_
  const fieldValue_ = shouldUseDefault ? defaultFieldValue : fieldValue
  const this_ = {...this, tagKit: undefined}

  trueByArtist && (trueByArtist[artist] = true)
  shouldDeriveAutomatically && (shouldDeriveAutomaticallyByArtist[artist] = true)
  labels.forEach(label => removeTag(song, label))
  field && setField(song, label, fieldValue_, nil)
  isWarranted && addTag(song, label, value__)
  triggeredLabel && executeCommand.call(this_, song, triggeredLabel, value)
}
