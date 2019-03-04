const columnBrowserFields = require('../../../column-browser-fields')
const getTag = require('../../multi-use/tag/get') // #debug: Create function!

module.exports = function prepAdoption(valuation, [label, kit]) {

  const {state, artist, artistTracks} = this

  const {
    preValueByLabel = {},
    preValueByField = {},
    valueByLabel = {},
    valueByField = {}
  } = valuation

  const appendValue = (label, kit, isField) => {
    const {
      adoptionStateKey,
      defaultLabelValue,
      getDefaultLabelValue,
      field,
      defaultFieldValue,
      getDefaultFieldValue
    } = kit
    const key = isField ? field : label
    const preValueByKey = isField ? preValueByField : preValueByLabel
    const valueByKey = isField ? valueByField : valueByLabel
    const defaultValue = isField ? defaultFieldValue : defaultLabelValue
    const getDefaultValue = isField ? getDefaultFieldValue : getDefaultLabelValue
    const getValue = isField ? getField : getTag
    const didSetByArtist = state[adoptionStateKey]
    if (didSetByArtist && didSetByArtist[artist]) return
    artistTracks.find(appendPreValue, {key, getValue, preValueByKey})
    const value =
      preValueByKey[key] ||
      defaultValue ||
      (getDefaultValue && getDefaultValue(artistTracks[0])) ||
      (isField && columnBrowserFields.includes(field) && '-')
    value && (valueByKey[key] = value)
  }

  const getField = function(key) {
    const {track} = this
    return track[key]()
  }

  const appendPreValue = function(track) {
    const {key, getValue, preValueByKey} = this
    const data = track.properties()
    const value = getValue.call({track, data}, key)
    return (preValueByKey[key] = value)
  }

  appendValue(label, kit)
  appendValue(label, kit, true)

  return valuation
}
