
/* global Application */
const app = Application('iTunes')
app.fixedIndexing = true
app.includeStandardAdditions = true
const {chooseFromList, displayAlert, displayDialog} = app
const selection = app.selection()
const {length} = selection
let trackCount = 0
let failedCount = 0

if (!length) displayAlert('No tracks selected.', {
  buttons: ['OK'],
  defaultButton: 'OK',
  as: 'critical'
})
else chooseLabel()

function chooseLabel() {
  const s = trackCount === 1 ? '\'s' : 's\''
  const these = trackCount === 1 ? 'this' : 'these'
  const labels = ['Misc', 'Deviated']
  const chosen = chooseFromList(labels, {
    withPrompt: `Which label should be removed from ${these} ${length} track${s}?`,
    withIcon: 1
  })
  if (chosen) handle(chosen)
}

function handle([label]) {
  if (label === 'Misc') {
    const value = chooseMisc()
    if (value) removeMisc(value)
  }
  else remove(label)
}

function chooseMisc() {
  const s = trackCount === 1 ? '\'s' : 's\''
  const these = trackCount === 1 ? 'this' : 'these'
  const values = ['Re-Evaluate']
  const chosen = chooseFromList(values, {
    withPrompt: `Which misc. value should be removed from ${these} ${length} track${s}?`,
    withIcon: 1
  })
  if (chosen) return chosen[0]
}

function removeMisc(value) {
  selection.forEach(track => {
    try {
      if (track.category() === value) track.category.set('')
      const composer = track.composer()
      const entry = `"Misc: ${value}" `
      const start = composer.indexOf(entry)
      if (start !== -1) {
        const {length} = entry
        const beginning = composer.slice(0, start)
        const end = composer.slice(start + length)
        track.composer.set(beginning + end)
        trackCount++
      }
    }
    catch (unused) { failedCount++ }
  })
  report(`"Misc: ${value}"`)
}

function remove(label) {
  selection.forEach(track => {
    try {
      const columnName = label === 'Deviated' ? 'comment' : ''
      if (columnName) track[columnName].set('')
      const propertyName = label === 'Deviated' ? 'grouping' : 'composer'
      const previous = track[propertyName]()
      const searchString = `"${label}: `
      const start = previous.indexOf(searchString)
      if (start !== -1) {
        const finish = previous.indexOf('"', start + 1)
        const beginning = previous.slice(0, start)
        const end = previous.slice(finish + 2)
        track[propertyName].set(beginning + end)
        trackCount++
      }
    }
    catch (unused) { failedCount++ }
  })
  report(label)
}

function report(text) {
  const s = trackCount === 1 ? '\'s' : 's\''
  const were = trackCount === 1 ? 'was' : 'were'
  displayDialog(`${trackCount} track${s} ${text} ${were} removed. ${failedCount} failed.`, {
    buttons: ['OK'],
    defaultButton: 'OK',
    withIcon: 1
  })
}
