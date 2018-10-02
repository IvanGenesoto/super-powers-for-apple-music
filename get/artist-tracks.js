module.exports = function getArtistTracks(track, artistName) {

  const {tracksByArtist} = this

  if (artistName) {
    const tracks = tracksByArtist[artistName]
    if (tracks) return tracks
  }

  const $artist = track.artist
  const name = artistName || $artist.name()
  const tracks = tracksByArtist[name]

  return tracks || (tracksByArtist[name] = $artist.tracks())
}
