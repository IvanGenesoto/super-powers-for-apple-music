import {fieldKitByLabel} from '..'

export function getFieldValue(song, label) {

  const fieldKit = fieldKitByLabel[label]
  const {field} = fieldKit

  return song[field]
}
