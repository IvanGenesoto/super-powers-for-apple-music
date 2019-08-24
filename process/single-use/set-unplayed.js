module.exports = function setUnplayed(track) {

  const {state} = this
  const {_allTracks} = state

  const setUnplayedToTrue = track => {
    try { track.unplayed.set(true) }
    catch (unused) { }
  }

  _allTracks.whose({unplayed: false})().forEach(setUnplayedToTrue)
}
