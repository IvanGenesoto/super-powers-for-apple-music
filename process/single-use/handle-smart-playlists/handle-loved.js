module.exports = function handleLoved(track) {

  const {state, isDisliked} = this
  const {shouldDeriveRatingByArtist} = state
  const key = isDisliked ? 'disliked' : 'loved'
  const {rating, artist} = track.properties()

  const newRating = isDisliked
    ? // eslint-disable-line operator-linebreak
        rating === 0 ? 10
      : rating === 10 ? 10
      : rating === 20 ? 10
      : rating - 20
    : // eslint-disable-line operator-linebreak
        rating === 100 ? 100
      : rating === 10 ? 20
      : rating + 20

  try {
    track.rating.set(newRating)
    track[key].set(false)
    shouldDeriveRatingByArtist[artist] = true
  }

  catch (unused) { }
}
