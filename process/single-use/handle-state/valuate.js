const getTagValue = require('../../../get/tag-value')
const getFieldValue = require('../../../get/field-value')
const getIsEditable = require('../../../get/is-editable')

module.exports = function valuate(valuation, [label, labelKit]) {

  const {state, artist, artistTracks} = this
  const {valueByLabel = {}, fieldValueByLabel = {}} = valuation
  const trackValuation = {}
  const [firstArtistTrack] = artistTracks

  const {
    antiAdoptionStateKey,
    defaultValue,
    getDefaultValue,
    defaultFieldValue,
    getDefaultFieldValue
  } = labelKit

  const didSetByArtist = state[antiAdoptionStateKey]
  const didSet = didSetByArtist && didSetByArtist[artist]

  const find = track => {
    const data = track.properties()
    const value = getTagValue.call({data}, label)
    if (!value) return
    const isEditable = getIsEditable.call({data, track})
    if (!isEditable) return
    trackValuation.fieldValue = getFieldValue.call({data}, label)
    return (trackValuation.value = value)
  }

  if (didSet) return valuation

  artistTracks.find(find)

  const {value, fieldValue} = trackValuation

  const value_ =
    value ||
    defaultValue ||
    (getDefaultValue && getDefaultValue(firstArtistTrack))

  const fieldValue_ =
    fieldValue ||
    defaultFieldValue ||
    (getDefaultFieldValue && getDefaultFieldValue(firstArtistTrack))
    // (columnBrowserFields.includes(field) && '-') // #note: Column Browser deprecated in Music app.

  value_ && (valueByLabel[label] = value_)
  fieldValue_ && (fieldValueByLabel[label] = fieldValue_)

  return {valueByLabel, fieldValueByLabel}
}
