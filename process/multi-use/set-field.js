const tagKitByLabel = require('../../tag-kit-by-label')

module.exports = function setField(label, value) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {track, data} = this
  const {field} = tagKitByLabel[label]

  if (!field) return // #debug: Add function call that displays "Label [Label] has no associated field".

  track[field].set(value)
  data[field] = value
}
