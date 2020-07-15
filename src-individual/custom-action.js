const app = require('../src/app')
const display = require('../src/dialogue/display')

const shouldAllBeProcessed = () => {
  const buttons = ['Cancel', 'All', 'Smart']
  const {buttonReturned} = app.displayDialog('Which artists should be processed?', {
    buttons,
    cancelButton: 'Cancel',
    defaultButton: 'Smart',
    withIcon: 1
  })
  return buttonReturned === 'All'
}

const isTest = true
const shouldProcessAll = shouldAllBeProcessed()
const process = (shouldProcessAll, isTest) => display(`${shouldProcessAll} ${isTest}`)

process(shouldProcessAll, isTest)
