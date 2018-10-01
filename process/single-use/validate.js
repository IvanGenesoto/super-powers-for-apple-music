const executeCommand = require('../multi-use/execute-effect')

module.exports = function validate(track) {
  const state = this
  const {commandKitByName} = state
  const name = track.name().toLowerCase()
  const filter = ({validation: {words}}) => words.find(find)
  const find = word => name.includes(word)
  const commandKits = Object.values(commandKitByName).filter(filter)
  commandKits.forEach(commandKit => executeCommand.call({...state, commandKit}, track))
}
