import {
  getPlaylist,
  /// deleteFromLibrary,
  disambiguate,
  handleLove,
  initialize,
} from '..'

export function handleSmartPlaylists() {

  const {state} = this
  const {allSongs} = state
  const this_ = {...this, isDisliked: true}

  /// getPlaylist('Added Post-Rejection').tracks().forEach(deleteFromLibrary, this) // #smart-playlist: Tracks whose Artist Status is "Rejected" or "Dismissed", yet does not have an "Original Genre" tag, nor a rating or love. // #fix: Pass tracks() to Array.from().
  getPlaylist('Ambiguous Love').tracks().forEach(disambiguate) // #smart-playlist: Tracks whose love is not "loved," "disliked," nor "none."
  allSongs.map(({loved}) => loved).forEach(handleLove, this)
  allSongs.map(({disliked}) => disliked).forEach(handleLove, this_)
  allSongs.map(({episodeNumber}) => !episodeNumber).forEach(initialize, this)
}
