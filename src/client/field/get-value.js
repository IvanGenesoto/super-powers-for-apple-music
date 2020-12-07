import {fieldKitEnum} from '..'

export const getFieldValue = (song, label) => {

  const fieldKit = fieldKitEnum[label]
  const {field} = fieldKit

  return song[field]
}
