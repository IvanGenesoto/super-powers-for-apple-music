const app = require('./app')
const {chooseFromList, displayAlert, displayDialog} = app
const selecteds = app.selection()
const {length: selectedCount} = selecteds

const chooseLabel = () => {
  const s = trackCount === 1 ? '\'s' : 's\''
  const these = trackCount === 1 ? 'this' : 'these'
  const labels = ['Misc', 'Deviated']
  const chosens = chooseFromList(labels, {
    withPrompt: `Which label should be removed from ${these} ${selectedCount} track${s}?`,
    withIcon: 1
  })
  chosens && handle(chosens[0])
}

const handle = label => {
  if (label !== 'Misc') return removeFromSelecteds(label)
  const chosen = chooseMisc()
  chosen && removeMiscFromSelecteds(chosen)
}

const chooseMisc = () => {
  const s = trackCount === 1 ? '\'s' : 's\''
  const these = trackCount === 1 ? 'this' : 'these'
  const values = ['Re-Evaluate']
  const chosens = chooseFromList(values, {
    withPrompt: `Which misc. value should be removed from ${these} ${selectedCount} track${s}?`,
    withIcon: 1
  })
  return chosens && chosens[0]
}

const removeMiscFromSelecteds = value => {
  selecteds.forEach(removeMisc, {value})
  report(`"Misc: ${value}"`)
}

const removeMisc = function (track) {
  const {value} = this
  const category = track.category()
  const doesMatchCategory = value === category
  try {
    const composer = track.composer()
    const tag = `"Misc: ${value}" `
    const {length: tagLength} = tag
    const beginningIndex = composer.indexOf(tag)
    const endingIndex = beginningIndex + tagLength
    doesMatchCategory && track.category.set('')
    if (beginningIndex === -1) return
    const beginning = composer.slice(0, beginningIndex)
    const ending = composer.slice(endingIndex)
    track.composer.set(beginning + ending)
    trackCount++
  }
  catch (unused) { failedCount++ }
}

const removeFromSelecteds = label => {
  selecteds.forEach(remove, {label})
  report(label)
}

const remove = function (track) {
  const {label} = this
  try {
    const columnName = label === 'Deviated' ? 'comment' : ''
    if (columnName) track[columnName].set('')
    const propertyName = label === 'Deviated' ? 'grouping' : 'composer'
    const previous = track[propertyName]()
    const searchString = `"${label}: `
    const beginningIndex = previous.indexOf(searchString)
    if (beginningIndex === -1) return
    const endingIndex = previous.indexOf('"', beginningIndex + 1)
    const beginning = previous.slice(0, beginningIndex)
    const ending = previous.slice(endingIndex + 2)
    track[propertyName].set(beginning + ending)
    trackCount++
  }
  catch (unused) { failedCount++ }
}

const report = text => {
  const s = trackCount === 1 ? '\'s' : 's\''
  const were = trackCount === 1 ? 'was' : 'were'
  displayDialog(`${trackCount} track${s} ${text} ${were} removed. ${failedCount} failed.`, {
    buttons: ['OK'],
    defaultButton: 'OK',
    withIcon: 1
  })
}

let trackCount = 0
let failedCount = 0

selectedCount && chooseLabel()

selectedCount || displayAlert('No tracks selected.', {
  buttons: ['OK'],
  defaultButton: 'OK',
  as: 'critical'
})
