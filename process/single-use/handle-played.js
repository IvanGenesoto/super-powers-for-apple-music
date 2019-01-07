module.exports = function handlePlayed(track) {

  const {state} = this
  const {shouldDeriveRatingByArtist, tracksToSetUnplayed} = state
  const name = track.artist.name()

  shouldDeriveRatingByArtist[name] = true
  tracksToSetUnplayed.push(track)
}
