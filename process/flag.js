module.exports = function flag(track) {
  const shouldRateByArtist = this
  try {
    shouldRateByArtist[track.artist()] = true
    track.unplayed.set(true)
  }
  catch (unused) { }
}
