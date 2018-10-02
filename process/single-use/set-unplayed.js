module.exports = function setUnplayed(track) {
  try { track.unplayed.set(true) } // #debug: Will need to set this elsewhere as setting fields may reset this.
  catch (unused) { }
}
