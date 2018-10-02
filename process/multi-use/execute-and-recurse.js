const executeCommand = require('./execute-command')
const getChildPlaylists = require('../../get/child-playlists')

module.exports = function executeAndRecurse(playlist) {

  const tracks = playlist.tracks()
  if (!tracks.length) return

  const state = this
  const {parentName, folderCommandKitByName, playlistCommandKitByName} = state
  const playlistName = playlist.name()
  const playlistCommandKit = playlistCommandKitByName[playlistName]
  const commandKit = playlistCommandKit || folderCommandKitByName[parentName]
  const children = getChildPlaylists(playlist, state)

  commandKit && tracks.forEach(executeCommand, {...state, commandKit, playlistName})
  children && children.forEach(executeAndRecurse, {...state, parentName: playlistName})
}
