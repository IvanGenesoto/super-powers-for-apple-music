import {tagKitByLabel, comprisingLabelsByField, getTagValue} from '..'

export function setField(label, value = '') { // #mustBeCalledInTryBlock, #mustPassData

  const {track, data} = this
  const {field} = tagKitByLabel[label]
  const comprisingLabels = comprisingLabelsByField[field]
  const shouldComprise = comprisingLabels
  const [beginningLabel, endingLabel] = comprisingLabels || []
  const isBeginningLabel = label === beginningLabel
  const otherLabel = isBeginningLabel ? endingLabel : beginningLabel
  const otherValue_ = shouldComprise && getTagValue.call(this, otherLabel)
  const otherValue = otherValue_ || ''
  const comprisedValue = isBeginningLabel ? value + otherValue : otherValue + value
  const value_ = shouldComprise ? comprisedValue : value
  const [firstCharacter] = value_
  const value__ = firstCharacter.toUpperCase() + value_.slice(1)

  if (!field) return

  track[field].set(value__)
  data[field] = value__
}
