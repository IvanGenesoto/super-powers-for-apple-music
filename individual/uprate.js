
const uprate = () => {
  const display = require('./dialogue/display')
  const app = require('./app')
  const selection = app.selection()
  const uprate = track => {
    const rating = track.rating()
    const newRating =
        rating === 100 ? 100
      : rating === 10 ? 20
      : rating + 20
    try {
      track.rating.set(newRating)
      track.loved.set(false)
      track.disliked.set(false)
      upratedCount++
    }
    catch (unused) { failedCount++ }
  }
  let upratedCount = 0
  let failedCount = 0
  selection.forEach(uprate)
  display(`${upratedCount} uprated. ${failedCount} failed.`)
}
uprate()
