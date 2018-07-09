module.exports = function process(shouldReRateAllArtists) {

  const getPlaylist = require('../get/playlist')
  const disambiguate = require('./disambiguate')
  const rate = require('./rate')
  const flag = require('./flag')
  const initialize = require('./initialize')
  const allTracks = getPlaylist('Library')

  const shouldRateByArtist = {}
  const shouldInferGenreByArtist = {}
  const shouldInferVocalistByArtist = {}
  const tracksByArtist = {}
  const tracksToSetStatusByArtist = {}
  const tracksToSetDiscoveredByArtist = {}
  const tracksToSetGenreByArtist = {}

  getPlaylist('Ambiguous Love').tracks().forEach(disambiguate)
  allTracks.whose({loved: true}).forEach(rate, {shouldRateByArtist, isLoved: true})
  allTracks.whose({disliked: true}).forEach(rate, {shouldRateByArtist})
  allTracks.whose({unplayed: true}).forEach(flag, shouldRateByArtist)
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
  // const playlists = app.playlists()
  // const childPlaylists = []
  // playlists.forEach(playlist => {
  //   let parent
  //   try { parent = playlist.parent() }
  //   catch (error) { }
  //   parent && parent.name() === 'Set Artist Genre' && childPlaylists.push(playlist)
  // })
  // app.displayDialog(childPlaylists.length)
}
