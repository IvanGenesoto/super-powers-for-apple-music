const display = require('./dialogue/display')
const getPlaylist = require('./get/playlist')
const playlist = getPlaylist('test')
const tracks = playlist.tracks()

display(tracks.length)
