module.exports = function handleState() {

  const derive = require('./derive') // #debug: Create function! Also sets didSetVocalsByArtist[artist], etc., to true.
  const deriveRating = require('./derive/rating') // #debug: Create function! Also sets status if didSetStatusByArtist[artist] is falsy and then sets it to true (along with didSetRatingByArtist[artist]).
  const deriveStatus = require('./derive/status') // #debug: Create function! Also sets didSetStatusByArtist[artist] to true.
  const adoptValues = require('./adopt-values')
  const {state} = this

  const {
    shouldDeriveRatingByArtist,
    shouldDeriveStatusByArtist,
    tracksToAdoptValuesByArtist
  } = state

  const callDerive = trackLabel => {
    const label = 'Artist ' + trackLabel
    const stateKeyToCall = 'shouldDerive' + trackLabel + 'ByArtist'
    const stateKey = 'didSet' + trackLabel + 'ByArtist'
    const shouldDeriveByArtist = state[stateKeyToCall]
    Object
      .keys(shouldDeriveByArtist)
      .forEach(derive, {...this, label, trackLabel, stateKey})
  }

  callDerive('Vocals')
  callDerive('Genre')

  Object.keys(shouldDeriveRatingByArtist).forEach(deriveRating, this)
  Object.keys(shouldDeriveStatusByArtist).forEach(deriveStatus, this)
  Object.entries(tracksToAdoptValuesByArtist).forEach(adoptValues, this)
}
