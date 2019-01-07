module.exports = function process(isTest) {

  const app = require('../app')
  const getPlaylist = require('../get/playlist')
  const getArtistTracks = require('../get/artist-tracks')
  const disambiguate = require('./single-use/disambiguate')
  const rate = require('./multi-use/rate')
  const handlePlayed = require('./single-use/handle-played')
  const setUnplayed = require('./single-use/set-unplayed')
  const initialize = require('./single-use/initialize')
  const executeAndRecurse = require('./multi-use/execute-and-recurse')
  const specializeKit = require('./single-use/specialize-kit')
  const createCommandKitByName = require('../single-use/create-command-kit-by-name')

  const state = {
    playlists: app.playlists(),
    tracksToSetUnplayed: [],
    shouldDeriveDiscoveredAtByArtist: {},
    tracksToAdoptStatsByArtist: {}, // #note: Checks for coresponding property on "didSetStatusByArtists" and if present, does not run status adoption function, otherwise, tracks adopt first status found in artist. Likewise for genre, etc.
    shouldDeriveRatingByArtist: {},
    shouldDeriveStatusByArtist: {}, // #refactor: May be superflous as "rateArtist" function may also set status.
    shouldDeriveHasVocalistByArtist: {},
    shouldDeriveGenreByArtist: {},
    didSetDiscoveredAtByArtist: {},
    didSetRatingByArtist: {},
    didSetStatusByArtist: {},
    didSetHasVocalistByArtist: {},
    didSetGenreByArtist: {},
    wasUpdatedByArtist: {},
    tracksByArtist: {}
  }

  const this_ = {state}
  const _allTracks = state._allTracks = getPlaylist(isTest ? 'test' : 'Library').tracks

  state.getArtistTracks = getArtistTracks.bind(this_)
  state.commandKitByName = createCommandKitByName.call(this_)
  state.folderCommandKitByName = specializeKit.call(this_)
  state.playlistCommandKitByName = specializeKit.call(this_, true)

  getPlaylist('Ambiguous Love').tracks().forEach(disambiguate)// #smart-playlist: Tracks whose love is not "loved," "disliked," nor "none."
  _allTracks.whose({loved: true})().forEach(rate, {...this_, isLoved: true})
  _allTracks.whose({disliked: true})().forEach(rate, this_)
  _allTracks.whose({unplayed: false})().forEach(handlePlayed, this_)
  getPlaylist('Uninitialized').tracks().forEach(initialize, this_) // #smart-playlist: Tracks without an "Original" tag.

  const commandsFolder = getPlaylist('1 Commands') // #feature: User can set name of commands folder in "Preferences" playlist.
  executeAndRecurse.call(this_, commandsFolder)
}
