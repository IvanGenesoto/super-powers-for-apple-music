module.exports = function handleState() {

  const getPlaylist = require('../../../get/playlist')
  const deriveArtistAttribute = require('./derive-artist-attribute')
  const deriveArtistRating = require('./derive-artist-rating')
  const adoptValues = require('./adopt-values')
  const setMonthsSinceUpdated = require('./set-months-since-updated')
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
  getPlaylist('Updatable Artists').tracks().forEach(setMonthsSinceUpdated, this) // #smartPlaylist: Proxy tracks of artists with a status other than rejected, dismissed or retired.
}
