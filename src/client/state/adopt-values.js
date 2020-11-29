import {tagKitByLabel, valuate, addTag, setField} from '..'

export function adoptValues([artist, tracks]) {

  const {state} = this
  const {getArtistTracks, shouldProcessAll} = state
  const adoptableTagKitByLabel = tagKitByLabel.filter(({isAdoptable}) => isAdoptable)
  const artistTracks = shouldProcessAll && getArtistTracks(artist)
  const tracks_ = shouldProcessAll ? artistTracks : tracks

  const adopt = track => {
    const data = track.properties()
    adoptValue(track, data, tagValueByLabel)
    adoptValue(track, data, fieldValueByLabel, true)
  }

  const adoptValue = (track, data, valueByLabel, isField) => Object
    .entries(valueByLabel)
    .forEach(set.bind({state, track, data, isField}))

  const set = function ([label, value]) {
    const {track, isField} = this
    const set = isField ? setField : addTag
    try {
      set.call(this, track, label, value)
    }
    catch {}
  }

  const {tagValueByLabel, fieldValueByLabel} = Object
    .entries(adoptableTagKitByLabel)
    .reduce(valuate.bind({state, artist, artistTracks}), {})

  tracks_.forEach(adopt)
}
