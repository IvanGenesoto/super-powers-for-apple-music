const getPlaylist = require('../get/playlist')
const deriveArtistAttribute = require('./derive-artist-attribute')
const deriveArtistRating = require('./derive-artist-rating')
const adoptValues = require('./adopt-values')
const setMonthsSinceUpdated = require('./set-months-since-updated')

module.exports = function handleState() {

  const {state} = this

  const {
    shouldDeriveVocalsByArtist,
    shouldDeriveGenreByArtist,
    shouldDeriveRatingByArtist,
    tracksToAdoptValuesByArtist,
    shouldProcessAll,
    artists
  } = state

  const vocalArtists = shouldProcessAll ? artists : Object.keys(shouldDeriveVocalsByArtist)
  const genreArtists = shouldProcessAll ? artists : Object.keys(shouldDeriveGenreByArtist)
  const ratingArtists = shouldProcessAll ? artists : Object.keys(shouldDeriveRatingByArtist)

  const adoptionArtistEntries = shouldProcessAll
    ? artists.map(artist => [artist])
    : Object.entries(tracksToAdoptValuesByArtist)

  vocalArtists.forEach(deriveArtistAttribute, {
    ...this, artistLabel: 'Artist Vocals', songLabel: 'Song Vocals'
  })

  genreArtists.forEach(deriveArtistAttribute, {
    ...this, artistLabel: 'Artist Genre', songLabel: 'Song Genre'
  })

  ratingArtists.forEach(deriveArtistRating, this)
  adoptionArtistEntries.forEach(adoptValues, this)
  getPlaylist('Updatable Artists').tracks().forEach(setMonthsSinceUpdated, this) // #smartPlaylist: Proxy tracks of artists with a status other than rejected, dismissed or retired.
}
