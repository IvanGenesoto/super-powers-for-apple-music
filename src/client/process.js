import {
  createState,
  handleSmartPlaylists,
  executeCommands,
  handleState,
  _getChildPlaylists,
  /// processPlayed, // #implement: Adds an artist-named property to shouldDeriveRatingByArtist for all tracks whose "unplayed" is false.
  /// setUnplayed, // #implement: After process runs, delays for a minute before setting all tracks' "unplayed" property to true.
} from '.'

export function process(shouldProcessAll, isTest) {

  const state = createState(shouldProcessAll, isTest)
  const this_ = {state}
  const _childPlaylists = _getChildPlaylists('1. Set') // #implement: User can set name of commands folder in "Preferences" playlist's description.

  isTest || handleSmartPlaylists.call(this_)
  /// shouldProcessPlayed && processPlayed()
  isTest || _childPlaylists.forEach(executeCommands, this_)
  handleState.call(this_)

  /// if (!shouldProcessPlayed) return

  /// delay(60) /// #note: Add "/* global delay */" to the top of the file.
  /// setUnplayed()
}
