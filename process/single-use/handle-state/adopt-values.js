const labelKitByLabel = require('../../../label-kit-by-label')
const prepAdoption = require('./prep-adoption')
const addTag = require('../../multi-use/tag/add')

module.exports = function adoptValues([artist, tracks]) {

  const {state} = this
  const {didAdoptValuesByArtist, getArtistTracks} = state
  const artistTracks = getArtistTracks.call(this, artist)

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

  const {valueByLabel, valueByField} = Object
    .entries(labelKitByLabel)
    .reduce(prepAdoption.bind({state, artist, artistTracks}))

  tracks.forEach(adopt)
  didAdoptValuesByArtist[artist] = true
}
