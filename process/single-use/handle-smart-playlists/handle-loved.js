// const getPlaylist = require('../get/playlist')

module.exports = function handleLoved(track) {

  const {state, isDisliked} = this
  const data = track.properties()
  // const {databaseID: databaseId, rating, artist} = data
  const {rating, artist} = data
  // const shouldCheckFavorite = rating === 100
  // const playlist = shouldCheckFavorite && getPlaylist('Favorite')
  // const getFavorites = () => playlist && playlist.tracks()
  // const getDatabaseIds = () => favorites && favorites.map(getDatabaseId)
  // const getDatabaseId = track => track.databaseID()
  // const favorites = shouldCheckFavorite && getFavorites()
  // const databaseIds = shouldCheckFavorite && getDatabaseIds()
  // const isFavorite = shouldCheckFavorite && databaseIds && databaseIds.includes(databaseId)
  const {shouldDeriveRatingByArtist} = state
  const key = isDisliked ? 'disliked' : 'loved'
  const isFavorite = !isDisliked && rating === 100
  const shouldNotSet = isDisliked && rating === 20
  const isBad_ = !rating || rating === 10 || rating === 20
  const isBad = isDisliked && isBad_

  const newRating = isDisliked
    ? !rating || rating === 10 ? 20 : rating - 20
    : rating === 10 ? 20 : rating + 20

  try {
    isFavorite || shouldNotSet || track.rating.set(newRating)
    isFavorite || isBad || track[key].set(false)
    // shouldCheckFavorite && !isFavorite && playlist && track.duplicate({to: playlist})
    shouldDeriveRatingByArtist[artist] = true
  }

  catch (unused) { }
}
