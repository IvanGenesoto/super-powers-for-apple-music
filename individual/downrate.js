const display = require('../dialogue/display')
const app = require('../app')
const selection = app.selection()

const downrate = track => {
  const rating = track.rating()
  const shouldNotSet = rating === 20
  const isBad = !rating || rating === 10 || rating === 20
  const newRating = !rating || rating === 10 ? 20 : rating - 20
  try {
    shouldNotSet || track.rating.set(newRating)
    isBad || track.loved.set(false)
    downratedCount++
  }
  catch (unused) { failedCount++ }
}

let downratedCount = 0
let failedCount = 0

selection.forEach(downrate)
display(`${downratedCount} downrated. ${failedCount} failed.`)
