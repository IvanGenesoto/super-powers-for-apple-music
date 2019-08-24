const getPlaylist = require('./get/playlist')
const playlist = getPlaylist('test')

playlist.description.set('Test\u000aDescription\u000aWith\u000aLine\u000aBreaks')
