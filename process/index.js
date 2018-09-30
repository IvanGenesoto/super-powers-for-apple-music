module.exports = function process(shouldReRateAllArtists) {

  const getPlaylist = require('../get/playlist')
  const disambiguate = require('./single-use/disambiguate')
  const rate = require('./rate')
  const flag = require('./single-use/flag')
  const initialize = require('./single-use/initialize')
  const allTracks = getPlaylist('Library').tracks

  const shouldRateByArtist = {}
  const shouldInferGenreByArtist = {}
  const shouldInferVocalistByArtist = {}
  const tracksByArtist = {}
  const tracksToSetStatusByArtist = {}
  const tracksToSetDiscoveredByArtist = {}
  const tracksToSetGenreByArtist = {}

  getPlaylist('Ambiguous Love').tracks().forEach(disambiguate)
  allTracks.whose({loved: true})().forEach(rate, {shouldRateByArtist, isLoved: true})
  allTracks.whose({disliked: true})().forEach(rate, {shouldRateByArtist})
  allTracks.whose({unplayed: false})().forEach(flag, shouldRateByArtist)
  getPlaylist('Uninitialized').tracks().forEach(initialize, {
    shouldRateByArtist,
    tracksToSetGenreByArtist,
    tracksToSetStatusByArtist,
    tracksToSetDiscoveredByArtist
  })

  // loopThroughChildPlaylists('1 Commands')

  // const disableSongPlaylist = getPlaylist('Disable Song')
  // const tracks = playlist.tracks()
  // if (!tracks.length) return
  const playlists = app.playlists()
  const childPlaylists = []
  playlists.forEach(playlist => {
    let parent
    try { parent = playlist.parent() }
    catch (error) { }
    parent && parent.name() === 'Set Artist Genre' && childPlaylists.push(playlist)
  })
  display(childPlaylists.length)
}
