const app = require('../../app')
const {displayAlert, displayDialog} = app
const selecteds = app.selection()
const {length: selectedCount} = selecteds
const shouldPrefix = true
const labelField = 'grouping'
const label = 'Status'
const value = 'Temp'

const alterSelecteds = () => {
  selecteds.forEach(alter)
  report()
}

const alter = track => {
  try {
    const fieldText = track[labelField]()
    const delimiter = fieldText ? ', ' : ''
    const newFieldText = shouldPrefix
      ? `${label}: ${value}${delimiter}${fieldText}`
      : `${fieldText}${delimiter}${label}: ${value}`
    track[labelField].set(newFieldText)
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

selectedCount && alterSelecteds()

selectedCount || displayAlert('No tracks selected.', {
  buttons: ['OK'],
  defaultButton: 'OK',
  as: 'critical'
})
