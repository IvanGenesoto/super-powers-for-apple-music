import {getArtistTracks, _getPlaylist} from '..'

export function createState(shouldProcessAll, isTest) {

  const appendArtist = (trueByArtist, track) => {
    const artist = track.artist()
    trueByArtist[artist] = true
    return trueByArtist
  }

  const playlistName = isTest ? 'Test' : 'Library'
  const _allTracks = _getPlaylist(playlistName).tracks
  const trueByArtist = shouldProcessAll && _allTracks().reduce(appendArtist, {})
  const artists = shouldProcessAll && Object.keys(trueByArtist)

  const state = {
    shouldDeriveRatingByArtist: {},
    shouldDeriveVocalsByArtist: {},
    shouldDeriveGenreByArtist: {},
    didSetRatingByArtist: {},
    didSetStatusByArtist: {},
    didSetVocalsByArtist: {},
    didSetGenreByArtist: {},
    didUpdateByArtist: {},
    parentNameByPlaylistName: {},
    tracksToAdoptValuesByArtist: {},
    tracksByArtist: {},
    _allTracks,
    artists,
    shouldProcessAll,
  }

  const this_ = {state}

  state.getArtistTracks = getArtistTracks.bind(this_)

  return state
}
