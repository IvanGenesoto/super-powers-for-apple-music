const getChildPlaylists = require('../../get/child-playlists')
const labelKitByLabel = require('../../label-kit-by-label')
const executeCommand = require('./execute-command')

module.exports = function executeAndRecurse(playlist) {

  const {state, folderName} = this
  const {getArtistTracks} = state
  const playlistData = playlist.properties()
  const {tracks, name: playlistName} = playlistData
  const this_ = {...this, folderName: playlistName}
  const [hasTrack] = tracks

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
    const value = playlistName
    try { executeCommand.call({...this, label, labelKit, value, data}, track) }
    catch (unused) { wrappedDidThrow.didThrow = true }
  }

  if (!hasTrack) return

  const children = getChildPlaylists.call(this, playlistName)
  const commandName = denumber(folderName)
  const label = commandName.startsWith('Set ') ? commandName.slice(4) : commandName
  const isArtistCommand = label.toLowerCase().startsWith('artist')
  const labelKit = labelKitByLabel[label]

  labelKit && tracks.forEach(callAndDelete)
  !labelKit && children && children.forEach(executeAndRecurse, this_)
}
