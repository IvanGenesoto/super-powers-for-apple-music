const commandKitByName = require('../../command-kit-by-name')
const executeCommand = require('../multi-use/execute-command')

module.exports = function validate(track) {
  const name = track.name().toLowerCase()
  const filter = ({validation: {words}}) => words.find(find)
  const find = word => name.includes(word)
  const commandKits = Object.values(commandKitByName).filter(filter)
  commandKits.forEach(({effects, validation: {playlistName}}) => effects.forEach(
    executeCommand, {track, playlistName}
  ))
}
