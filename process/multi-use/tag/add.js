const fieldByLabel = require('../../../field-by-label')

module.exports = function addTag(label, value) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {track, data} = this
  const field = fieldByLabel[label]

  if (!field) debugger // #debug: Add function call that displays "Label [Label] has no associated field".

  const fieldText = data[field]
  const delimiter = fieldText ? ', ' : ''
  const newFieldText = `${fieldText}${delimiter}${label}: ${value}`

  track[field].set(newFieldText)
  data[field] = newFieldText
}
