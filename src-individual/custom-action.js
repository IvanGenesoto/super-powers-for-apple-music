import {app
} from '.'

const {displayDialog, displayAlert} = app
const buttons = ['All', 'Played', 'Smart']

const {buttonReturned} = displayDialog('Which artists should be processed?', {
  buttons,
  defaultButton: 'Smart',
  withIcon: 1,
})

displayAlert(buttonReturned)
