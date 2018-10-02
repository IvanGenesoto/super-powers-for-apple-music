const addTag = require('tag/add')
const removeTag = require('tag/remove')

module.exports = function executeEffect(effect) {

  const {
    field,
    label,
    value: givenValue,
    shouldTruncate,
    antiLabel,
    isActionWarranted,
    valueByArtist,
    valueByArtistValue
  } = effect

  const state = this
  const {track, artistName, playlistName} = state
  const labels = [label, antiLabel]
  const trackName = track.name().toLowerCase()
  const value = givenValue || (shouldTruncate ? playlistName.slice(0, -5) : playlistName)

  labels.forEach(removeTag, track)
  if (!isActionWarranted.call(state, {effect, trackName, artistName, track})) return

  valueByArtist && (valueByArtist[artistName] = valueByArtistValue)
  if (label) addTag(track, label, value)
  else track[field].set(value)
}
