const commandKitByName = require('../../command-kit-by-name')
const addTag = require('tag/add')
const removeTag = require('tag/remove')

module.exports = function executeCommand(effect) {

  const {field, label, value: givenValue, shouldTruncate, antiLabel, validationCommandName} = effect
  const {track, playlistName} = this
  const labels = [label, antiLabel]
  const name = track.name().toLowerCase()
  const value = givenValue || (shouldTruncate ? playlistName.slice(0, -5) : playlistName)

  const isActionWarranted = () => {
    const {validation} = commandKitByName[validationCommandName]
    const {words} = validation
    return words.find(word => name.includes(word))
  }

  labels.forEach(removeTag, track)
  if (validationCommandName && !isActionWarranted()) return
  if (label) addTag(track, label, value)
  else track[field].set(value)
}
