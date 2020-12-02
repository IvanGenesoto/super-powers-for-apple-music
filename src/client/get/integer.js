import {getFieldValue} from '..'

export const getInteger = function (song, label) {

  const {isDefault} = this
  const previousValue = getFieldValue(song, label) || 0

  return isDefault ? previousValue - 1 : previousValue + 1
}
