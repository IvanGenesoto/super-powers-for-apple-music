module.exports = function getSpecialKit(shouldBePlaylist) {

  const {commandKitByName} = this

  const appendIfIsPlaylist = (result, [key, value]) => {
    const {isPlaylist} = value
    isPlaylist === shouldBePlaylist && (result[key] = value)
    return result
  }

  return Object
    .entries(commandKitByName)
    .reduce(appendIfIsPlaylist, {})
}
