const appendAndPush = require('../../multi-use/append-and-push')
const validate = require('../../multi-use/validate')

module.exports = function initialize(track) {

  const {state} = this
  const {shouldDeriveRatingByArtist, tracksToAdoptValuesByArtist} = state
  const data = track.properties()
  const {genre, rating, composer, artist} = data
  const composerText = composer ? `Composer: ${composer}` : ''
  const delimiter = composer ? ', ' : ''

  try {
    track.composer.set(`${composerText}${delimiter}Original Genre: ${genre}`)
    track.genre.set('-')
    track.year.set(0)
    track.movementNumber.set(0)
    rating && (shouldDeriveRatingByArtist[artist] = true)
    appendAndPush(tracksToAdoptValuesByArtist, artist, track)
    validate.call({...this, data}, track)
    track.delete()
  }

  catch (unused) { }
}
