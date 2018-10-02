(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* global Application */
const app = Application('iTunes')
app.includeStandardAdditions = true
module.exports = app

},{}],2:[function(require,module,exports){
const app = require('../app')
module.exports = message => app.displayDialog(message)

},{"../app":1}],3:[function(require,module,exports){
const app = require('../app')
module.exports = playlistName => app.playlists[playlistName]

},{"../app":1}],4:[function(require,module,exports){

const temp = () => {
  const display = require('./dialogue/display')
  const getPlaylist = require('./get/playlist')
  // const getChildPlaylists = require('./get/child-playlists')
  const playlist = getPlaylist('Rock Pop Song')
  const tracks = playlist.tracks()
  // const children = getChildPlaylists(playlist)
  display(tracks.length)
}
temp()

},{"./dialogue/display":2,"./get/playlist":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAuanMiLCJkaWFsb2d1ZS9kaXNwbGF5LmpzIiwiZ2V0L3BsYXlsaXN0LmpzIiwidGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKiBnbG9iYWwgQXBwbGljYXRpb24gKi9cbmNvbnN0IGFwcCA9IEFwcGxpY2F0aW9uKCdpVHVuZXMnKVxuYXBwLmluY2x1ZGVTdGFuZGFyZEFkZGl0aW9ucyA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0gYXBwXG4iLCJjb25zdCBhcHAgPSByZXF1aXJlKCcuLi9hcHAnKVxubW9kdWxlLmV4cG9ydHMgPSBtZXNzYWdlID0+IGFwcC5kaXNwbGF5RGlhbG9nKG1lc3NhZ2UpXG4iLCJjb25zdCBhcHAgPSByZXF1aXJlKCcuLi9hcHAnKVxubW9kdWxlLmV4cG9ydHMgPSBwbGF5bGlzdE5hbWUgPT4gYXBwLnBsYXlsaXN0c1twbGF5bGlzdE5hbWVdXG4iLCJcbmNvbnN0IHRlbXAgPSAoKSA9PiB7XG4gIGNvbnN0IGRpc3BsYXkgPSByZXF1aXJlKCcuL2RpYWxvZ3VlL2Rpc3BsYXknKVxuICBjb25zdCBnZXRQbGF5bGlzdCA9IHJlcXVpcmUoJy4vZ2V0L3BsYXlsaXN0JylcbiAgLy8gY29uc3QgZ2V0Q2hpbGRQbGF5bGlzdHMgPSByZXF1aXJlKCcuL2dldC9jaGlsZC1wbGF5bGlzdHMnKVxuICBjb25zdCBwbGF5bGlzdCA9IGdldFBsYXlsaXN0KCdSb2NrIFBvcCBTb25nJylcbiAgY29uc3QgdHJhY2tzID0gcGxheWxpc3QudHJhY2tzKClcbiAgLy8gY29uc3QgY2hpbGRyZW4gPSBnZXRDaGlsZFBsYXlsaXN0cyhwbGF5bGlzdClcbiAgZGlzcGxheSh0cmFja3MubGVuZ3RoKVxufVxudGVtcCgpXG4iXX0=
