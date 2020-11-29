/// import {getTagValue, getFieldValue, getIsEditable, columnBrowserFields} from '..'
import {getTagValue, getFieldValue, getIsEditable} from '..'

export function valuate(valuation, [label, tagKit]) {

  const {state, artist, artistTracks} = this
  const {nil} = state
  const {tagValueByLabel = {}, fieldValueByLabel = {}} = valuation
  const trackValuation = {}
  const [firstArtistTrack] = artistTracks

  const {
    antiAdoptionStateKey,
    defaultValue,
    getDefaultValue = () => {},
    defaultAdoptionFieldValue,
    getDefaultAdoptionFieldValue = () => {},
  } = tagKit

  const didSetByArtist = state[antiAdoptionStateKey]
  const didSet = didSetByArtist?.[artist]

  const doesTrackHaveTagValue = track => {
    const data = track.properties()
    const this_ = {data}
    const tagValue = getTagValue.call({data}, label)
    if (!tagValue) return
    /// const isEditable = getIsEditable.call(this_, track, true)
    const isEditable = getIsEditable.call(this_, track)
    if (!isEditable) return
    trackValuation.fieldValue = getFieldValue.call(this_, label)
    trackValuation.tagValue = tagValue
    return true
  }

  if (didSet) return valuation

  artistTracks.some(doesTrackHaveTagValue)

  const {tagValue, fieldValue} = trackValuation
  const fieldValue_ = fieldValue !== nil && fieldValue
  const track = firstArtistTrack
  const data = {}

  const tagValue_ =
       tagValue
    || defaultValue
    || getDefaultValue(track, data, label)

  const fieldValue__ =
       fieldValue_
    || defaultAdoptionFieldValue
    || getDefaultAdoptionFieldValue(tagValue)
    || nil

  tagValue_ && (tagValueByLabel[label] = tagValue_)
  fieldValue__ && (fieldValueByLabel[label] = fieldValue__)

  return {tagValueByLabel, fieldValueByLabel}
}
