module.exports = function handleState() {

  const deriveRating = require('./derive-rating') // #debug: Create function!
  const adoptStats = require('./adopt-stats')
  const {state} = this

  const {
    shouldDeriveRatingByArtist,
    shouldDeriveStatusByArtist,
    shouldDeriveHasVocalistByArtist,
    shouldDeriveGenreByArtist,
    didSetRatingByArtist,
    didSetStatusByArtist,
    didSetHasVocalistByArtist,
    didSetGenreByArtist,
    parentNameByPlaylistName,
    tracksToAdoptStatsByArtist,
    tracksByArtist
  } = state

  Object.entries(shouldDeriveRatingByArtist).forEach(deriveRating, this)
  Object.entries(tracksToAdoptStatsByArtist).forEach(adoptStats, this)
}
