const getTagValue = require('../tag/get-value')

module.exports = function doesHasVocalsMatchArtist({effect, artistName, track}) {

  const {hasVocalistByArtist, getArtistTracks} = this
  const {value: vocals} = effect

  const artistValue = hasVocalistByArtist[artistName]
  if (artistValue !== undefined) return vocals !== artistValue

  const vocalistValueOnTrack = getTagValue('Vocalist', track)
  if (vocalistValueOnTrack) {
    hasVocalistByArtist[artistName] = vocalistValueOnTrack === 'true'
    return vocals !== vocalistValueOnTrack
  }

  let values = []
  const artistTracks = getArtistTracks(track, artistName)
  const trackWithVocalistValue = artistTracks.find(track => (
    values[0] = getTagValue('Vocalist', track))
  )

  if (trackWithVocalistValue) {
    const [vocalistValue] = values
    hasVocalistByArtist[artistName] = vocalistValue === 'true'
    return vocals !== vocalistValue
  }

  hasVocalistByArtist[artistName] = null
  return true
}
