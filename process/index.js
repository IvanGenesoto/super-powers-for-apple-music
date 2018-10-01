module.exports = function process(isTest) {

  const app = require('../app')
  const getPlaylist = require('../get/playlist')
  const disambiguate = require('./single-use/disambiguate')
  const rate = require('./multi-use/rate')
  const flag = require('./single-use/flag')
  const initialize = require('./single-use/initialize')
  const executeAndRecurse = require('./multi-use/execute-and-recurse')
  const getSpecialKit = require('../get/special-kit')
  const createCommandKitByName = require('../single-use/create-command-kit-by-name')

  const state = {
    allPlaylists: app.playlists(),
    shouldRateByArtist: {},
    shouldInferGenreByArtist: {},
    shouldInferVocalistByArtist: {},
    wasUpdatadedByArtist: {},
    tracksByArtist: {},
    tracksToSetStatusByArtist: {},
    tracksToSetDiscoveredByArtist: {},
    tracksToSetGenreByArtist: {}
  }

  const $allTracks = state.$allTracks = getPlaylist(isTest ? 'test' : 'Library').tracks

  state.commandKitByName = createCommandKitByName.call(state)
  state.folderCommandKitByName = getSpecialKit.call(state)
  state.folderCommandKitByName = getSpecialKit.call(state, true)

  getPlaylist('Ambiguous Love').tracks().forEach(disambiguate)// #smart-playlist: Tracks whose love is not "loved," "disliked," nor "none."
  $allTracks.whose({loved: true})().forEach(rate, {...state, isLoved: true})
  $allTracks.whose({disliked: true})().forEach(rate, state)
  $allTracks.whose({unplayed: false})().forEach(flag, state)
  getPlaylist('Uninitialized').tracks().forEach(initialize, state) // #smart-playlist: Tracks without an "Ungenred" tag.

  const commandsFolder = getPlaylist('1 Commands')
  executeAndRecurse.call(state, commandsFolder)
}
