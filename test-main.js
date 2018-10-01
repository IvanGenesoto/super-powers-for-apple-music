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
module.exports = folder => {
  const name = folder.name()
  const childPlaylists = []
  const allPlaylists = app.playlists()
  allPlaylists.forEach(playlist => {
    try { playlist.parent.name() === name && childPlaylists.push(playlist) }
    catch (unused) { }
  })
  return childPlaylists
}

},{"../app":1}],4:[function(require,module,exports){
const app = require('../app')
module.exports = playlistName => app.playlists[playlistName]

},{"../app":1}],5:[function(require,module,exports){

const temp = () => {
  const display = require('./dialogue/display')
  const getPlaylist = require('./get/playlist')
  const getChildPlaylists = require('./get/child-playlists')
  const folder = getPlaylist('Set Song Genre')
  const children = getChildPlaylists(folder)
  display(children.length)
}
temp()

},{"./dialogue/display":2,"./get/child-playlists":3,"./get/playlist":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAuanMiLCJkaWFsb2d1ZS9kaXNwbGF5LmpzIiwiZ2V0L2NoaWxkLXBsYXlsaXN0cy5qcyIsImdldC9wbGF5bGlzdC5qcyIsInRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKiBnbG9iYWwgQXBwbGljYXRpb24gKi9cbmNvbnN0IGFwcCA9IEFwcGxpY2F0aW9uKCdpVHVuZXMnKVxuYXBwLmluY2x1ZGVTdGFuZGFyZEFkZGl0aW9ucyA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0gYXBwXG4iLCJjb25zdCBhcHAgPSByZXF1aXJlKCcuLi9hcHAnKVxubW9kdWxlLmV4cG9ydHMgPSBtZXNzYWdlID0+IGFwcC5kaXNwbGF5RGlhbG9nKG1lc3NhZ2UpXG4iLCJjb25zdCBhcHAgPSByZXF1aXJlKCcuLi9hcHAnKVxubW9kdWxlLmV4cG9ydHMgPSBmb2xkZXIgPT4ge1xuICBjb25zdCBuYW1lID0gZm9sZGVyLm5hbWUoKVxuICBjb25zdCBjaGlsZFBsYXlsaXN0cyA9IFtdXG4gIGNvbnN0IGFsbFBsYXlsaXN0cyA9IGFwcC5wbGF5bGlzdHMoKVxuICBhbGxQbGF5bGlzdHMuZm9yRWFjaChwbGF5bGlzdCA9PiB7XG4gICAgdHJ5IHsgcGxheWxpc3QucGFyZW50Lm5hbWUoKSA9PT0gbmFtZSAmJiBjaGlsZFBsYXlsaXN0cy5wdXNoKHBsYXlsaXN0KSB9XG4gICAgY2F0Y2ggKHVudXNlZCkgeyB9XG4gIH0pXG4gIHJldHVybiBjaGlsZFBsYXlsaXN0c1xufVxuIiwiY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vYXBwJylcbm1vZHVsZS5leHBvcnRzID0gcGxheWxpc3ROYW1lID0+IGFwcC5wbGF5bGlzdHNbcGxheWxpc3ROYW1lXVxuIiwiXG5jb25zdCB0ZW1wID0gKCkgPT4ge1xuICBjb25zdCBkaXNwbGF5ID0gcmVxdWlyZSgnLi9kaWFsb2d1ZS9kaXNwbGF5JylcbiAgY29uc3QgZ2V0UGxheWxpc3QgPSByZXF1aXJlKCcuL2dldC9wbGF5bGlzdCcpXG4gIGNvbnN0IGdldENoaWxkUGxheWxpc3RzID0gcmVxdWlyZSgnLi9nZXQvY2hpbGQtcGxheWxpc3RzJylcbiAgY29uc3QgZm9sZGVyID0gZ2V0UGxheWxpc3QoJ1NldCBTb25nIEdlbnJlJylcbiAgY29uc3QgY2hpbGRyZW4gPSBnZXRDaGlsZFBsYXlsaXN0cyhmb2xkZXIpXG4gIGRpc3BsYXkoY2hpbGRyZW4ubGVuZ3RoKVxufVxudGVtcCgpXG4iXX0=
