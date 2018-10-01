const commandKitByName = require('../command-kit-by-name')

module.exports = function getSpecialKit(shouldBePlaylist) {

  const appendIfIsPlaylist = (result, [key, value]) => {
    const {isPlaylist} = value
    isPlaylist === shouldBePlaylist && (result[key] = value)
    return result
  }

  return Object
    .entries(commandKitByName)
    .reduce(appendIfIsPlaylist, {})
}
