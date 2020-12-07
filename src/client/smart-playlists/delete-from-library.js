export const deleteFromLibrary = function (track) {

  const {state} = this
  const {songById} = state
  const id = track.databaseID()
  const librarySong = songById[id]

  librarySong?.track.delete()
}
