const labelKitByLabel = require('../../../label-kit-by-label')
const valuate = require('./valuate')
const addTag = require('../../multi-use/tag/add')
const setField = require('../../multi-use/set-field')

module.exports = function adoptValues([artist, tracks]) {

  const {state} = this
  const {didAdoptValuesByArtist, getArtistTracks} = state

  const adopt = track => {
    const data = track.properties()
    adoptValue(track, data, valueByLabel)
    adoptValue(track, data, fieldValueByLabel, true)
  }

  const adoptValue = (track, data, valueByLabel, isField) => Object
    .entries(valueByLabel)
    .forEach(set.bind({track, data, isField}))

  const set = function([label, value]) {
    const {track, data, isField} = this
    const set = isField ? setField : addTag
    try { set.call({track, data}, label, value) }
    catch (unused) { }
  }

  if (didAdoptValuesByArtist[artist]) return

  const artistTracks = getArtistTracks(artist)
  const isValueAdoptable = ({isAdoptable}) => isAdoptable
  const adoptableLabelKitByLabel = labelKitByLabel.filter(isValueAdoptable)

  const {valueByLabel, fieldValueByLabel} = Object
    .entries(adoptableLabelKitByLabel)
    .reduce(valuate.bind({state, artist, artistTracks}), {})

  tracks.forEach(adopt)
  didAdoptValuesByArtist[artist] = true
}
