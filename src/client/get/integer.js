import {getFieldValue} from '..'

export function getInteger(unused, data, label) {

  const {isDefault} = this
  const previousValue = getFieldValue.call({data}, label) || 0

  return isDefault ? previousValue - 1 : previousValue + 1
}
