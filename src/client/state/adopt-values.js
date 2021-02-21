import {fieldKitEnum, valuate, addTag, setField} from '..'

export const adoptValues = function ([artist, songs]) {

  const {state} = this
  const {getArtistSongs, shouldProcessAll} = state
  const artistSongs = shouldProcessAll && getArtistSongs(artist, state)
  const songs_ = shouldProcessAll ? artistSongs : songs
  const valuateWithThis = valuate.bind({state, artist, artistSongs})
  const isEntryAdoptable = ([unusedKey, {isAdoptable}]) => isAdoptable

  const adopt = song => {
    adoptValue(song, tagValueByLabel)
    adoptValue(song, fieldValueByLabel, true)
  }

  const adoptValue = (song, valueByLabel, isField) => Object
    .entries(valueByLabel)
    .forEach(set, {state, song, isField})

  const set = function ([label, value]) {
    const {song, isField} = this
    const set = isField ? setField : addTag
    try {
      set(song, label, value)
    }
    catch {}
  }

  const {tagValueByLabel, fieldValueByLabel} = Object
    .entries(fieldKitEnum)
    .filter(isEntryAdoptable)
    .reduce(valuateWithThis, {})

  songs_.forEach(adopt)
}
