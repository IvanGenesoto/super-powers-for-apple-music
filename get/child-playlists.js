const app = require('./app')
module.exports = parentPlaylistName => {
  const childPlaylists = []
  const allPlaylists = app.playlists()
  allPlaylists.forEach(playlist => {
    try { playlist.parent.name() === parentPlaylistName && childPlaylists.push(playlist) }
    catch (unused) { }
  })
  return childPlaylists
}
