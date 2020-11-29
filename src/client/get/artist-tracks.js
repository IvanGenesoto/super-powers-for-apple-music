export function getArtistTracks(artist) {

  const {state} = this // #note: "this" is bound when getArtistsTracks is appended to state.
  const {tracksByArtist, _allTracks} = state
  const tracks_ = tracksByArtist[artist]
  const tracks = tracksByArtist[artist] = tracks_ || _allTracks.whose({artist})()

  return artist ? tracks : []
}