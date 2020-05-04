const app = require('../app')

module.exports = () => {

  const buttons = ['Cancel', 'All', 'Smart']

  const {buttonReturned} = app.displayDialog('Which artists should be processed?', {
    buttons,
    cancelButton: 'Cancel',
    defaultButton: 'Smart',
    withIcon: 1
  })

  return buttonReturned === 'All'
}
