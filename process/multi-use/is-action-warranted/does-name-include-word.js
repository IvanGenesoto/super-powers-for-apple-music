module.exports = function doesNameIncludeWord(antiLabel) { // #refactor: unused

  const {state, trackName} = this
  const {commandKitByName} = state
  const {validationWords} = commandKitByName[antiLabel]

  return !!validationWords.find(word => trackName.includes(word))
}
