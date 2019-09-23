const labelKitByLabel = require('../label-kit-by-label')

module.exports = function getFieldValue(label) { // #mustHaveData: true

  const {data} = this
  const labelKit = labelKitByLabel[label]
  const {field} = labelKit

  return data[field]
}
