/// import {getPlaylist, disambiguate, handleLove, initialize, deleteFromLibrary} from '..'
import {getPlaylist, disambiguate, handleLove, initialize} from '..'

export const handleSmartPlaylists = state => {

  const {allSongs} = state
  const this_ = {state}
  const this__ = {...this, isDisliked: true}

  /// getPlaylist('Added Post-Rejection').tracks().forEach(deleteFromLibrary, this) // #smart-playlist: Tracks whose Artist Status is "Rejected" or "Dismissed", yet does not have an "Original Genre" tag, nor a rating or love. // #fix: Pass tracks() to Array.from().
  getPlaylist('Ambiguous Love').tracks().forEach(disambiguate) // #smart-playlist: Tracks whose love is not "loved," "disliked," nor "none."
  allSongs.map(({loved}) => loved).forEach(handleLove, this_)
  allSongs.map(({disliked}) => disliked).forEach(handleLove, this__)
  allSongs.map(({episodeNumber}) => !episodeNumber).forEach(initialize, this_)
}
