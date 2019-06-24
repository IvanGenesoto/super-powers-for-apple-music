module.exports = function createState(isTest) {

  const app = require('../../app')
  const getArtistTracks = require('../../get/artist-tracks')
  const getPlaylist = require('../../get/playlist')
  const playlistName = isTest ? 'test' : 'Library'

  const state = {
    shouldDeriveRatingByArtist: {}, // #note: "rateArtist" function may also set status.
    shouldDeriveStatusByArtist: {},
    shouldDeriveVocalsByArtist: {},
    shouldDeriveGenreByArtist: {},
    didSetRatingByArtist: {},
    didSetStatusByArtist: {},
    didSetVocalsByArtist: {},
    didSetGenreByArtist: {},
    didAdoptValuesByArtist: {},
    parentNameByPlaylistName: {},
    tracksToAdoptValuesByArtist: {}, // #note: Process checks for coresponding property on "didSetStatusByArtist" and if not present, tracks adopt first status found in artist, then the same for "didSetGenreByArtist", etc.
    tracksByArtist: {},
    playlists: app.playlists()
  }

  const this_ = {state}

  state.getArtistTracks = getArtistTracks.bind(this_)
  state._allTracks = getPlaylist(playlistName).tracks

  return state
}
