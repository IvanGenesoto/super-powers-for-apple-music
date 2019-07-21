module.exports = function handleState() {

  const deriveArtistAttribute = require('./derive-artist-attribute')
  const deriveArtistRating = require('./derive-artist-rating')
  const adoptValues = require('./adopt-values')
  const {state} = this
  const {shouldDeriveRatingByArtist, tracksToAdoptValuesByArtist} = state

  const callDeriveArtistAttribute = trackLabel => {
    const label = 'Artist ' + trackLabel
    const stateKeyToCall = 'shouldDerive' + trackLabel + 'ByArtist'
    const stateKey = 'didSet' + trackLabel + 'ByArtist'
    const shouldDeriveByArtist = state[stateKeyToCall]
    Object
      .keys(shouldDeriveByArtist)
      .forEach(deriveArtistAttribute, {...this, label, trackLabel, stateKey})
  }

  callDeriveArtistAttribute('Vocals')
  callDeriveArtistAttribute('Genre')

  Object.keys(shouldDeriveRatingByArtist).forEach(deriveArtistRating, this)
  Object.entries(tracksToAdoptValuesByArtist).forEach(adoptValues, this)
}
