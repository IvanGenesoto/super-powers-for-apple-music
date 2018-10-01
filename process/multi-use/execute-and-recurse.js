const executeCommand = require('./execute-command')
const getChildPlaylists = require('../../get/child-playlists')

module.exports = function executeAndRecurse(playlist) {

  const state = this
  const {parentName, folderCommandKitByName, playlistCommandKitByName} = state
  const playlistName = playlist.name()
  const playlistCommandKit = playlistCommandKitByName[playlistName]
  const commandKit = playlistCommandKit || folderCommandKitByName[parentName]
  const tracks = playlist.tracks()

  const getChildrenAndRecurse = () => {
    const children = getChildPlaylists(playlist, state)
    children && children.forEach(
      executeAndRecurse, {...state, parentName: playlistName}
    )
  }

  if (!commandKit) return getChildrenAndRecurse()

  tracks.forEach(executeCommand, {...state, commandKit, playlistName})
}
