const executeEffect = require('./execute-effect')

module.exports = function executeCommand(track) {

  const state = this
  const {getArtistTracks, commandKit, playlistName = commandKit.validation.playlistName} = state
  const {isArtistCommand, effects} = commandKit
  const artistName = track.artist.name()

  const execute = track => {
    try { effects.forEach(executeEffect, {...state, track, playlistName, artistName}) }
    catch (unused) { }
  }

  if (isArtistCommand) getArtistTracks(track, artistName).forEach(execute)
  else execute(track)

  track.delete()
}
