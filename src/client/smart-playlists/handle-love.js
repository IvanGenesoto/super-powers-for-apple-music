/// import {getPlaylist} from '..'

export const handleLove = song => {

  const {state, isDisliked} = this
  const {shouldDeriveRatingByArtist} = state
  /// const {rating, artist, track, databaseID: databaseId} = song
  const {rating, artist, track} = song
  const key = isDisliked ? 'disliked' : 'loved'
  /// const isFavorite = !isDisliked && rating === 100
  const canBeBad = !rating || rating === 10 || rating === 20
  const isBad = canBeBad && isDisliked

  /// const addToFavorite = () => {
  ///   const getFavorites = () => _playlist && _playlist.tracks()
  ///   const getDatabaseIds = () => _favorites && _favorites.map(getDatabaseId)
  ///   const getDatabaseId = track => track.databaseID()
  ///   const _playlist = getPlaylist('Favorite')
  ///   const _favorites = getFavorites()
  ///   const databaseIds = getDatabaseIds()
  ///   const isInPlaylist = databaseIds && databaseIds.includes(databaseId)
  ///   isInPlaylist || track.duplicate({to: _playlist})
  /// }

  /// const rating_ =
  ///     isDisliked && rating ? rating - 20
  ///   : isDisliked ? 20
  ///   : rating + 20

  const rating_ =
      /// isFavorite ? 100
      isBad ? 10
    : isDisliked ? rating - 20
    : rating === 10 ? 20
    : rating === 100 ? 100
    : rating + 20

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
