import {app} from '..'

export function getChildPlaylists(playlistName) {

  const {state} = this
  const {hasNoParentByPlaylistName, parentNameByPlaylistName} = state
  const {playlists: _playlists} = app
  const playlists = _playlists()
  const childPlaylists = []

  playlists.forEach(playlist => {
    const childName = playlist.name()
    const hasNoParent = hasNoParentByPlaylistName[childName]
    if (hasNoParent) return
    let parentName = parentNameByPlaylistName[childName]
    if (parentName) return parentName === playlistName && childPlaylists.push(playlist)
    try {
      parentName = parentNameByPlaylistName[childName] = playlist.parent.name()
    }
    catch {
      hasNoParentByPlaylistName[childName] = true
    }
    if (parentName === playlistName) childPlaylists.push(playlist)
  })

  const {length} = childPlaylists

  return length && childPlaylists
}
