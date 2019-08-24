module.exports = function getArtistTracks(artist) {

  const {state} = this
  const {tracksByArtist, _allTracks} = state
  const existingTracks = tracksByArtist[artist]

  return existingTracks || (tracksByArtist[name] = _allTracks.whose({artist})())
}
