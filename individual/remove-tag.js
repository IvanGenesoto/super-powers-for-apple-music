const app = require('../app')
const {chooseFromList, displayAlert, displayDialog} = app
const selecteds = app.selection()
const {length: selectedCount} = selecteds

const chooseField = () => {
  const fields = ['grouping', 'composer']
  // const fields = ['Status', 'Deviated']
  const chosens = chooseFromList(fields, {
    withPrompt: `Which field is the tag in?`,
    withIcon: 1
  })
  chosens && handle(chosens)
}

const handle = ([field]) => {
  const [chosen] = chooseLabel() || []
  chosen && removeFromSelecteds(field, chosen)
}

const chooseLabel = () => {
  const s = trackCount === 1 ? '\'s' : 's\''
  const these = trackCount === 1 ? 'this' : 'these'
  const values = ['Status', 'Artist']
  const chosens = chooseFromList(values, {
    withPrompt: `Which label should be removed from ${these} ${selectedCount} track${s}?`,
    withIcon: 1
  })
  return chosens
}

const removeFromSelecteds = (field, label) => {
  selecteds.forEach(remove, {field, label})
  report(label)
}

const remove = function (track) {
  const {field, label} = this
  try {
    const previousFieldValue = track[field]()
    const {length} = previousFieldValue
    const searchString = label + ': '
    const beginningIndex = previousFieldValue.indexOf(searchString)
    if (beginningIndex === -1) return
    const leadingCommaIndex = previousFieldValue.lastIndexOf(',', beginningIndex)
    const beginningIndex_ = leadingCommaIndex === -1 ? beginningIndex : leadingCommaIndex
    const traiingCommaIndex = previousFieldValue.indexOf(',', beginningIndex)
    const endingIndex = traiingCommaIndex === -1 ? length : traiingCommaIndex
    const beginning = previousFieldValue.slice(0, beginningIndex_)
    const ending = previousFieldValue.slice(endingIndex + 2)
    track[field].set(beginning + ending)
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

selectedCount && chooseField()

selectedCount || displayAlert('No tracks selected.', {
  buttons: ['OK'],
  defaultButton: 'OK',
  as: 'critical'
})
