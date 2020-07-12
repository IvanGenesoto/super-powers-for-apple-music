const getTagValue = require('../get/tag-value')
const getFieldValue = require('../get/field-value')
const getIsEditable = require('../get/is-editable')
// const columnBrowserFields = require('../static/column-browser-fields')

module.exports = function valuate(valuation, [label, tagKit]) {

  const {state, artist, artistTracks} = this
  const {valueByLabel = {}, fieldValueByLabel = {}} = valuation
  const trackValuation = {}
  const [firstArtistTrack] = artistTracks

  const {
    antiAdoptionStateKey,
    defaultValue,
    getDefaultValue = () => {},
    defaultAdoptionFieldValue,
    getDefaultAdoptionFieldValue = () => {}
  } = tagKit

  // const columnBrowserDefaultValue = columnBrowserFields.includes(field) && '-'
  const didSetByArtist = state[antiAdoptionStateKey]
  const didSet = didSetByArtist && didSetByArtist[artist]

  const doesTrackHaveTagValue = track => {
    const data = track.properties()
    const value = getTagValue.call({data}, label)
    if (!value) return
    const isEditable = getIsEditable.call({data, track})
    if (!isEditable) return
    trackValuation.fieldValue = getFieldValue.call({data}, label)
    trackValuation.value = value
    return true
  }

  if (didSet) return valuation

  artistTracks.some(doesTrackHaveTagValue)

  const {value, fieldValue} = trackValuation
  const fieldValue_ = fieldValue !== '-' && fieldValue
  const track = firstArtistTrack
  const data = {}

  const value_ =
    value ||
    defaultValue ||
    getDefaultValue(track, data, label)

  const fieldValue__ =
    fieldValue_ ||
    defaultAdoptionFieldValue ||
    getDefaultAdoptionFieldValue(value) ||
    '-'

  value_ && (valueByLabel[label] = value_)
  fieldValue__ && (fieldValueByLabel[label] = fieldValue__)

  return {valueByLabel, fieldValueByLabel}
}
