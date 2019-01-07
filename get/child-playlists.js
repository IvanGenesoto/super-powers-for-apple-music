module.exports = function getChildPlaylists(name) {

  const {state} = this
  const {playlists} = state
  const childPlaylists = []

  playlists.forEach(playlist => {
    try { playlist.parent.name() === name && childPlaylists.push(playlist) }
    catch (unused) { }
  })

  return childPlaylists.length && childPlaylists
}
