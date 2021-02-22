const app = require('../src/app')
const display = require('../src/dialog/display')
const selection = app.selection()

const uprate = track => {
  const rating = track.rating()
  const isFavorite = rating === 100
  const rating_ =
      isFavorite ? 100
    : rating === 10 ? 20
    : rating + 20
  try {
    rating_ === rating || track.rating.set(rating_)
    track.loved.set(false)
    track.disliked.set(false)
    // isFavorite && addToFavorite(track, databaseId)
    upratedCount++
  }
  catch (unused) { failedCount++ }
}

// const falsifyLoved = track => {
//   try { track.loved.set(false) }
//   catch (unused) { }
// }

// const falsifyDisliked = track => {
//   try { track.disliked.set(false) }
//   catch (unused) { }
// }

// const addToFavorite = (track, databaseId) => {
//   const getFavorites = () => playlist && playlist.tracks()
//   const getDatabaseIds = () => favorites && favorites.map(getDatabaseId)
//   const getDatabaseId = track => track.databaseID()
//   const playlist = getPlaylist('Favorite')
//   const favorites = getFavorites()
//   const databaseIds = getDatabaseIds()
//   const isInPlaylist = databaseIds && databaseIds.includes(databaseId)
//   isInPlaylist || track.duplicate({to: playlist})
// }

let upratedCount = 0
let failedCount = 0

selection.forEach(uprate)
// delay(15)
// selection.forEach(falsifyLoved)
// delay(15)
// selection.forEach(falsifyDisliked)
display(`${upratedCount} uprated. ${failedCount} failed.`)
