module.exports = function specializeKit(shouldBeFolder) {

  const {commandKitByName} = this

  const appendIfIsPlaylist = (result, [key, value]) => {
    const {isFolder} = value
    isFolder === shouldBeFolder && (result[key] = value)
    return result
  }

  return Object
    .entries(commandKitByName)
    .reduce(appendIfIsPlaylist, {})
}
