module.exports = function process(isTest) {

  const getPlaylist = require('../get/playlist')
  const disambiguate = require('./single-use/disambiguate')
  const rate = require('./multi-use/rate')
  const flag = require('./single-use/flag')
  const initialize = require('./single-use/initialize')
  const executeAndRecurse = require('./single-use/execute-and-recurse')
  const getSpecialKit = require('../get/special-kit')

  const state = {
    allTracks: getPlaylist(isTest ? 'Test' : 'Library').tracks,
    folderCommandKitByName: getSpecialKit(),
    playlistCommandKitByName: getSpecialKit(true),
    shouldRateByArtist: {},
    shouldInferGenreByArtist: {},
    shouldInferVocalistByArtist: {},
    wasUpdatadedByArtist: {},
    tracksByArtist: {},
    tracksToSetStatusByArtist: {},
    tracksToSetDiscoveredByArtist: {},
    tracksToSetGenreByArtist: {}
  }

  const {allTracks} = state

  getPlaylist('Ambiguous Love').tracks().forEach(disambiguate)// #smart-playlist: Tracks whose love is not "loved," "disliked," nor "none."
  allTracks.whose({loved: true})().forEach(rate, {...state, isLoved: true})
  allTracks.whose({disliked: true})().forEach(rate, state)
  allTracks.whose({unplayed: false})().forEach(flag, state)
  getPlaylist('Uninitialized').tracks().forEach(initialize, state) // #smart-playlist: Tracks without an "Ungenred" tag.

  const commandsFolder = getPlaylist('1 Commands')
  executeAndRecurse.call(state, commandsFolder)
}
