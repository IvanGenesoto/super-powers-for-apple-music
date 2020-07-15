const app = require('../src/app')
const {chooseFromList, displayAlert, displayDialog} = app
const selecteds = app.selection()
const [hasSelected] = selecteds

const chooseProperty = () => {
  const [track] = selecteds
  const properties = track.properties()
  const keys = Object.keys(properties)
  const chosen = chooseFromList(keys, {
    withPrompt: `Get value for which property?`,
    withIcon: 1
  })
  chosen && report(chosen, properties)
}

const report = ([key], properties) => {
  const value = '' + properties[key]
  displayDialog(value)
}

hasSelected && chooseProperty()

hasSelected || displayAlert('No tracks selected.', {
  buttons: ['OK'],
  defaultButton: 'OK',
  as: 'critical'
})
