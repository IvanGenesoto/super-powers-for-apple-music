const getTagValue = require('../tag/get-value')

module.exports = function doesHasVocalsMatchArtist(effect) { // #refactor: unused

  const {state, artistName, track} = this
  const {hasVocalistByArtist, getArtistTracks} = state
  const {value} = effect

  const hasVocalist = hasVocalistByArtist[artistName]
  if (hasVocalist !== undefined) return value !== (hasVocalist ? 'Yes' : 'No')

  const vocalistValueOnTrack = getTagValue('Vocalist', track)

  if (vocalistValueOnTrack) {
    hasVocalistByArtist[artistName] = vocalistValueOnTrack === 'Yes'
    return value !== vocalistValueOnTrack
  }

  const container = []
  const artistTracks = getArtistTracks(track, artistName)

  const trackWithVocalistValue = artistTracks.find(track => (
    container.vocalistValue = getTagValue('Vocalist', track)
  ))

  if (trackWithVocalistValue) {
    const {vocalistValue} = container
    hasVocalistByArtist[artistName] = vocalistValue === 'Yes'
    return value !== vocalistValue
  }

  hasVocalistByArtist[artistName] = null
  return true
}
