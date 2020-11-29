import {tagKitByLabel, valuate, addTag, setField} from '..'

export function adoptValues([artist, tracks]) {

  const {state} = this
  const {getArtistTracks, shouldProcessAll} = state
  const artistTracks = shouldProcessAll && getArtistTracks(artist)
  const tracks_ = shouldProcessAll ? artistTracks : tracks

  const adopt = track => {
    const data = track.properties()
    adoptValue(track, data, valueByLabel)
    adoptValue(track, data, fieldValueByLabel, true)
  }

  const adoptValue = (track, data, valueByLabel, isField) => Object
    .entries(valueByLabel)
    .forEach(set.bind({track, data, isField}))

  const set = function ([label, value]) {
    const {track, data, isField} = this
    const set = isField ? setField : addTag
    try {
      set.call({track, data}, label, value)
    }
    catch { }
  }

  const isTagKitAdoptable = ({isAdoptable}) => isAdoptable
  const adoptableTagKitByLabel = tagKitByLabel.filter(isTagKitAdoptable)

  const {valueByLabel, fieldValueByLabel} = Object
    .entries(adoptableTagKitByLabel)
    .reduce(valuate.bind({state, artist, artistTracks}), {})

  tracks_.forEach(adopt)
}