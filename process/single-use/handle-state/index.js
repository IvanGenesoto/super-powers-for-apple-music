module.exports = function handleState() {

  const deriveRating = require('./derive-rating') // #debug: Create function! Also sets status if "didSet" is falsy and sets "didSet" to true for both.
  const deriveHasVocalist = require('./derive-has-vocalist') // #debug: Create function! Also sets "didSet" to true.
  const deriveGenre = require('./derive-genre') // #debug: Create function! Also sets "didSet" to true.
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
