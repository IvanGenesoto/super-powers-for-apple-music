import {fieldKitByLabel, valuate, addTag, setField} from '..'

export const adoptValues = function ([artist, songs]) {

  const {state} = this
  const {getArtistSongs, shouldProcessAll, nil} = state
  const adoptableTagKitByLabel = fieldKitByLabel.filter(({isAdoptable}) => isAdoptable)
  const artistSongs = shouldProcessAll && getArtistSongs(artist, state)
  const songs_ = shouldProcessAll ? artistSongs : songs

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
      set(song, label, value, nil)
    }
    catch {}
  }

  const {tagValueByLabel, fieldValueByLabel} = Object
    .entries(adoptableTagKitByLabel)
    .reduce(valuate.bind({state, artist, artistSongs}), {})

  songs_.forEach(adopt)
}
