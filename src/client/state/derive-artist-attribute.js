import {
  getTagValue,
  getFieldValue,
  getIsEditable,
  executeCommand,
  fieldKitByLabel,
} from '..'

export const deriveArtistAttribute = function (artist) {

  const {state, artistLabel, songLabel} = this
  const {getArtistSongs} = state
  const artistTagKit = fieldKitByLabel[artistLabel]
  const {antiAdoptionStateKey} = artistTagKit
  const didSetByArtist = state[antiAdoptionStateKey]
  const artistSongs = getArtistSongs(artist, state)

  const vote = (voteCountByValue, song) => {
    const {enabled: isEnabled} = song
    const isRegarded = getFieldValue(song, 'Regarded')
    const isEditable = getIsEditable(song) // #note: Does not pass true (i.e. isParanoid) as an inaccurate value will only count as one "vote".
    const value = getTagValue(song, songLabel)
    const voteCount = voteCountByValue[value] || 0
    if (!isEnabled || !isRegarded || !isEditable || !value) return voteCountByValue
    voteCountByValue[value] = voteCount + 1
    return voteCountByValue
  }

  const tally = (winningKit, [value, voteCount]) => {
    const {winningVoteCount} = winningKit
    if (voteCount <= winningVoteCount) return winningKit
    return {winningVoteCount: voteCount, winner: value}
  }

  const callExecuteCommand = song => {
    try {
      executeCommand.call(this, song, artistLabel, value)
    }
    catch {}
  }

  const voteCountByValue = artistSongs.reduce(vote, {})

  const {winner: value} = Object
    .entries(voteCountByValue)
    .reduce(tally, {winningVoteCount: 0})

  artistSongs.forEach(callExecuteCommand)
  didSetByArtist[artist] = true
}
