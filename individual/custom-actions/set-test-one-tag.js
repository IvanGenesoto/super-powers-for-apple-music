const app = require('../../app')
const createState = require('../../process/single-use/create-state')
const {displayAlert, displayDialog} = app
const state = createState()
const {getArtistTracks, tracksByArtist} = state
const selecteds = app.selection()
const {length: selectedCount} = selecteds
const shouldPrefix = true
const tagField = 'grouping'
const label = 'Status'
const value = 'Rejected'

const processTracks = () => {
  selecteds.forEach(appendArtistTracks)
  Object
    .values(tracksByArtist)
    .forEach(tracks => tracks.forEach(setStatus))
  report()
}

const appendArtistTracks = track => {
  const artist = track.artist()
  getArtistTracks(artist)
}

const setStatus = track => {
  try {
    const fieldText = track[tagField]()
    const index = fieldText.indexOf(label + ':')
    if (index === -1) return failedCount++
    const index_ = fieldText.indexOf(label + ': ' + value)
    if (index_ + 1) return skippedCount++
    const delimiter = fieldText ? ', ' : ''
    const tempLabel = 'Test'
    const tempValue = 'One'
    const newFieldText = shouldPrefix
      ? `${tempLabel}: ${tempValue}${delimiter}${fieldText}`
      : `${fieldText}${delimiter}${tempLabel}: ${tempValue}`
    track[tagField].set(newFieldText)
    alteredCount++
  }
  catch (unused) { failedCount++ }
}

const report = () => {
  const s = alteredCount === 1 ? '' : 's'
  const were = alteredCount === 1 ? 'was' : 'were'
  displayDialog(`${alteredCount} track${s} ${were} altered. ${skippedCount} skipped. ${failedCount} failed.`, {
    buttons: ['OK'],
    defaultButton: 'OK',
    withIcon: 1
  })
}

let alteredCount = 0
let skippedCount = 0
let failedCount = 0

selectedCount && processTracks()

selectedCount || displayAlert('No tracks selected.', {
  buttons: ['OK'],
  defaultButton: 'OK',
  as: 'critical'
})
