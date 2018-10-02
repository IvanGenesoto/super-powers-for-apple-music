module.exports = function doesNameIncludeWord({effect, trackName}) {

  const {commandKitByName} = this
  const {validationCommandName} = effect
  const {validation} = commandKitByName[validationCommandName]
  const {words} = validation

  return !!words.find(word => trackName.includes(word))
}
