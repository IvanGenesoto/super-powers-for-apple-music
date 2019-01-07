const appendAndPush = require('../multi-use/append-and-push')
const validate = require('./validate')

module.exports = function initialize(track) {

  const {state} = this
  const {shouldDeriveRatingByArtist, tracksToAdoptStatsByArtist} = state
  const artistName = track.artist.name()
  const genre = track.genre()
  const rating = track.rating()
  const composer = track.composer()
  const composerText = composer ? `Composer: ${composer}` : ''
  const delimiter = composer ? ', ' : ''

  try {
    track.composer.set(`${composerText}${delimiter}Original: ${genre}`)
    track.genre.set('-')
    // appendAndPush(tracksToAdoptGenreByArtist, artistName, track)
    // appendAndPush(tracksToAdoptVocalistByArtist, artistName, track)
    rating && (shouldDeriveRatingByArtist[artistName] = true)
    // else if (!shouldDeriveRatingByArtist[artistName]) appendAndPush(tracksToAdoptStatusByArtist, artistName, track)
    appendAndPush(tracksToAdoptStatsByArtist, artistName, track)
    validate.call(this, track)
  }

  catch (unused) { }
}
