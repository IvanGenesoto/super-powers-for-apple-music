const fieldByLabel = require('../../../field-by-label')

module.exports = function removeTag(label) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  if (!label) return

  const {track, data} = this
  const field = fieldByLabel[label]

  if (!field) debugger // #debug: Add function call that displays "Label [Label] has no associated field".

  const fieldText = data[field]
  const beginIndex = fieldText.indexOf(label + ':')

  if (beginIndex === -1) return

  const delimiterIndex = fieldText.indexOf(', ', beginIndex)
  const endIndex = delimiterIndex === -1 ? fieldText.length : delimiterIndex + 2
  const newFieldText = fieldText.slice(0, beginIndex) + fieldText.slice(endIndex)

  track[field].set(newFieldText)
  data[field] = newFieldText
}
