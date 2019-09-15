module.exports = function getArtistTracks(artist) {

  const {state} = this // #note: This is bound when getArtistsTracks is appended to state.
  const {tracksByArtist, _allTracks} = state
  const existingTracks = tracksByArtist[artist]

  return existingTracks || (tracksByArtist[name] = _allTracks.whose({artist})())
}
