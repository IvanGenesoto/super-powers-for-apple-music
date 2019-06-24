const columnBrowserFields = require('../../../column-browser-fields')
const getTagValue = require('../../multi-use/tag/get-value') // #debug: Create function!

module.exports = function valuate(valuation, [label, kit]) {

  const {state, artist, artistTracks} = this
  const wrappedLabelPreValue = {}
  const wrappedFieldPreValue = {}
  const {valueByLabel = {}, valueByField = {}} = valuation

  const appendValue = (label, kit, isField) => {
    const {
      antiAdoptionStateKey,
      defaultLabelValue,
      getDefaultLabelValue,
      field,
      defaultFieldValue,
      getDefaultFieldValue
    } = kit
    const key = isField ? field : label
    const wrappedValue = isField ? wrappedFieldPreValue : wrappedLabelPreValue
    const valueByKey = isField ? valueByField : valueByLabel
    const defaultValue = isField ? defaultFieldValue : defaultLabelValue
    const getDefaultValue = isField ? getDefaultFieldValue : getDefaultLabelValue
    const getValue = isField ? getFieldValue : getTagValue
    const didSetByArtist = state[antiAdoptionStateKey]
    if (didSetByArtist && didSetByArtist[artist]) return
    artistTracks.find(appendPreValue, {key, getValue, wrappedValue})
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

  const appendPreValue = function(track) {
    const {key, getValue, wrappedValue} = this
    const data = track.properties()
    const value = getValue.call({data}, key)
    return (wrappedValue.value = value)
  }

  appendValue(label, kit)
  appendValue(label, kit, true)

  return {valueByLabel, valueByField}
}
