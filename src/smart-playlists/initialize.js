const validate = require('../validate')

module.exports = function initialize(track) {

  const {state} = this
  const {shouldDeriveRatingByArtist, tracksToAdoptValuesByArtist} = state
  const data = track.properties()
  const {genre, rating, composer, artist} = data
  const composerText = composer ? `Composer: ${composer}` : ''
  const delimiter = composer ? ', ' : ''
  const tracks_ = tracksToAdoptValuesByArtist[artist]
  const tracks = tracksToAdoptValuesByArtist[artist] = tracks_ || []

  try {
    track.composer.set(`${composerText}${delimiter}Original Genre: ${genre}`)
    track.genre.set('-')
    track.movementNumber.set(0)
    rating && (shouldDeriveRatingByArtist[artist] = true)
    tracks.push(track)
    validate.call({...this, data}, track)
    track.delete()
  }

  catch (unused) { }
}
