import {fieldKitEnum} from '..'

export const getTagValue = (song, label) => {

  const fieldKit = fieldKitEnum[label]
  const {tagField} = fieldKit || {}
  const fieldText = song[tagField] || ''
  const {length: fieldTextLength} = fieldText
  const beginningIndex = fieldText.indexOf(label + ':')

  if (beginningIndex === -1) return

  const delimiterIndex = fieldText.indexOf(', ', beginningIndex)
  const endingIndex = delimiterIndex === -1 ? fieldTextLength : delimiterIndex

  return fieldText.slice(beginningIndex, endingIndex)
}
