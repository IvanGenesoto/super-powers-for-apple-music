const addTag = require('./tag/add')
const removeTag = require('./tag/remove')
const validate = require('./validate')

module.exports = function executeCommand(track) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {state, data, label, labelKit, value, didValidate} = this
  const {artist} = data

  const {
    commandStateKey,
    labelValue = value,
    defaultLabelValue = value,
    antiLabel,
    field,
    fieldValue = value,
    defaultFieldValue = value,
    shouldAntiValidate
  } = labelKit

  const labels = [label, antiLabel]
  const trueByArtist = state[commandStateKey]
  const isWarranted = didValidate || !shouldAntiValidate || validate.call(this, track, antiLabel)
  const labelValue_ = value === 'No' ? defaultLabelValue : labelValue
  const fieldValue_ = value === 'No' ? defaultFieldValue : fieldValue

  trueByArtist && (trueByArtist[artist] = true)
  labels.forEach(removeTag, this)
  field && track[field].set(fieldValue_)

  if (!isWarranted) return

  addTag.call(this, label, labelValue_)
}
