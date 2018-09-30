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
module.exports = parentPlaylistName => {
  const childPlaylists = []
  const allPlaylists = app.playlists()
  allPlaylists.forEach(playlist => {
    try { playlist.parent.name() === parentPlaylistName && childPlaylists.push(playlist) }
    catch (unused) { }
  })
  return childPlaylists
}

},{"../app":1}],4:[function(require,module,exports){

const temp = () => {
  const display = require('./dialogue/display')
  const getChildPlaylists = require('./get/child-playlists')
  const childPlaylists = getChildPlaylists('Set Artist Genre')
  display(childPlaylists.length)
}
temp()

},{"./dialogue/display":2,"./get/child-playlists":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAuanMiLCJkaWFsb2d1ZS9kaXNwbGF5LmpzIiwiZ2V0L2NoaWxkLXBsYXlsaXN0cy5qcyIsInRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qIGdsb2JhbCBBcHBsaWNhdGlvbiAqL1xuY29uc3QgYXBwID0gQXBwbGljYXRpb24oJ2lUdW5lcycpXG5hcHAuaW5jbHVkZVN0YW5kYXJkQWRkaXRpb25zID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSBhcHBcbiIsImNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uL2FwcCcpXG5tb2R1bGUuZXhwb3J0cyA9IG1lc3NhZ2UgPT4gYXBwLmRpc3BsYXlEaWFsb2cobWVzc2FnZSlcbiIsImNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uL2FwcCcpXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudFBsYXlsaXN0TmFtZSA9PiB7XG4gIGNvbnN0IGNoaWxkUGxheWxpc3RzID0gW11cbiAgY29uc3QgYWxsUGxheWxpc3RzID0gYXBwLnBsYXlsaXN0cygpXG4gIGFsbFBsYXlsaXN0cy5mb3JFYWNoKHBsYXlsaXN0ID0+IHtcbiAgICB0cnkgeyBwbGF5bGlzdC5wYXJlbnQubmFtZSgpID09PSBwYXJlbnRQbGF5bGlzdE5hbWUgJiYgY2hpbGRQbGF5bGlzdHMucHVzaChwbGF5bGlzdCkgfVxuICAgIGNhdGNoICh1bnVzZWQpIHsgfVxuICB9KVxuICByZXR1cm4gY2hpbGRQbGF5bGlzdHNcbn1cbiIsIlxuY29uc3QgdGVtcCA9ICgpID0+IHtcbiAgY29uc3QgZGlzcGxheSA9IHJlcXVpcmUoJy4vZGlhbG9ndWUvZGlzcGxheScpXG4gIGNvbnN0IGdldENoaWxkUGxheWxpc3RzID0gcmVxdWlyZSgnLi9nZXQvY2hpbGQtcGxheWxpc3RzJylcbiAgY29uc3QgY2hpbGRQbGF5bGlzdHMgPSBnZXRDaGlsZFBsYXlsaXN0cygnU2V0IEFydGlzdCBHZW5yZScpXG4gIGRpc3BsYXkoY2hpbGRQbGF5bGlzdHMubGVuZ3RoKVxufVxudGVtcCgpXG4iXX0=
