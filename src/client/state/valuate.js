/// import {getTagValue, getFieldValue, getIsEditable, columnBrowserFields} from '..'
import {getTagValue, getFieldValue, getIsEditable} from '..'

export function valuate(valuation, [label, fieldKit]) {

  const {state, artist, artistSongs} = this
  const {nil} = state
  const {tagValueByLabel = {}, fieldValueByLabel = {}} = valuation
  const songValuation = {}
  const [firstArtistSong] = artistSongs

  const {
    antiAdoptionStateKey,
    defaultTagValue,
    getDefaultTagValue = () => {},
    defaultAdoptionFieldValue,
    getDefaultAdoptionFieldValue = () => {},
  } = fieldKit

  const didSetByArtist = state[antiAdoptionStateKey]
  const didSet = didSetByArtist?.[artist]

  const doesSongHaveTagValue = song => {
    const tagValue = getTagValue(song, label)
    if (!tagValue) return
    /// const isEditable = getIsEditable(song, true)
    const isEditable = getIsEditable(song)
    if (!isEditable) return
    songValuation.fieldValue = getFieldValue(song, label)
    songValuation.tagValue = tagValue
    return true
  }

  if (didSet) return valuation

  artistSongs.some(doesSongHaveTagValue)

  const {tagValue, fieldValue} = songValuation
  const fieldValue_ = fieldValue !== nil && fieldValue

  const tagValue_ =
       tagValue
    || defaultTagValue
    || getDefaultTagValue(firstArtistSong, label)

  const fieldValue__ =
       fieldValue_
    || defaultAdoptionFieldValue
    || getDefaultAdoptionFieldValue(tagValue)
    || nil

  tagValue_ && (tagValueByLabel[label] = tagValue_)
  fieldValue__ && (fieldValueByLabel[label] = fieldValue__)

  return {tagValueByLabel, fieldValueByLabel}
}
