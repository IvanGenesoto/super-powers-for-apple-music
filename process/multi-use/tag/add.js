const tagKitByLabel = require('../../../tag-kit-by-label')
const removeDisposableTag = require('./remove-disposable')

module.exports = function addTag(label, value) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {track, data} = this
  const tagKit = tagKitByLabel[label]
  const {tagField, shouldPrefix} = tagKit || {}
  const fieldText = data[tagField] || ''
  const delimiter = fieldText ? ', ' : ''

  let fieldText_ = shouldPrefix
    ? `${label}: ${value}${delimiter}${fieldText}`
    : `${fieldText}${delimiter}${label}: ${value}`

  let {length: characterCount} = fieldText_
  let index = 0

  if (!tagField) return

  while (characterCount > 255) {
    fieldText_ = removeDisposableTag(fieldText_, index)
    const {length: characterCount_} = fieldText_
    characterCount = characterCount_
    ++index
  }

  track[tagField].set(fieldText_)
  data[tagField] = fieldText_
}
