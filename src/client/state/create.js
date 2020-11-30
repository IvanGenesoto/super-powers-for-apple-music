import {app, getPlaylist} from '..'

export function createState(shouldProcessAll, isTest) {

  const appendSong = (songById, song) => {
    const {databaseID: databaseId} = song
    songById[databaseId] = song
    return songById
  }

  const appendArtist = (trueByArtist, song) => {
    const {artist} = song
    trueByArtist[artist] = true
    return trueByArtist
  }

  const playlistName = isTest ? 'Test' : 'Library'
  const allPlaylists_ = app.playlists()
  const allPlaylists = Array.from(allPlaylists_)
  const allLists = allPlaylists.map(playlist => ({...playlist.properties(), playlist}))
  const allTracks_ = getPlaylist(playlistName).tracks()
  const allTracks = Array.from(allTracks_)
  const allSongs = allTracks.map(track => ({...track.properties(), track}))
  const songById = allSongs.reduce(appendSong, {})
  const trueByArtist = shouldProcessAll && allSongs.reduce(appendArtist, {})
  const allArtists = shouldProcessAll && Object.keys(trueByArtist)

  const state = {
    shouldDeriveRatingByArtist: {},
    shouldDeriveVocalsByArtist: {},
    shouldDeriveGenreByArtist: {},
    didSetRatingByArtist: {},
    didSetStatusByArtist: {},
    didSetVocalsByArtist: {},
    didSetGenreByArtist: {},
    didUpdateByArtist: {},
    parentNameByListName: {},
    songsToAdoptValuesByArtist: {},
    songsByArtist: {},
    nil: '-',
    songById,
    allLists,
    allSongs,
    allArtists,
    shouldProcessAll,
  }

  return state
}
