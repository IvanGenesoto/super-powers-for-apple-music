import {fieldKitEnum, comprisingLabelsByField, getTagValue, nil} from '..'

export const setField = (song, label, value) => { // #mustBeCalledInTryBlock

  const {track} = song
  const value_ = value || nil
  const {field} = fieldKitEnum[label]
  const comprisingLabels = comprisingLabelsByField[field]
  const shouldComprise = comprisingLabels
  const [beginningLabel, endingLabel] = comprisingLabels || []
  const isBeginningLabel = label === beginningLabel
  const otherLabel = isBeginningLabel ? endingLabel : beginningLabel
  const otherValue_ = shouldComprise && getTagValue(song, otherLabel)
  const otherValue = otherValue_ || ''
  const comprisedValue = isBeginningLabel ? value_ + otherValue : otherValue + value_
  const value__ = shouldComprise ? comprisedValue : value_
  const [firstCharacter] = value__
  const value___ = firstCharacter.toUpperCase() + value__.slice(1)

  if (!field) return

  track[field].set(value___)
  song[field] = value___
}
