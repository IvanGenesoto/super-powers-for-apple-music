import {
  _getPlaylist,
  deriveArtistAttribute,
  deriveArtistRating,
  adoptValues,
  setMonthsSinceUpdated,
} from '..'

export function handleState() {

  const {state} = this

  const {
    shouldDeriveVocalsByArtist,
    shouldDeriveGenreByArtist,
    shouldDeriveRatingByArtist,
    tracksToAdoptValuesByArtist,
    shouldProcessAll,
    artists,
  } = state

  const vocalArtists = shouldProcessAll ? artists : Object.keys(shouldDeriveVocalsByArtist)
  const genreArtists = shouldProcessAll ? artists : Object.keys(shouldDeriveGenreByArtist)
  const ratingArtists = shouldProcessAll ? artists : Object.keys(shouldDeriveRatingByArtist)

  const adoptionArtistEntries =
      shouldProcessAll ? artists.map(artist => [artist])
    : Object.entries(tracksToAdoptValuesByArtist)

  vocalArtists.forEach(deriveArtistAttribute, {
    ...this, artistLabel: 'Artist Vocals', songLabel: 'Song Vocals',
  })

  genreArtists.forEach(deriveArtistAttribute, {
    ...this, artistLabel: 'Artist Genre', songLabel: 'Song Genre',
  })

  ratingArtists.forEach(deriveArtistRating, this)
  adoptionArtistEntries.forEach(adoptValues, this)
  _getPlaylist('Updatable Artists').tracks().forEach(setMonthsSinceUpdated, this) // #smart-playlist: Proxy tracks of artists with a status other than rejected, dismissed or retired.
}
