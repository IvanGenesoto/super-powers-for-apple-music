import {addTag, removeTag, setField, validate, fieldKitByLabel} from '..'

export const executeCommand = function (song, label, value) { // #mustBeCalledInTryBlock

  const {state, didValidate, fieldKit = fieldKitByLabel[label]} = this
  const {nil} = state
  const {artist} = song
  const shouldUseDefault = value === 'No' // #note: Must check value for "No" instead of "Yes" due to "No" being a validation value of "Song Vocals".
  const shouldDeriveAutomatically = value === 'Automatic'

  const {
    stateKey,
    automaticStateKey,
    enumStateKey,
    antiLabel,
    shouldAntiValidate,
    getTagValue = () => value,
    tagValue = shouldUseDefault || getTagValue(song, label),
    getDefaultTagValue = () => value,
    defaultTagValue = shouldUseDefault && getDefaultTagValue(song, label),
    field,
    getFieldValue = () => value,
    fieldValue = shouldUseDefault || getFieldValue(song, label),
    getDefaultFieldValue = () => value,
    defaultFieldValue = shouldUseDefault && getDefaultFieldValue(song, label),
    triggeredLabel,
  } = fieldKit

  const labels = [label, antiLabel]
  const trueByArtist = state[stateKey]
  const shouldDeriveAutomaticallyByArtist = state[automaticStateKey]
  const enum_ = state[enumStateKey]
  const isWarranted = didValidate || !shouldAntiValidate || validate.call(this, song, antiLabel)
  const tagValue_ = shouldUseDefault ? defaultTagValue : tagValue
  const fieldValue_ = shouldUseDefault ? defaultFieldValue : fieldValue
  const this_ = {...this, fieldKit: undefined}

  field && enum_ && void enum_[fieldValue_]
  trueByArtist && (trueByArtist[artist] = true)
  shouldDeriveAutomatically && (shouldDeriveAutomaticallyByArtist[artist] = true)
  labels.forEach(label => removeTag(song, label))
  field && setField(song, label, fieldValue_, nil)
  isWarranted && addTag(song, label, tagValue_)
  triggeredLabel && executeCommand.call(this_, song, triggeredLabel, value)
}
