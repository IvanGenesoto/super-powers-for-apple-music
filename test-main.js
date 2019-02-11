(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* global Application */
const app = Application('iTunes')

app.includeStandardAdditions = true
app.fixedIndexing = true
module.exports = app

},{}],2:[function(require,module,exports){
const app = require('../app')

module.exports = message => app.displayDialog(message)

},{"../app":1}],3:[function(require,module,exports){
const app = require('../app')

module.exports = playlistName => app.playlists[playlistName]

},{"../app":1}],4:[function(require,module,exports){
const display = require('./dialogue/display')
// const app = require('./app')
const getPlaylist = require('./get/playlist')
// const selection = app.selection()
// const [track] = selection
// const _allTracks = getPlaylist('Library').tracks
const playlist = getPlaylist('nested test')
// const tracksByArtist = _allTracks.whose({artist: 'Shelf Life'})()
const {parent} = playlist.properties()
// const {length} = tracksByArtist
// const played = _allTracks.whose({unplayed: false})()
// const {length} = played
// track.loved.set(true)
// delay(10)
// const unplayed = track.unplayed()
// track.unplayed.set(true)
// display(`${unplayed}`)
display(!!parent)

},{"./dialogue/display":2,"./get/playlist":3}]},{},[4])
