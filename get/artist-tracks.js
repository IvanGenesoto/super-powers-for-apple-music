module.exports = function getArtistTracks(artist) {

  const {state} = this // #note: This is bound when getArtistsTracks is appended to state.
  const {tracksByArtist, _allTracks} = state
  const tracks = tracksByArtist[artist]

  if (!artist) return []

  return tracks || (tracksByArtist[artist] = _allTracks.whose({artist})())
}
