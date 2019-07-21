module.exports = function process(isTest) {

  const createState = require('./single-use/create-state')
  const getPlaylist = require('../get/playlist')
  // const getShouldProcessPlayed = require('../get/should-process-played') // #implement: User can set if they want to process all played or changed tracks via the "Preferences" playlist's description.
  // const processPlayed = require('./played') // #implement: Adds an artist-named property to shouldDeriveRatingByArtist for all tracks whose "unplayed" is false.
  const handleSmartPlaylists = require('./single-use/handle-smart-playlists')
  const executeAndRecurse = require('./multi-use/execute-and-recurse')
  const handleState = require('./single-use/handle-state')
  // const setUnplayed = require('./single-use/set-unplayed')
  const commandsFolder = getPlaylist('1 Commands') // #implement: User can set name of commands folder in "Preferences" playlist's description.
  const state = createState(isTest)
  const this_ = {state}
  // const shouldProcessPlayed = getShouldProcessPlayed()

  handleSmartPlaylists.call(this_)
  // shouldProcessPlayed && processPlayed()
  executeAndRecurse.call(this_, commandsFolder)
  handleState.call(this_)

  // if (!shouldProcessPlayed) return

  // delay(60) /* global delay */
  // setUnplayed()
}
