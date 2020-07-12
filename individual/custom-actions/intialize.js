const app = require('../../app')
const {displayAlert, displayDialog} = app
const selecteds = app.selection()
const {length: selectedCount} = selecteds

const alter = track => {
  try {
    const data = track.properties()
    const {genre, composer} = data
    const composerText = composer ? `Composer: ${composer}` : ''
    const delimiter = composer ? ', ' : ''
    track.composer.set(`${composerText}${delimiter}Genre: ${genre}`)
    track.genre.set('None')
    trackCount++
  }
  catch (unused) { failedCount++ }
}

const report = () => {
  const s = trackCount === 1 ? '' : 's'
  const were = trackCount === 1 ? 'was' : 'were'
  displayDialog(`${trackCount} track${s} ${were} altered. ${failedCount} failed.`, {
    buttons: ['OK'],
    defaultButton: 'OK',
    withIcon: 1
  })
}

let trackCount = 0
let failedCount = 0

selectedCount && selecteds.forEach(alter)
selectedCount && report()

selectedCount || displayAlert('No tracks selected.', {
  buttons: ['OK'],
  defaultButton: 'OK',
  as: 'critical'
})
