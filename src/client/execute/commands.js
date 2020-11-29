import {tagKitByLabel, executeCommand} from '..'
/// import {_getChildPlaylists} from '..'

export function executeCommands(_playlist) {

  /// const {state, folderName} = this
  const {state} = this
  const {getArtistTracks} = state
  const playlistData = _playlist.properties()
  const {tracks, name: playlistName} = playlistData
  /// const this_ = {...this, folderName: playlistName}
  const [hasTrack] = tracks
  const sequencingCharacters = [' ', '.']

  const desequence = string =>
        isCharacterSequencing(string[0]) ? desequence(string.slice(1))
      : string

  const isCharacterSequencing = character =>
       Number.isInteger(+character)
    || sequencingCharacters.includes(character)

  const callAndDelete = track => {
    const wrappedDidThrow = {}
    const data = track.properties()
    const {artist} = data
    isArtistCommand && getArtistTracks(artist).forEach(
      track => callExecuteCommand(track, wrappedDidThrow),
    )
    isArtistCommand || callExecuteCommand(track, wrappedDidThrow, data)
    const {didThrow} = wrappedDidThrow
    didThrow || track.delete()
  }

  const callExecuteCommand = (track, wrappedDidThrow, data_) => {
    const data = data_ || track.properties()
    const value = playlistName
    try {
      executeCommand.call({...this, label, tagKit, value, data}, track)
    }
    catch {
      wrappedDidThrow.didThrow = true
    }
  }

  if (!hasTrack) return

  /// const _children = _getChildPlaylists.call(this, playlistName)
  const label = desequence(playlistName)
  const label_ = 'Song ' + label
  const isArtistCommand = label.startsWith('Artist')
  const tagKit = tagKitByLabel[label] || tagKitByLabel[label_]

  tagKit && tracks.forEach(callAndDelete)
  /// !tagKit && _children && _children.forEach(executeCommands, this_)
}
