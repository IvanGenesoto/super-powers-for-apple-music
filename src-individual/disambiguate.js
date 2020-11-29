const display = require('../src/dialog/display')
const app = require('../src/app')
const selection = app.selection()

const disambiguate = track => {
  try {
    track.loved.set(false)
    track.disliked.set(false)
    disambiguatedCount++
  }
  catch (unused) { failedCount++ }
}

let disambiguatedCount = 0
let failedCount = 0

selection.forEach(disambiguate)
display(`${disambiguatedCount} disambiguated. ${failedCount} failed.`)
