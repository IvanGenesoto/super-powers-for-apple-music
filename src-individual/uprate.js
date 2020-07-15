const display = require('../src/dialogue/display')
const getPlaylist = require('../src/get/playlist')
const app = require('../src/app')
const selection = app.selection()

const uprate = track => {
  const data = track.properties()
  const {rating, databaseID: databaseId} = data
  const isFavorite = rating === 100
  const rating_ =
      isFavorite ? 100
    : rating === 10 ? 20
    : rating + 20
  try {
    rating_ === rating || track.rating.set(rating_)
    track.loved.set(false)
    isFavorite && addToFavorite(track, databaseId)
    upratedCount++
  }
  catch (unused) { failedCount++ }
}

const addToFavorite = (track, databaseId) => {
  const getFavorites = () => playlist && playlist.tracks()
  const getDatabaseIds = () => favorites && favorites.map(getDatabaseId)
  const getDatabaseId = track => track.databaseID()
  const playlist = getPlaylist('Favorite')
  const favorites = getFavorites()
  const databaseIds = getDatabaseIds()
  const isInPlaylist = databaseIds && databaseIds.includes(databaseId)
  isInPlaylist || track.duplicate({to: playlist})
}

let upratedCount = 0
let failedCount = 0

selection.forEach(uprate)
display(`${upratedCount} uprated. ${failedCount} failed.`)
