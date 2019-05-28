module.exports = function handleState() {

  const deriveRating = require('./derive-rating') // #debug: Create function! Also sets status if didSetStatusByArtist[artist] is falsy and then sets it to true (along with didSetRatingByArtist[artist]).
  const deriveHasVocalist = require('./derive-has-vocalist') // #debug: Create function! Also sets didSetHasVocalistByArtist[artist] to true.
  const deriveGenre = require('./derive-genre') // #debug: Create function! Also sets didSetGenreByArtist[artist] to true.
  const adoptValues = require('./adopt-values')
  const {state} = this

  const {
    shouldDeriveRatingByArtist,
    shouldDeriveHasVocalistByArtist,
    shouldDeriveGenreByArtist,
    tracksToAdoptValuesByArtist
  } = state

  Object.keys(shouldDeriveRatingByArtist).forEach(deriveRating, this)
  Object.keys(shouldDeriveHasVocalistByArtist).forEach(deriveHasVocalist, this)
  Object.keys(shouldDeriveGenreByArtist).forEach(deriveGenre, this)
  Object.entries(tracksToAdoptValuesByArtist).forEach(adoptValues, this)
}
