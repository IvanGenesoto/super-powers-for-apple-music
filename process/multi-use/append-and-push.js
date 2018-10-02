module.exports = function appendAndPush(tracksByArtist, artistName, track) {

  const existingTracks = tracksByArtist[artistName]
  const tracks = existingTracks || (tracksByArtist[artistName] = [])
  track && tracks.push(track)
}
