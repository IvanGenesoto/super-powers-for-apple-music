import {getTagValue, getIsEditable, executeCommand, tagKitByLabel} from '..'

export function deriveArtistAttribute(artist) {

  const {state, artistLabel, songLabel} = this
  const {getArtistTracks} = state
  const artistTagKit = tagKitByLabel[artistLabel]
  const {antiAdoptionStateKey} = artistTagKit
  const didSetByArtist = state[antiAdoptionStateKey]
  const artistTracks = getArtistTracks(artist)

  const vote = (voteCountByValue, track) => {
    const data = track.properties()
    const {enabled: isEnabled} = data
    const isDisregarded = getTagValue.call({data}, 'Disregarded')
    const isEditable = getIsEditable.call({data}) // #note: Does not pass true (i.e. isParanoid) as an inaccurate value will only count as one "vote".
    const value = getTagValue.call({data}, songLabel)
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
    try {
      executeCommand.call({...this, label: artistLabel, value, data}, track)
    }
    catch {}
  }

  const voteCountByValue = artistTracks.reduce(vote, {})

  const {winner: value} = Object
    .entries(voteCountByValue)
    .reduce(tally, {winningVoteCount: 0})

  artistTracks.forEach(callExecuteCommand)
  didSetByArtist[artist] = true
}