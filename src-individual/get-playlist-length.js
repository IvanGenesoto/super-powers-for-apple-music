const display = require('../src/dialog/display')
const getPlaylist = require('../src/get/playlist')
const playlist = getPlaylist('test')
const tracks = playlist.tracks()

display(tracks.length)
