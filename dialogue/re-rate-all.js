module.exports = () => { // #note: Unused in favor of setting in "Preferences" playlist's description.

  const app = require('../app')
  const buttons = ['Cancel', 'Yes', 'No']

  const {buttonReturned} = app.displayDialog('Re-rate all artists?', {
    buttons,
    cancelButton: 'Cancel',
    defaultButton: 'No',
    withIcon: 1
  })

  return buttonReturned === 'Yes'
}
