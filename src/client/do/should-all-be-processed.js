import {app} from '..'

export const shouldAllBeProcessed = () => {

  const {displayDialog} = app
  const buttons = ['Cancel', 'All', 'Smart']

  const {buttonReturned} = displayDialog('Which artists should be processed?', {
    buttons,
    cancelButton: 'Cancel',
    defaultButton: 'Smart',
    withIcon: 1,
  })

  return buttonReturned === 'All'
}
