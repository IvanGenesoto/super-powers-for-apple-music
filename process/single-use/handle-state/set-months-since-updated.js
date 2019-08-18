module.exports = function setMonthsSinceUpdated(track) {

  const getTagValue = require('../../../get/tag-value')
  const {state} = this
  const {didUpdateByArtist} = state
  const data = track.properties()
  const {artist} = data
  const dateString = getTagValue.call({data}, 'Artist Updated')
  const date = new Date(dateString)
  const milliseconds = new Date() - date
  const days = milliseconds / 1000 / 60 / 60 / 24
  const years = days / 365
  const months_ = years * 12
  const months = Math.round(months_)

  if (didUpdateByArtist[artist]) return

  try { track.bpm.set(months) }
  catch (unused) { }
}
