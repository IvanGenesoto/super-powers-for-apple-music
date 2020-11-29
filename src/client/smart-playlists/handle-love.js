/// import {_getPlaylist} from '..'

export function handleLove(track) {

  const {state, isDisliked} = this
  const {shouldDeriveRatingByArtist} = state
  const data = track.properties()
  const {rating, artist} = data
  const key = isDisliked ? 'disliked' : 'loved'
  /// const isFavorite = !isDisliked && rating === 100
  const canBeBad = !rating || rating === 10 || rating === 20
  const isBad = isDisliked && canBeBad

  const rating_ =
      /// isFavorite ? 100
      isBad ? 10
    : isDisliked ? rating - 20
    : rating === 10 ? 20
    : rating === 100 ? 100
    : rating + 20

  /// const rating_ =
  ///     isDisliked && rating ? rating - 20
  ///   : isDisliked ? 20
  ///   : rating + 20

  /// const addToFavorite = () => {
  ///   const getFavorites = () => _playlist && _playlist.tracks()
  ///   const getDatabaseIds = () => favorites && favorites.map(getDatabaseId)
  ///   const getDatabaseId = track => track.databaseID()
  ///   const _playlist = _getPlaylist('Favorite')
  ///   const favorites = getFavorites()
  ///   const databaseIds = getDatabaseIds()
  ///   const isInPlaylist = databaseIds && databaseIds.includes(databaseId)
  ///   isInPlaylist || track.duplicate({to: _playlist})
  /// }

  /// try {
  ///   const shouldNotSet = isDisliked && rating === 20
  ///   isFavorite || shouldNotSet || track.rating.set(rating_)
  ///   isFavorite || isBad || track[key].set(false)
  ///   shouldDeriveRatingByArtist[artist] = true
  /// }

  try {
    rating_ === rating || track.rating.set(rating_)
    track[key].set(false)
    shouldDeriveRatingByArtist[artist] = true
    /// isFavorite && addToFavorite()
  }

  catch {}
}
