const getChildPlaylists = require('../../get/child-playlists')
const tagKitByLabel = require('../../tag-kit-by-label')
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
    const data = track.properties()
    const {artist} = data
    isArtistCommand && getArtistTracks(artist).forEach(
      track => callExecuteCommand(track, wrappedDidThrow)
    )
    isArtistCommand || callExecuteCommand(track, wrappedDidThrow, data)
    const {didThrow} = wrappedDidThrow
    didThrow || track.delete()
  }

  const callExecuteCommand = (track, wrappedDidThrow, data_) => {
    const data = data_ || track.properties()
    const value = playlistName
    try { executeCommand.call({...this, label, tagKit, value, data}, track) }
    catch (unused) { wrappedDidThrow.didThrow = true }
  }

  if (!hasTrack) return

  const children = getChildPlaylists.call(this, playlistName)
  const commandName = denumber(folderName)
  const label = commandName.startsWith('Set ') ? commandName.slice(4) : commandName
  const isArtistCommand = label.startsWith('Artist')
  const tagKit_ = tagKitByLabel[label]
  const label_ = 'Song ' + label
  const tagKit = tagKit_ || tagKitByLabel[label_]

  tagKit && tracks.forEach(callAndDelete)
  !tagKit && children && children.forEach(executeAndRecurse, this_)
}
