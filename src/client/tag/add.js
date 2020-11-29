import {tagKitByLabel, removeDisposableTag} from '..'

export function addTag(track, label, value) { // #mustBeCalledInTryBlock, #mustPassData

  const {data} = this
  const tagKit = tagKitByLabel[label]
  const {tagField, shouldPrefix} = tagKit || {}
  const fieldText = data[tagField] || ''
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
  data[tagField] = fieldText_
}
