const display = require('../dialogue/display')
const app = require('../app')
const selection = app.selection()

const downrate = track => {
  const rating = track.rating()
  const isBad = !rating || rating === 10 || rating === 20
  const rating_ = isBad ? 10 : rating - 20
  try {
    rating_ === rating || track.rating.set(rating_)
    track.loved.set(false)
    downratedCount++
  }
  catch (unused) { failedCount++ }
}

let downratedCount = 0
let failedCount = 0

selection.forEach(downrate)
display(`${downratedCount} downrated. ${failedCount} failed.`)
