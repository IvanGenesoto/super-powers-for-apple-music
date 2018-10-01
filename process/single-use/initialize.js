const validate = require('./validate')

module.exports = function initialize(track) {
  const state = this
  const {
    shouldRateByArtist,
    tracksToSetGenreByArtist,
    tracksToSetStatusByArtist,
    tracksToSetDiscoveredByArtist
  } = this
  try {
    const composer = track.composer()
    composer && track.composer.set(`Composer: ${composer}`)
    const delimiter = composer ? ', ' : ''
    track.composer.set(`${track.composer()}${delimiter}Ungenred: ${track.genre()}`)
    const artist = track.artist()
    const existingTracksToSetGenre = tracksToSetGenreByArtist[artist]
    const tracksToSetGenre = existingTracksToSetGenre || (tracksToSetGenreByArtist[artist] = [])
    tracksToSetGenre.push(track)
    if (track.rating()) shouldRateByArtist[artist] = true
    else if (!shouldRateByArtist[artist]) {
      const existingTracksToSetStatus = tracksToSetStatusByArtist[artist]
      const tracksToSetStatus = existingTracksToSetStatus || (tracksToSetStatusByArtist[artist] = [])
      tracksToSetStatus.push(track)
    }
    const existingTracksToSetDiscovered = tracksToSetDiscoveredByArtist[artist]
    const tracksToSetDiscovered = existingTracksToSetDiscovered || (tracksToSetDiscoveredByArtist[artist] = [])
    tracksToSetDiscovered.push(track)
    validate.call(state, track)
  }
  catch (unused) { }
}
