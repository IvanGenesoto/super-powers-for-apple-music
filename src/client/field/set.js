import {tagKitByLabel, comprisingLabelsByField, getTagValue} from '..'

export function setField(track, label, value) { // #mustBeCalledInTryBlock, #mustPassData

  const {data, state} = this
  const {nil} = state
  const value_ = value || nil
  const {field} = tagKitByLabel[label]
  const comprisingLabels = comprisingLabelsByField[field]
  const shouldComprise = comprisingLabels
  const [beginningLabel, endingLabel] = comprisingLabels || []
  const isBeginningLabel = label === beginningLabel
  const otherLabel = isBeginningLabel ? endingLabel : beginningLabel
  const otherValue_ = shouldComprise && getTagValue.call(this, otherLabel)
  const otherValue = otherValue_ || ''
  const comprisedValue = isBeginningLabel ? value_ + otherValue : otherValue + value_
  const value__ = shouldComprise ? comprisedValue : value_
  const [firstCharacter] = value__
  const value___ = firstCharacter.toUpperCase() + value__.slice(1)

  if (!field) return

  track[field].set(value___)
  data[field] = value___
}
