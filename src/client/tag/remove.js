import {tagKitByLabel} from '..'

export const removeTag = (song, label) => { // #mustBeCalledInTryBlock, #mustPassSong

  const {track} = song
  const {tagField} = tagKitByLabel[label] || {}
  const fieldText = song[tagField] || ''
  const {length: characterCount} = fieldText
  const beginningIndex = fieldText.indexOf(label + ':')
  const hasLabel = beginningIndex + 1

  if (!hasLabel) return

  const delimiterIndex = fieldText.indexOf(', ', beginningIndex)
  const endingIndex = delimiterIndex + 1 ? delimiterIndex + 2 : characterCount
  const fieldText_ = fieldText.slice(0, beginningIndex) + fieldText.slice(endingIndex)

  track[tagField].set(fieldText_)
  song[tagField] = fieldText_
}
