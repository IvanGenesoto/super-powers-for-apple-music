const executeCommand = require('./execute-command')

module.exports = function validate(track, antiLabel) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {state, data} = this
  const {commandKitByName} = state
  const {name} = data
  const lowerCaseName = name.toLowerCase()
  const filter = ([unused, {validationWords}]) => validationWords && validationWords.find(find)
  const find = word => lowerCaseName.includes(word)

  const doesNameContainValidationWords = () => {
    const commandKit = commandKitByName[antiLabel]
    const wrappedCommandKit = {commandKit}
    const filteredEntries = Object.entries(wrappedCommandKit).filter(filter)
    const {length} = filteredEntries
    return !!length
  }

  const callExecuteCommand = ([folderName, commandKit]) => executeCommand.call({
    ...this, folderName, commandKit, playlistName: commandKit.validationName // #note: "folderName" is actually a playlist name if commandKit.isPlaylist is true.
  }, track)

  if (antiLabel) return doesNameContainValidationWords()

  Object
    .entries(commandKitByName)
    .filter(filter)
    .forEach(callExecuteCommand)
}
