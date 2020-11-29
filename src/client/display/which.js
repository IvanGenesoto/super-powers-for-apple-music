import {display} from '..'

export const displayWhich = () => {

  const buttons = ['Cancel', 'All', 'Smart']

  const {buttonReturned} = display('Which artists should be processed?', {
    buttons,
    cancelButton: 'Cancel',
    defaultButton: 'Smart',
    withIcon: 1,
  })

  return buttonReturned === 'All'
}
