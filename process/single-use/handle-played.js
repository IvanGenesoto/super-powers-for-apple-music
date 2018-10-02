module.exports = function handlePlayed(track) {

  const {shouldRateByArtist, tracksToSetUnplayed} = this
  const name = track.artist.name()
  shouldRateByArtist[name] = true
  tracksToSetUnplayed.push(track)
}
