module.exports = function createState() {

  const app = require('../app')

  return {
    shouldDeriveDiscoveredAtByArtist: {},
    shouldDeriveRatingByArtist: {},
    shouldDeriveStatusByArtist: {}, // #refactor: May be superflous as "rateArtist" function may also set status.
    shouldDeriveHasVocalistByArtist: {},
    shouldDeriveGenreByArtist: {},
    didSetDiscoveredAtByArtist: {},
    didSetRatingByArtist: {},
    didSetStatusByArtist: {},
    didSetHasVocalistByArtist: {},
    didSetGenreByArtist: {},
    parentNameByPlaylistName: {},
    tracksToAdoptStatsByArtist: {}, // #note: Process checks for coresponding property on "didSetStatusByArtist" and if present, does not run status adoption function, otherwise, tracks adopt first status found in artist, first genre found in artist, etc.
    tracksByArtist: {},
    playlists: app.playlists()
  }
}
