const tagKitByLabel = require('../tag-kit-by-label')

module.exports = function getFieldValue(label) { // #mustHaveData: true

  const {data} = this
  const tagKit = tagKitByLabel[label]
  const {field} = tagKit

  return data[field]
}
