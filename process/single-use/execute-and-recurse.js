const executeCommand = require('../multi-use/execute-command')

module.exports = function executeAndRecurse(playlist) {

  const {parentName, folderCommandKitByName, playlistCommandKitByName} = this
  const playlistName = playlist.name()
  const playlistCommandKit = playlistCommandKitByName[playlistName]
  const folderCommandKit = folderCommandKitByName[parentName]

  if (playlistCommandKit) {
    const tracks = playlist.tracks()
    const {effects} = playlistCommandKit
    const applyEffects = track => {
      try { effects.forEach(executeCommand, {playlistName, track}) }
      catch (unused) { }
    }
    tracks.forEach(applyEffects)
  }
  else if (folderCommandKit) {

  }
}
