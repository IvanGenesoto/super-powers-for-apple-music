import {tagKitByLabel} from '..'

export function getTagValue(label) { // #mustPassData

  const {data} = this
  const tagKit = tagKitByLabel[label]
  const {tagField} = tagKit || {}
  const fieldText = data[tagField] || ''
  const {length: fieldTextLength} = fieldText
  const beginningIndex = fieldText.indexOf(label + ':')

  if (beginningIndex === -1) return

  const delimiterIndex = fieldText.indexOf(', ', beginningIndex)
  const endingIndex = delimiterIndex === -1 ? fieldTextLength : delimiterIndex

  return fieldText.slice(beginningIndex, endingIndex)
}