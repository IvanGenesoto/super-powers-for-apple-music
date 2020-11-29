import {
  _getPlaylist,
  deleteFromLibrary,
  disambiguate,
  handleLove,
  initialize,
} from '..'

export function handleSmartPlaylists() {

  const {_allTracks} = this
  const this_ = {...this, isDisliked: true}

  _getPlaylist('Added Post-Rejection').tracks().forEach(deleteFromLibrary, this) // #smart-playlist: Tracks whose Artist Status is "Rejected" or "Dismissed", yet does not have an "Original Genre" tag, nor a rating or love.
  _getPlaylist('Ambiguous Love').tracks().forEach(disambiguate) // #smart-playlist: Tracks whose love is not "loved," "disliked," nor "none."
  _allTracks.whose({loved: true})().forEach(handleLove, this)
  _allTracks.whose({disliked: true})().forEach(handleLove, this_)
  /// _getPlaylist('Uprate').tracks().forEach(handleLove, this)
  /// _getPlaylist('Downrate').tracks().forEach(handleLove, {...this, isDisliked: true})
  _getPlaylist('Uninitialized').tracks().forEach(initialize, this) // #smart-playlist: Tracks without an "Original Genre" tag.
}
