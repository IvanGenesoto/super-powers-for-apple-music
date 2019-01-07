const executeCommand = require('./execute-command')
const getChildPlaylists = require('../../get/child-playlists')

module.exports = function executeAndRecurse(playlist) {

  const tracks = playlist.tracks()
  if (!tracks.length) return

  const {state, folderName} = this
  const {folderCommandKitByName, playlistCommandKitByName} = state
  const playlistName = playlist.name()
  const playlistCommandKit = playlistCommandKitByName[playlistName]
  const commandKit = playlistCommandKit || folderCommandKitByName[folderName]
  const children = getChildPlaylists.call(this, playlistName)

  commandKit && tracks.forEach(executeCommand, {...this, commandKit, playlistName})
  children && children.forEach(executeAndRecurse, {...this, folderName: playlistName})
}
