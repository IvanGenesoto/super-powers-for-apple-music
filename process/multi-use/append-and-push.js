module.exports = function appendAndPush(tracksByArtist, artist, track) {

  const existingTracks = tracksByArtist[artist]
  const tracks = existingTracks || (tracksByArtist[artist] = [])
  tracks.push(track)
}
