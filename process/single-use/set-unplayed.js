module.exports = function setUnplayed(track) {

  try { track.unplayed.set(true) } // #debug: Must be set last as setting any other field will reset this.
  catch (unused) { }
}
