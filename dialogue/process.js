module.exports = () => {
  const app = require('../app')
  const buttons = ['Cancel', 'Yes']
  const {buttonReturned} = app.displayDialog(
    'Process your music collection?',
    {
      buttons,
      cancelButton: 'Cancel',
      defaultButton: 'Yes',
      withIcon: 1
    }
  )
  return buttonReturned === 'Yes'
}
