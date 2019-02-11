const appendAndPush = require('../multi-use/append-and-push')
const validate = require('../multi-use/validate')

module.exports = function initialize(track) {

  const {state} = this
  const {shouldDeriveRatingByArtist, tracksToAdoptStatsByArtist} = state
  const data = track.properties()
  const {genre, rating, composer, artist} = data
  const composerText = composer ? `Composer: ${composer}` : ''
  const delimiter = composer ? ', ' : ''

  try {
    track.composer.set(`${composerText}${delimiter}Original: ${genre}`)
    track.genre.set('-')
    // appendAndPush(tracksToAdoptGenreByArtist, artist, track)
    // appendAndPush(tracksToAdoptVocalistByArtist, artist, track)
    rating && (shouldDeriveRatingByArtist[artist] = true)
    // else if (!shouldDeriveRatingByArtist[artist]) appendAndPush(tracksToAdoptStatusByArtist, artist, track)
    appendAndPush(tracksToAdoptStatsByArtist, artist, track)
    validate.call({...this, data}, track)
    track.delete()
  }

  catch (unused) { }
}
