const display = require('../dialogue/display')
// const getPlaylist = require('../get/playlist')
const app = require('../app')
const selection = app.selection()
// const playlist = getPlaylist('Favorite')
// const getFavorites = () => playlist && playlist.tracks()
// const getDatabaseIds = () => favorites && favorites.map(getDatabaseId)
// const getDatabaseId = track => track.databaseID()

const uprate = track => {
  // const data = track.properties()
  // const {databaseID: databaseId, rating} = data
  // const shouldCheckFavorite = rating === 100
  // shouldCheckFavorite && (favorites = favorites || getFavorites())
  // shouldCheckFavorite && (databaseIds = databaseIds || getDatabaseIds())
  // const isFavorite = shouldCheckFavorite && databaseIds && databaseIds.includes(databaseId)
  const rating = track.rating()
  const isFavorite = rating === 100
  const newRating = rating === 10 ? 20 : rating + 20
  try {
    isFavorite || track.rating.set(newRating)
    isFavorite || track.loved.set(false)
    // shouldCheckFavorite && !isFavorite && playlist && track.duplicate({to: playlist})
    upratedCount++
  }
  catch (unused) { failedCount++ }
}

let upratedCount = 0
let failedCount = 0
// let favorites
// let databaseIds

selection.forEach(uprate)
display(`${upratedCount} uprated. ${failedCount} failed.`)
