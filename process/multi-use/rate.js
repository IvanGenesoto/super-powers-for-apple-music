module.exports = function rate(track) {

  const {state, isLoved} = this
  const {shouldDeriveRatingByArtist} = state
  const propertyName = isLoved ? 'loved' : 'disliked'
  const rating = track.rating()

  const newRating = isLoved
    ? // eslint-disable-line operator-linebreak
        rating === 100 ? 100
      : rating === 10 ? 20
      : rating + 20
    : // eslint-disable-line operator-linebreak
        rating === 0 ? 10
      : rating === 10 ? 10
      : rating === 20 ? 10
      : rating - 20

  try {
    track.rating.set(newRating)
    track[propertyName].set(false)
    const normalizedRating =
        rating === 10 ? 0
      : rating / 20
    track.season.set(normalizedRating)
    shouldDeriveRatingByArtist[track.artist()] = true
  }

  catch (unused) { }
}
