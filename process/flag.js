module.exports = function flag(track) {
  const shouldRateByArtist = this
  try {
    track.unplayed.set(true)
    shouldRateByArtist[track.artist()] = true
  }
  catch (unused) { }
}
