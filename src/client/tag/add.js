import {fieldKitByLabel, removeDisposableTag} from '..'

export const addTag = (song, label, value) => { // #mustBeCalledInTryBlock

  const {track} = song
  const fieldKit = fieldKitByLabel[label]
  const {tagField, shouldPrefix} = fieldKit || {}
  const fieldText = song[tagField] || ''
  const delimiter = fieldText ? ', ' : ''
  const isInvalid = !value && value !== 0

  let fieldText_ =
      shouldPrefix ? `${label}: ${value}${delimiter}${fieldText}`
    : `${fieldText}${delimiter}${label}: ${value}`

  let {length: characterCount} = fieldText_
  let index = 0

  if (!tagField || isInvalid) return

  while (characterCount > 255) {
    fieldText_ = removeDisposableTag(fieldText_, index)
    const {length: characterCount_} = fieldText_
    characterCount = characterCount_
    ++index
  }

  track[tagField].set(fieldText_)
  song[tagField] = fieldText_
}
