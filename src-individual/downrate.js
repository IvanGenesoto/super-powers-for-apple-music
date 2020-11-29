const display = require('../src/dialog/display')
const app = require('../src/app')
// const disambiguate = require('../src/smart-playlists/disambiguate')
const selection = app.selection()

const downrate = track => {
  const rating = track.rating()
  const isBad = !rating || rating === 10 || rating === 20
  const rating_ = isBad ? 10 : rating - 20
  try {
    rating_ === rating || track.rating.set(rating_)
    track.loved.set(false)
    track.disliked.set(false)
    downratedCount++
  }
  catch (unused) { failedCount++ }
}

let downratedCount = 0
let failedCount = 0

selection.forEach(downrate)
// delay(20)
// selection.forEach(disambiguate)
display(`${downratedCount} downrated. ${failedCount} failed.`)
