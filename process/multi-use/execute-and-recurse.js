const executeCommand = require('./execute-command')
const getChildPlaylists = require('../../get/child-playlists')

module.exports = function executeAndRecurse(playlist) {

  const playlistData = playlist.properties()
  const {tracks, name: playlistName} = playlistData
  const {length} = tracks

  if (!length) return

  const {state, folderName} = this
  const {folderCommandKitByName, playlistCommandKitByName} = state
  const playlistCommandKit = playlistCommandKitByName[playlistName]
  const commandKit = playlistCommandKit || folderCommandKitByName[folderName]
  const children = getChildPlaylists.call(this, playlistName)

  const callExecuteCommand = track => {
    const data = track.properties()
    try {
      executeCommand.call({...this, data, commandKit, playlistName}, track)
      track.delete()
    }
    catch (unused) { }
  }

  commandKit && tracks.forEach(callExecuteCommand)
  children && children.forEach(executeAndRecurse, {...this, folderName: playlistName})
}
