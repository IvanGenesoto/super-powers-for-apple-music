
const app = require('./app')
const {chooseFromList, displayAlert, displayDialog} = app
const selection = app.selection()
const {length} = selection

if (!length) displayAlert('No tracks selected.', {
  buttons: ['OK'],
  defaultButton: 'OK',
  as: 'critical'
})
else chooseProperty()

function chooseProperty() {
  const [track] = selection
  const properties = track.properties()
  const keys = Object.keys(properties)
  const chosen = chooseFromList(keys, {
    withPrompt: `Get value for which property?`,
    withIcon: 1
  })
  if (chosen) report(chosen, properties)
}

function report([key], properties) {
  const value = '' + properties[key]
  displayDialog(value)
}
