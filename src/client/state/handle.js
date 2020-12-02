import {
  getFieldValue,
  getTagValue,
  deriveArtistAttribute,
  deriveArtistRating,
  adoptValues,
  setMonthsSinceUpdated,
} from '..'

export const handleState = state => {

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

  const updatableSongs = allSongs.filter(isSongUpdatable)
  const vocalArtists = shouldProcessAll ? allArtists : Object.keys(shouldDeriveVocalsByArtist)
  const genreArtists = shouldProcessAll ? allArtists : Object.keys(shouldDeriveGenreByArtist)
  const ratingArtists = shouldProcessAll ? allArtists : Object.keys(shouldDeriveRatingByArtist)
  const vocalThis = {state, artistLabel: 'Artist Vocals', songLabel: 'Song Vocals'}
  const genreThis = {state, artistLabel: 'Artist Genre', songLabel: 'Song Genre'}
  const this_ = {state}

  const adoptionArtistEntries =
      shouldProcessAll ? allArtists.map(artist => [artist])
    : Object.entries(songsToAdoptValuesByArtist)

  vocalArtists.forEach(deriveArtistAttribute, vocalThis)
  genreArtists.forEach(deriveArtistAttribute, genreThis)
  ratingArtists.forEach(deriveArtistRating, this_)
  adoptionArtistEntries.forEach(adoptValues, this_)
  updatableSongs.forEach(setMonthsSinceUpdated, this_)
}
