import {fieldKitByLabel} from '..'

export const getFieldValue = (song, label) => {

  const fieldKit = fieldKitByLabel[label]
  const {field} = fieldKit

  return song[field]
}
