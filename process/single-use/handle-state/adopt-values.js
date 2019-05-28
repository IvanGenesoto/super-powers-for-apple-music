const labelKitByLabel = require('../../../label-kit-by-label')
const valuate = require('./valuate')
const addTag = require('../../multi-use/tag/add')

module.exports = function adoptValues([artist, tracks]) {

  const {state} = this
  const {didAdoptValuesByArtist, getArtistTracks} = state

  const adopt = track => {
    const data = track.properties()
    adoptValue(track, data, valueByLabel)
    adoptValue(track, data, valueByField, true)
  }

  const adoptValue = (track, data, valueByKey, isField) => Object
    .entries(valueByKey)
    .forEach(set.bind({track, data, isField}))

  const set = function([key, value]) {
    const {track, data, isField} = this
    try {
      isField && track[key].set(value)
      isField || addTag.call({track, data}, key, value)
    }
    catch (unused) { }
  }

  if (didAdoptValuesByArtist[artist]) return

  const artistTracks = getArtistTracks.call(this, artist)
  const isValueAdoptable = ({isAdoptable}) => isAdoptable
  const artistLabelKitByLabel = labelKitByLabel.filter(isValueAdoptable)

  const {valueByLabel, valueByField} = Object
    .entries(artistLabelKitByLabel)
    .reduce(valuate.bind({state, artist, artistTracks}), {})

  tracks.forEach(adopt)
  didAdoptValuesByArtist[artist] = true
}
