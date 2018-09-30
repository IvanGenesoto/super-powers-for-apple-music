const getChildPlaylists = require('../get/child-playlists')
const tag = require('./multi-use/tag')

module.exports = function processPlaylistFolder(args) {
  const {folderName} = args
  const playlists = getChildPlaylists(folderName)
  playlists.forEach(processTracks, args)
}

function processTracks(playlist) {
  const {label, antiLabel, enabled} = this
  const value = playlist.name()
  const tracks = playlist.tracks()
  tracks.forEach(track => tag(track, tagKit, value))
}
