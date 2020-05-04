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
    defaultFieldValue,
    getDefaultFieldValue = () => {}
  } = tagKit

  // const columnBrowserDefaultValue = columnBrowserFields.includes(field) && '-'
  const didSetByArtist = state[antiAdoptionStateKey]
  const didSet = didSetByArtist && didSetByArtist[artist]

  const find = track => {
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

  artistTracks.find(find)

  const {value, fieldValue} = trackValuation
  const track = firstArtistTrack
  const data = {}

  const value_ =
    value ||
    defaultValue ||
    getDefaultValue(track, data, label)

  const fieldValue_ =
    fieldValue ||
    defaultFieldValue ||
    getDefaultFieldValue(track, data, label, value) ||
    '-'

  value_ && (valueByLabel[label] = value_)
  fieldValue_ && (fieldValueByLabel[label] = fieldValue_)

  return {valueByLabel, fieldValueByLabel}
}
