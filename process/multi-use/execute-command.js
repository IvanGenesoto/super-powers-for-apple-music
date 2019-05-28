const addTag = require('./tag/add')
const removeTag = require('./tag/remove')
const validate = require('./validate')

module.exports = function executeCommand(track) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {state, data, label, labelKit, value} = this
  const {artist} = data

  const {
    commandStateKey,
    labelValue: preLabelValue = value,
    defaultLabelValue = value,
    antiLabel,
    field,
    fieldValue: preFieldValue = value,
    defaultFieldValue = value,
    shouldAntiValidate
  } = labelKit

  const labels = [label, antiLabel]
  const trueByArtist = state[commandStateKey]
  const isWarranted = !shouldAntiValidate || validate.call(this, track, antiLabel)
  const labelValue = value === 'No' ? defaultLabelValue : preLabelValue
  const fieldValue = value === 'No' ? defaultFieldValue : preFieldValue

  trueByArtist && (trueByArtist[artist] = true)
  labels.forEach(removeTag, this)
  field && track[field].set(fieldValue)

  if (!isWarranted) return

  addTag.call(this, label, labelValue)
}
