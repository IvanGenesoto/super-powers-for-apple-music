module.exports = function adoptStats([artist, tracks]) {

  const getTag = require('../../multi-use/tag/get') // #debug: Create function!
  const addTag = require('../../multi-use/tag/add')
  const {state} = this
  const valueByLabel = {}

  const {
    didSetRatingByArtist,
    didSetStatusByArtist,
    didSetHasVocalistByArtist,
    didSetGenreByArtist,
    didAdoptStatsByArtist,
    tracksToAdoptStatsByArtist,
    getArtistTracks
  } = state

  const artistTracks = getArtistTracks.call(this, artist)

  const callAddTagForEachLabel = track => Object
    .entries(valueByLabel)
    .forEach(callAddTag.bind({track}))

  const callAddTag = function([label, value]) { // #debug: Also set any other relevant fields!
    const {track} = this
    const data = track.properties()
    try { addTag.call({track, data}, label, value) }
    catch (unused) { }
  }

  const appendValue = function(track) {
    const {label} = this
    const value = getTag(label, track)
    return (valueByLabel[label] = value)
  }

  if (didAdoptStatsByArtist[artist]) return

  const trackWithDiscoveredAt = artistTracks.find(appendValue, {label: 'Discovered'})
  trackWithDiscoveredAt || (valueByLabel['Discovered'] = tracks[0].dateAdded())

  if (!didSetRatingByArtist[artist]) {
    const trackWithRating = artistTracks.find(appendValue, {label: '\u2605'})
    trackWithRating || (valueByLabel['\u2605'] = '-')
  }

  tracks.forEach(callAddTagForEachLabel)
  didAdoptStatsByArtist[artist] = true
}
