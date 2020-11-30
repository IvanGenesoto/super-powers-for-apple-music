export const getArtistSongs = (artist_, state) => {

  const {songsByArtist, allSongs} = state
  const songs_ = songsByArtist[artist_]
  const doesArtistMatch = ({artist}) => artist === artist_
  const songs = songsByArtist[artist_] = songs_ || allSongs.filter(doesArtistMatch)

  return songs
}
