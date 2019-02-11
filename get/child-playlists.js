module.exports = function getChildPlaylists(name) {

  const {state} = this
  const {playlists, parentNameByPlaylistName} = state
  const childPlaylists = []

  playlists.forEach(playlist => {
    try {
      playlist.parent.name() === name &&
      childPlaylists.push(playlist) &&
      (parentNameByPlaylistName[playlist.name()] = name)
    }
    catch (unused) { }
  })

  return childPlaylists.length && childPlaylists
}
