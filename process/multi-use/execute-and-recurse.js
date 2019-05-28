const getChildPlaylists = require('../../get/child-playlists')
const labelKitByLabel = require('../../label-kit-by-label')
const executeCommand = require('./execute-command')

module.exports = function executeAndRecurse(playlist) {

  const {state, folderName} = this
  const {getArtistTracks} = state
  const playlistData = playlist.properties()
  const {tracks, name: playlistName} = playlistData
  const {length: trackCount} = tracks

  const parseName = (playlistName, isPlaylist) => {
    const denumberedName = denumber(playlistName)
    const name = denumberedName.toLowerCase().startsWith('set ')
      ? denumberedName.slice(4)
      : denumberedName
    const {label, isArtistCommand} = name.toLowerCase().startsWith('artist ')
      ? {label: name.slice(7), isArtistCommand: true}
      : {label: name}
    const labelKit = labelKitByLabel[label]
    return labelKit || isPlaylist
      ? {labelKit, isArtistCommand, isPlaylist}
      : parseName(playlistName, true)
  }

  const denumber = string => Number.isInteger(+string[0]) || string[0] === ' '
      ? denumber(string.slice(1))
      : string

  const callAndDelete = track => {
    const wrappedDidThrow = {}
    isArtistCommand && getArtistTracks(track.artist()).forEach(
      track => callExecuteCommand(track, wrappedDidThrow)
    )
    isArtistCommand || callExecuteCommand(track, wrappedDidThrow)
    const {didThrow} = wrappedDidThrow
    didThrow || track.delete()
  }

  const callExecuteCommand = (track, wrappedDidThrow) => {
    const data = track.properties()
    const label = isPlaylist ? playlistName : folderName
    const value = playlistName
    try { executeCommand.call({...this, label, labelKit, value, data}, track) }
    catch (unused) { wrappedDidThrow.didThrow = true }
  }

  if (!trackCount) return

  const children = getChildPlaylists.call(this, playlistName)
  const {labelKit, isArtistCommand, isPlaylist} = parseName(folderName)

  labelKit && tracks.forEach(callAndDelete)
  children && children.forEach(executeAndRecurse, {...this, folderName: playlistName})
}
