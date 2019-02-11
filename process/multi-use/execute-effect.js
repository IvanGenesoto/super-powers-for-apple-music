const addTag = require('./tag/add')
const removeTag = require('./tag/remove')
const validate = require('./validate')

module.exports = function executeEffect(effect) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {track, playlistName, folderName} = this

  const {
    field,
    shouldUseFolderNameAsLabel,
    label = shouldUseFolderNameAsLabel && folderName,
    value = playlistName, // #commentedOut: (shouldTruncate ? playlistName.slice(0, -5) : playlistName) // #note: Value is the playist name minus " Song".
    antiLabel,
    shouldAntiValidate
  } = effect

  const labels = [label, antiLabel]

  labels.forEach(removeTag, this)

  const isWarranted = !shouldAntiValidate || validate.call(this, track, antiLabel)

  if (!isWarranted) return

  label && addTag.call(this, label, value)
  field && track[field].set(value)
}
