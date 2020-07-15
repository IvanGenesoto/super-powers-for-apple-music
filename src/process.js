module.exports = function process(shouldProcessAll, isTest) {

  // const processPlayed = require('./played') // #implement: Adds an artist-named property to shouldDeriveRatingByArtist for all tracks whose "unplayed" is false.
  // const setUnplayed = require('./single-use/set-unplayed') // #implement: After process runs, delays for a minute before setting all tracks' "unplayed" property to true.
  const createState = require('./state/create')
  const getPlaylist = require('./get/playlist')
  const handleSmartPlaylists = require('./smart-playlists/handle')
  const executeCommands = require('./execute/commands')
  const handleState = require('./state/handle')
  const commandsFolder = getPlaylist('1 Set') // #implement: User can set name of commands folder in "Preferences" playlist's description.
  const state = createState(shouldProcessAll, isTest)
  const this_ = {state}

  isTest || handleSmartPlaylists.call(this_)
  // shouldProcessPlayed && processPlayed()
  isTest || executeCommands.call(this_, commandsFolder)
  handleState.call(this_)

  // if (!shouldProcessPlayed) return

  // delay(60) // #note: Add "/* global delay */" to the top of the file.
  // setUnplayed()
}
