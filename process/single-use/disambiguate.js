module.exports = function disambiguate(track) {

  try {
    track.loved.set(false)
    track.disliked.set(false)
  }

  catch (unused) { }
}
