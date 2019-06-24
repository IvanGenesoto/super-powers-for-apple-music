const columnBrowserFields = require('../../../column-browser-fields')
const getTagValue = require('../../multi-use/tag/get-value')

module.exports = function valuate(valuation, [label, labelKit]) {

  const {state, artist, artistTracks} = this
  const wrappedLabelValue = {}
  const wrappedFieldValue = {}
  const {valueByLabel = {}, valueByField = {}} = valuation

  const appendValue = (label, labelKit, isField) => {
    const {
      antiAdoptionStateKey,
      defaultLabelValue,
      getDefaultLabelValue,
      field,
      defaultFieldValue,
      getDefaultFieldValue
    } = labelKit
    const key = isField ? field : label
    const wrappedValue = isField ? wrappedFieldValue : wrappedLabelValue
    const valueByKey = isField ? valueByField : valueByLabel
    const defaultValue = isField ? defaultFieldValue : defaultLabelValue
    const getDefaultValue = isField ? getDefaultFieldValue : getDefaultLabelValue
    const getValue = isField ? getFieldValue : getTagValue
    const didSetByArtist = state[antiAdoptionStateKey]
    if (didSetByArtist && didSetByArtist[artist]) return
    artistTracks.find(appendToWrappedValue, {key, getValue, wrappedValue})
    const {value} = wrappedValue
    const value_ =
      value ||
      defaultValue ||
      (getDefaultValue && getDefaultValue(artistTracks[0])) ||
      (isField && columnBrowserFields.includes(field) && '-') // #note: Deprecated with iTunes.
    value_ && (valueByKey[key] = value_)
  }

  const getFieldValue = function(key) {
    const {data} = this
    return data[key]
  }

  const appendToWrappedValue = function(track) {
    const {key, getValue, wrappedValue} = this
    const data = track.properties()
    const value = getValue.call({data}, key)
    return (wrappedValue.value = value)
  }

  appendValue(label, labelKit)
  appendValue(label, labelKit, true)

  return {valueByLabel, valueByField}
}
