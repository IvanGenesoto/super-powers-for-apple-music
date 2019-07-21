module.exports = function createState(isTest) {

  const app = require('../../app')
  const getArtistTracks = require('../../get/artist-tracks')
  const getPlaylist = require('../../get/playlist')
  const playlistName = isTest ? 'test' : 'Library'

  const state = {
    shouldDeriveRatingByArtist: {},
    shouldDeriveVocalsByArtist: {},
    shouldDeriveGenreByArtist: {},
    didSetRatingByArtist: {},
    didSetStatusByArtist: {},
    didSetVocalsByArtist: {},
    didSetGenreByArtist: {},
    didAdoptValuesByArtist: {},
    parentNameByPlaylistName: {},
    tracksToAdoptValuesByArtist: {},
    tracksByArtist: {},
    playlists: app.playlists()
  }

  const this_ = {state}

  state.getArtistTracks = getArtistTracks.bind(this_)
  state._allTracks = getPlaylist(playlistName).tracks

  return state
}
