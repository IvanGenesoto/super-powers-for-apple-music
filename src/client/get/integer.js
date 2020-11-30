import {getFieldValue} from '..'

export function getInteger(song, label) {

  const {isDefault} = this
  const previousValue = getFieldValue(song, label) || 0

  return isDefault ? previousValue - 1 : previousValue + 1
}
