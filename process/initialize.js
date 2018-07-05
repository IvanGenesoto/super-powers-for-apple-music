module.exports = function initialize(track) {
  const shouldTrackBe = require('./should-track-be')
  const label = require('./label')
  const {
    shouldRateByArtist,
    tracksToSetGenreByArtist,
    tracksToSetStatusByArtist,
    tracksToSetDiscoveredByArtist
  } = this
  try {
    const composer = track.composer()
    if (composer) track.composer.set(`Composer: ${composer}`)
    const delimiter = composer ? ', ' : ''
    track.composer.set(`${track.composer()}${delimiter}Ungenred: ${track.genre()}`)
    const artist = track.artist()
    if (tracksToSetGenreByArtist[artist]) tracksToSetGenreByArtist[artist] = []
    tracksToSetGenreByArtist[artist].push(track)
    if (track.rating()) shouldRateByArtist[artist] = true
    else if (!shouldRateByArtist[artist]) {
      if (!tracksToSetStatusByArtist[artist]) tracksToSetStatusByArtist[artist] = []
      tracksToSetStatusByArtist[artist] = track
    }
    if (!tracksToSetDiscoveredByArtist[artist]) tracksToSetDiscoveredByArtist[artist] = []
    tracksToSetDiscoveredByArtist[artist].push(track)
    if (shouldTrackBe('disabled', track)) label('Disabled', 'Alternate', track)
    if (shouldTrackBe('disregarded', track)) label('Disregarded', 'Interlude', track)
  }
  catch (unused) { }
}
