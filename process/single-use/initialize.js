const validate = require('./validate')

module.exports = function initialize(track) {

  const state = this

  const {
    shouldRateByArtist,
    tracksToDeriveStatusByArtist,
    tracksToDeriveGenreByArtist,
    tracksToDeriveVocalistByArtist,
    tracksToDeriveDiscoveredByArtist,
    appendAndPush
  } = this

  try {
    const composer = track.composer()
    const composerText = composer ? `Composer: ${composer}` : ''
    const delimiter = composer ? ', ' : ''
    track.composer.set(`${composerText}${delimiter}Originally: ${track.genre()}`)
    track.genre.set('-')
    const artistName = track.artist.name()
    appendAndPush(tracksToDeriveGenreByArtist, artistName, track)
    appendAndPush(tracksToDeriveVocalistByArtist, artistName, track)
    if (track.rating()) shouldRateByArtist[artistName] = true
    else if (!shouldRateByArtist[artistName]) appendAndPush(tracksToDeriveStatusByArtist, artistName, track)
    appendAndPush(tracksToDeriveDiscoveredByArtist, artistName, track)
    validate.call(state, track)
  }
  catch (unused) { }
}
