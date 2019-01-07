const executeCommand = require('../multi-use/execute-effect')

module.exports = function validate(track, antiLabel) {

  const {state} = this
  const {commandKitByName} = state
  const name = track.name().toLowerCase()
  const filter = ([unused, {validationWords}]) => validationWords && validationWords.find(find)
  const find = word => name.includes(word)

  if (antiLabel) return !![null, commandKitByName[antiLabel]].filter(filter).length

  const commandKitEntries = Object.entries(commandKitByName).filter(filter)

  commandKitEntries.forEach(([folderName, commandKit]) => executeCommand.call({
    ...this, folderName, commandKit, playlistName: commandKit.validationName // #note: "folderName" is actually a playlist name if commandKit.isPlaylist is true.
  }, track))
}
