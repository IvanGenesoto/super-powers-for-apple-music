const display = require('./dialogue/display')
const app = require('./app')
const selection = app.selection()

const downrate = track => {
  const rating = track.rating()
  const newRating =
      rating === 0 ? 10
    : rating === 10 ? 10
    : rating === 20 ? 10
    : rating - 20
  try {
    track.rating.set(newRating)
    track.loved.set(false)
    track.disliked.set(false)
    downratedCount++
  }
  catch (unused) { failedCount++ }
}

let downratedCount = 0
let failedCount = 0

selection.forEach(downrate)
display(`${downratedCount} downrated. ${failedCount} failed.`)
