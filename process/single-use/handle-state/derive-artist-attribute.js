const getTagValue = require('../../../get/tag-value')
const getFieldValue = require('../../../get/field-value')
const getIsEditable = require('../../../get/is-editable')
const executeCommand = require('../../multi-use/execute-command')

module.exports = function deriveArtistAttribute(artist) {

  const {state, label, trackLabel, stateKey} = this
  const {getArtistTracks} = state
  const didSetByArtist = state[stateKey]
  const artistTracks = getArtistTracks(artist)

  const vote = (voteCountByValue, track) => {
    const data = track.properties()
    const isEnabled = getFieldValue.call({data}, 'Enabled')
    const isDisregarded = getTagValue.call({data}, 'Disregarded')
    const isEditable = getIsEditable.call({data}) // #note: Could be set to "not paranoid" as an inaccurate value will only count as one "vote".
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
    try { executeCommand.call({...this, label, value, data}, track) }
    catch (unused) { }
  }

  const voteCountByValue = artistTracks.reduce(vote, {})

  const {winner: value} = Object
    .entries(voteCountByValue)
    .reduce(tally, {winningVoteCount: 0})

  artistTracks.forEach(callExecuteCommand)
  didSetByArtist[artist] = true
}
