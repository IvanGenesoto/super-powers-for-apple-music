import {app} from '..'

export function _getChildPlaylists(playlistName) {

  const {state} = this
  const {hasNoParentByPlaylistName, parentNameByPlaylistName} = state
  const _playlists = app.playlists()
  const _childPlaylists = []

  _playlists.forEach(_playlist => {
    const childName = _playlist.name()
    const hasNoParent = hasNoParentByPlaylistName[childName]
    if (hasNoParent) return
    let parentName = parentNameByPlaylistName[childName]
    if (parentName) return parentName === playlistName && _childPlaylists.push(_playlist)
    try {
      parentName = parentNameByPlaylistName[childName] = _playlist.parent.name()
    }
    catch {
      hasNoParentByPlaylistName[childName] = true
    }
    if (parentName === playlistName) _childPlaylists.push(_playlist)
  })

  return _childPlaylists.length && _childPlaylists
}
