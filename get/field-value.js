const labelKitByLabel = require('../label-kit-by-label')

module.exports = function getFieldValue(label) { // #mustHaveData: true

  const {data} = this
  const {field} = labelKitByLabel[label]

  return data[field]
}
