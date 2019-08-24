module.exports = function deleteFromLibrary(track) {

  const {state} = this
  const {_allTracks} = state
  const data = track.properties()
  const {databaseID} = data
  const [libraryTrack] = _allTracks.whose({databaseID})() || []

  libraryTrack && libraryTrack.delete()
}
