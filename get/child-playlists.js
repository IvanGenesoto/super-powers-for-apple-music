module.exports = folder => {
  const {allPlaylists} = this
  const name = folder.name()
  const childPlaylists = []
  allPlaylists.forEach(playlist => {
    try { playlist.parent.name() === name && childPlaylists.push(playlist) }
    catch (unused) { }
  })
  return childPlaylists.length && childPlaylists
}
