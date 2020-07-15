const app = require('../src/app')
const {displayAlert, displayDialog} = app
const selecteds = app.selection()
const {length: selectedCount} = selecteds
const field = 'composer'
const label = 'Genre'
const replacementLabel = 'Original Genre'

const alterSelecteds = () => {
  selecteds.forEach(alter)
  report()
}

const alter = track => {
  try {
    const previousFieldValue = track[field]()
    // const {length} = previousFieldValue
    const delimiter = ': '
    const searchString = label + delimiter
    const {length} = searchString
    const beginningIndex = previousFieldValue.indexOf(searchString)
    if (beginningIndex === -1) return
    // const leadingCommaIndex = previousFieldValue.lastIndexOf(',', beginningIndex)
    // const beginningIndex_ = leadingCommaIndex === -1 ? beginningIndex : leadingCommaIndex
    // const traiingCommaIndex = previousFieldValue.indexOf(',', beginningIndex)
    // const endingIndex = traiingCommaIndex === -1 ? length : traiingCommaIndex
    const endingIndex = beginningIndex + length
    const beginning = previousFieldValue.slice(0, beginningIndex)
    const ending = previousFieldValue.slice(endingIndex)
    const newFieldValue = beginning + replacementLabel + delimiter + ending
    track[field].set(newFieldValue)
    trackCount++
  }
  catch (unused) { failedCount++ }
}

// const alter = track => {
//   try {
//     let fieldValue = track[field]()
//     for (let i = 0; i < fieldValue.length; i++) {
//       const character = fieldValue[i]
//       if (character === '"') {
//         if (fieldValue[i + 1] === ' ') {
//           const beginning = fieldValue.slice(0, i)
//           const ending = fieldValue.slice(i + 1)
//           fieldValue = beginning + ',' + ending
//         }
//         else {
//           const beginning = fieldValue.slice(0, i)
//           const ending = fieldValue.slice(i + 1)
//           fieldValue = beginning + ending
//         }
//       }
//     }
//     track[field].set(fieldValue)
//     trackCount++
//   }
//   catch (unused) { failedCount++ }
// }

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
