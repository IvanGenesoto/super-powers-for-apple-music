module.exports = function process(isTest) {

  const createState = require('./single-use/create-state')
  const getPlaylist = require('../get/playlist')
  const handleSmartPlaylists = require('./single-use/handle-smart-playlists')
  const executeAndRecurse = require('./multi-use/execute-and-recurse')
  const handleState = require('./single-use/handle-state')
  const setUnplayed = require('./single-use/set-unplayed')
  const commandsFolder = getPlaylist('1 Commands') // #feature: User can set name of commands folder in "Preferences" playlist.
  const state = createState(isTest)
  const this_ = {state}

  handleSmartPlaylists.call(this_)
  executeAndRecurse.call(this_, commandsFolder)
  handleState.call(this_)
}
