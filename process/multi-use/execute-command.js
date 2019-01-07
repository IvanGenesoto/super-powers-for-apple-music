const executeEffect = require('./execute-effect')

module.exports = function executeCommand(track) {

  const {state, commandKit} = this
  const {getArtistTracks} = state
  const {isArtistCommand, effects, valueByArtist, value = true} = commandKit
  const artistName = track.artist.name()

  const execute = track => {
    const this_ = {...this, artistName, track}
    try { effects.forEach(executeEffect, this_) }
    catch (unused) { }
  }

  valueByArtist && (valueByArtist[artistName] = value)
  isArtistCommand && getArtistTracks(track, artistName).forEach(execute)
  isArtistCommand || execute(track)

  track.delete()
}
