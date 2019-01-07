module.exports = function getArtistTracks(track, artistName) {

  const {state} = this
  const {tracksByArtist} = state

  if (artistName) {
    const tracks = tracksByArtist[artistName]
    if (tracks) return tracks
  }

  const _artist = track.artist
  const name = artistName || _artist.name()
  const tracks = tracksByArtist[name]

  return tracks || (tracksByArtist[name] = _artist.tracks())
}
