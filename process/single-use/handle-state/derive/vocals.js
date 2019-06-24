const getTagValue = require('../../../multi-use/tag/get-value')
const labelKitByLabel = require('../../../../label-kit-by-label')
const executeCommand = require('../../../multi-use/execute-command')

module.exports = function deriveVocals(artist) {

  const {state} = this
  const {getArtistTracks, didSetVocalsByArtist} = state
  const artistTracks = getArtistTracks.call(this, artist)
  const label = 'Artist Vocals'
  const labelKit = labelKitByLabel[label]

  const vote = (voteCountByValue, track) => {
    const data = track.properties()
    const value = getTagValue.call({data}, 'Vocals')
    if (!value) return voteCountByValue
    const {[value]: voteCount = 0} = voteCountByValue
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
  didSetVocalsByArtist[artist] = true
}
