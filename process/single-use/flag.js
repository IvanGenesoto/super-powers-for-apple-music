module.exports = function flag(track) {
  const {shouldRateByArtist} = this
  try {
    shouldRateByArtist[track.artist()] = true
    track.unplayed.set(true) // #debug: Will need to set this elsewhere as setting fields may reset this.
  }
  catch (unused) { }
}
