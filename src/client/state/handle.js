import {
  getFieldValue,
  getTagValue,
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
    songsToAdoptValuesByArtist,
    shouldProcessAll,
    allArtists,
    allSongs,
  } = state

  const isSongUpdatable = song => {
    const isProxy = getTagValue(song, 'Proxy')
    const status = getFieldValue(song, 'Artist Status')
    const statuses = ['Rejected', 'Dismissed', 'Retired']
    return isProxy && !statuses.includes(status)
  }

  const vocalArtists = shouldProcessAll ? allArtists : Object.keys(shouldDeriveVocalsByArtist)
  const genreArtists = shouldProcessAll ? allArtists : Object.keys(shouldDeriveGenreByArtist)
  const ratingArtists = shouldProcessAll ? allArtists : Object.keys(shouldDeriveRatingByArtist)
  const vocalThis = {...this, artistLabel: 'Artist Vocals', songLabel: 'Song Vocals'}
  const genreThis = {...this, artistLabel: 'Artist Genre', songLabel: 'Song Genre'}
  const updatableSongs = allSongs.filter(isSongUpdatable)

  const adoptionArtistEntries =
      shouldProcessAll ? allArtists.map(artist => [artist])
    : Object.entries(songsToAdoptValuesByArtist)

  vocalArtists.forEach(deriveArtistAttribute, vocalThis)
  genreArtists.forEach(deriveArtistAttribute, genreThis)
  ratingArtists.forEach(deriveArtistRating, this)
  adoptionArtistEntries.forEach(adoptValues, this)
  updatableSongs.forEach(setMonthsSinceUpdated, this)
}
