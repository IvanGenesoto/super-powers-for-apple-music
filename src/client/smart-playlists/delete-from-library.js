export function deleteFromLibrary(track) {

  const {state} = this
  const {songById} = state
  const databaseId = track.databaseID()
  const librarySong = songById[databaseId]

  librarySong?.track.delete()
}
