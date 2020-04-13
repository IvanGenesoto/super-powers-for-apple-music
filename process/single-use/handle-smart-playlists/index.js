module.exports = function handleSmartPlaylists() {

  const getPlaylist = require('../../../get/playlist')
  const deleteFromLibrary = require('./delete-from-library')
  const disambiguate = require('./disambiguate')
  const handleLove = require('./handle-love')
  const initialize = require('./initialize')

  getPlaylist('Added Post-Rejection').tracks().forEach(deleteFromLibrary, this) // #smartPlaylist: Tracks whose artist's status is "Rejected" or "Dismissed", yet does not have an "Original Genre" tag, nor a rating or love.
  getPlaylist('Ambiguous Love').tracks().forEach(disambiguate) // #smartPlaylist: Tracks whose love is not "loved," "disliked," nor "none."
  // _allTracks.whose({loved: true})().forEach(handleLove, this)
  // _allTracks.whose({disliked: true})().forEach(handleLove, {...this, isDisliked: true})
  getPlaylist('Uprate').tracks().forEach(handleLove, this)
  getPlaylist('Downrate').tracks().forEach(handleLove, {...this, isDisliked: true})
  getPlaylist('Uninitialized').tracks().forEach(initialize, this) // #smartPlaylist: Tracks without an "Original Genre" tag.
}
