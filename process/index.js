module.exports = function process(isTest) {

  const createState = require('./single-use/create-state')
  const getPlaylist = require('../get/playlist')
  const getArtistTracks = require('../get/artist-tracks')
  const disambiguate = require('./single-use/disambiguate')
  const handleLoved = require('./multi-use/handle-loved')
  const initialize = require('./single-use/initialize')
  const executeAndRecurse = require('./multi-use/execute-and-recurse')
  const specializeKit = require('./single-use/specialize-kit')
  const createCommandKitByName = require('../single-use/create-command-kit-by-name')
  const setUnplayed = require('./single-use/set-unplayed')
  const state = createState()
  const this_ = {state}
  const playlistName = isTest ? 'test' : 'Library'
  const _allTracks = state._allTracks = getPlaylist(playlistName).tracks

  state.getArtistTracks = getArtistTracks.bind(this_)
  state.commandKitByName = createCommandKitByName.call(this_)
  state.folderCommandKitByName = specializeKit.call(this_)
  state.playlistCommandKitByName = specializeKit.call(this_, true)

  getPlaylist('Ambiguous Love').tracks().forEach(disambiguate)// #smart-playlist: Tracks whose love is not "loved," "disliked," nor "none."
  _allTracks.whose({loved: true})().forEach(handleLoved, this_)
  _allTracks.whose({disliked: true})().forEach(handleLoved, {...this_, isDisliked: true})
  getPlaylist('Uninitialized').tracks().forEach(initialize, this_) // #smart-playlist: Tracks without an "Original" tag.

  const commandsFolder = getPlaylist('1 Commands') // #feature: User can set name of commands folder in "Preferences" playlist.
  executeAndRecurse.call(this_, commandsFolder)
}
