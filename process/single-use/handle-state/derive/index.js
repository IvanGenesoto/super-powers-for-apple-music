const getTagValue = require('../../../../get/tag-value')
const getFieldValue = require('../../../../get/field-value')
const getIsEditable = require('../../../../get/is-editable')
const labelKitByLabel = require('../../../../label-kit-by-label')
const executeCommand = require('../../../multi-use/execute-command')

module.exports = function derive(artist) {

  const {state, label, trackLabel, stateKey} = this
  const {getArtistTracks} = state
  const didSetByArtist = state[stateKey]
  const artistTracks = getArtistTracks.call(this, artist)
  const labelKit = labelKitByLabel[label]

  const vote = (voteCountByValue, track) => {
    const data = track.properties()
    const isEnabled = getFieldValue.call({data}, 'Enabled')
    const isDisregarded = getTagValue.call({data}, 'Disregarded')
    const isEditable = getIsEditable.call({data}) // #note: Not set to paranoid as an inaccurate value will only count as one "vote".
    const value = getTagValue.call({data}, trackLabel)
    const {[value]: voteCount = 0} = voteCountByValue
    if (!isEnabled || isDisregarded || !isEditable || !value) return voteCountByValue
    voteCountByValue[value] = voteCount + 1
    return voteCountByValue
  }

  const tally = (winningKit, [value, voteCount]) => {
    const {winningVoteCount} = winningKit
    if (voteCount <= winningVoteCount) return winningKit
    return {winningVoteCount: voteCount, winner: value}
  }

  const callExecuteCommand = track => {
    const data = track.properties()
    try { executeCommand.call({...this, label, labelKit, value, data}, track) }
    catch (unused) { }
  }

  const voteCountByValue = artistTracks.reduce(vote, {})

  const {winner: value} = Object
    .entries(voteCountByValue)
    .reduce(tally, {winningVoteCount: 0})

  artistTracks.forEach(callExecuteCommand)
  didSetByArtist[artist] = true
}
