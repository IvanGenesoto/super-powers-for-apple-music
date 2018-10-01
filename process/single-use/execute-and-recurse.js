const executeCommand = require('../multi-use/execute-command')
const getChildPlaylists = require('../../get/child-playlists')

module.exports = function executeAndRecurse(playlist) {

  const state = this
  const {parentName, folderCommandKitByName, playlistCommandKitByName} = state
  const playlistName = playlist.name()
  const playlistCommandKit = playlistCommandKitByName[playlistName]
  const folderCommandKit = folderCommandKitByName[parentName]
  const tracks = playlist.tracks()

  const applyEffects = track => {
    const {effects} = this
    try { effects.forEach(executeCommand, {track, playlistName}) }
    catch (unused) { }
  }

  const getChildrenAndRecurse = () => {
    const children = getChildPlaylists(playlist, state)
    children.length && children.forEach(
      executeAndRecurse, {...state, parentName: playlistName}
    )
  }

  if (!playlistCommandKit && !folderCommandKit) return getChildrenAndRecurse()
  if (playlistCommandKit) tracks.forEach(applyEffects, playlistCommandKit)
  else if (folderCommandKit) tracks.forEach(applyEffects, folderCommandKit)


}
