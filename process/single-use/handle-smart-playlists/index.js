module.exports = function handleSmartPlaylists() {

  const getPlaylist = require('../../../get/playlist')
  const disambiguate = require('./disambiguate')
  const handleLoved = require('./handle-loved')
  const initialize = require('./initialize')
  const {state} = this
  const {_allTracks} = state

  getPlaylist('Ambiguous Love').tracks().forEach(disambiguate)// #smart-playlist: Tracks whose love is not "loved," "disliked," nor "none."
  _allTracks.whose({loved: true})().forEach(handleLoved, this)
  _allTracks.whose({disliked: true})().forEach(handleLoved, {...this, isDisliked: true})
  getPlaylist('Uninitialized').tracks().forEach(initialize, this) // #smart-playlist: Tracks without an "Original" tag.
}
