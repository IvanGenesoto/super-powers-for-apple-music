module.exports = function createState(isTest) {

  const app = require('../../../app')
  const getArtistTracks = require('../../../get/artist-tracks')
  const specializeKit = require('./specialize-kit')
  const getPlaylist = require('../../../get/playlist')
  const playlistName = isTest ? 'test' : 'Library'

  const state = {
    shouldDeriveRatingByArtist: {}, // #note: "rateArtist" function may also set status.
    shouldDeriveHasVocalistByArtist: {},
    shouldDeriveGenreByArtist: {},
    didSetRatingByArtist: {},
    didSetStatusByArtist: {},
    didSetHasVocalistByArtist: {},
    didSetGenreByArtist: {},
    didAdoptValuesByArtist: {},
    parentNameByPlaylistName: {},
    tracksToAdoptValuesByArtist: {}, // #note: Process checks for coresponding property on "didSetStatusByArtist" and if not present, tracks adopt first status found in artist, then the same for "didSetGenreByArtist", etc.
    tracksByArtist: {},
    playlists: app.playlists()
  }

  const this_ = {state}

  state.getArtistTracks = getArtistTracks.bind(this_)
  state.folderCommandKitByName = specializeKit.call(this_)
  state.playlistCommandKitByName = specializeKit.call(this_, true)
  state._allTracks = getPlaylist(playlistName).tracks

  return state
}
