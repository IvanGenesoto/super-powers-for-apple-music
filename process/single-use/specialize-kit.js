module.exports = function specializeKit(shouldBePlaylist) {

  const {state} = this
  const {commandKitByName} = state

  const appendIfMatch = (specializedKit, [name, kit]) => {
    const {isPlaylist} = kit
    isPlaylist === shouldBePlaylist && (specializedKit[name] = kit)
    return specializedKit
  }

  return Object
    .entries(commandKitByName)
    .reduce(appendIfMatch, {})
}
