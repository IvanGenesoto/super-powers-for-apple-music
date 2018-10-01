const executeEffect = require('./execute-effect')
const getArtistTracks = require('../../get/artist-tracks')

module.exports = function executeCommand(track) {

  const artistName = track.artist.name()
  const {state, commandKit, playlistName = commandKit.validation.playlistName} = this
  const {effects} = commandKit
  const {isArtistCommand, valueByArtist, value} = commandKit

  if (valueByArtist) {
    if (value !== undefined) valueByArtist[artistName] = value
    else if (!valueByArtist[artistName]) valueByArtist[artistName] = []
  }

  const execute = track => {
    try { effects.forEach(executeEffect, {...state, track, playlistName, artistName}) }
    catch (unused) { }
  }

  if (isArtistCommand) getArtistTracks.call(state, track).forEach(execute)
  else execute(track)

  track.delete()
}
