module.exports = function getArtistTracks(track) {

  const {tracksByArtist} = this

  const $artist = track.artist
  const name = $artist.name()
  const existingTracks = tracksByArtist[name]

  return existingTracks || (tracksByArtist[name] = $artist.tracks())
}
