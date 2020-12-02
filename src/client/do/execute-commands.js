import {fieldKitByLabel, executeCommand} from '..'
/// import {getChildLists} from '..'

export const executeCommands = function (list) {

  /// const {state, folderName} = this
  const {state} = this
  const {getArtistSongs} = state
  const {name: listName, playlist} = list
  const tracks_ = playlist.tracks()
  const tracks = Array.from(tracks_)
  const songs = tracks.map(track => ({...track.properties(), track}))
  const [hasSong] = songs
  const sequencingCharacters = [' ', '.']
  /// const this_ = {...this, folderName: listName}

  const desequence = string =>
      isCharacterSequencing(string[0]) ? desequence(string.slice(1))
    : string

  const isCharacterSequencing = character =>
       Number.isInteger(+character)
    || sequencingCharacters.includes(character)

  const callAndDelete = song => {
    const wrappedDidThrow = {}
    const {artist, track} = song
    const artistSongs = isArtistCommand && getArtistSongs(artist, state)
    const call = songs => callExecuteCommand(songs, wrappedDidThrow)
    isArtistCommand && artistSongs.forEach(call)
    isArtistCommand || callExecuteCommand(song, wrappedDidThrow)
    const {didThrow} = wrappedDidThrow
    didThrow || track.delete()
  }

  const callExecuteCommand = (song, wrappedDidThrow) => {
    try {
      executeCommand.call({...this, fieldKit}, song, label, listName)
    }
    catch {
      wrappedDidThrow.didThrow = true
    }
  }

  if (!hasSong) return

  /// const _children = getChildLists(listName, state)
  const label = desequence(listName)
  const label_ = 'Song ' + label
  const isArtistCommand = label.startsWith('Artist')
  const fieldKit = fieldKitByLabel[label] || fieldKitByLabel[label_]

  fieldKit && songs.forEach(callAndDelete)
  /// !fieldKit && _children.length && _children.forEach(executeCommands, this_)
}
