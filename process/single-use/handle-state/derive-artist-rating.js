const getIsEditable = require('../../../get/is-editable')
const getFieldValue = require('../../../get/field-value')
const getTagValue = require('../../../get/tag-value')
const removeTag = require('../../multi-use/tag/remove')
const executeCommand = require('../../multi-use/execute-command')

module.exports = function deriveRating(artist) {

  const {state} = this
  const {getArtistTracks, didSetRatingByArtist, didSetStatusByArtist} = state
  const didSetStatus = didSetStatusByArtist[artist]
  const validRatings = [20, 40, 60, 80, 100]
  const immutableStatuses = ['Protected', 'Rejected', 'Retired']
  const trialingStatus = 'Trialing'
  const followingStatus = 'Following'
  const dismissedStatus = 'Dismissed'
  const rejectedStatus = 'Rejected'
  const proxyLabel = 'Proxy'
  const artistTracks = getArtistTracks.call(this, artist)
  const unratedTracks = []
  const editableTracks = []
  const editableDatas = []

  const processTrack = track => {
    const data = track.properties()
    const isEditable = getIsEditable.call({data}) // #note: Could be set to "not paranoid" as an inaccurate value will only count as one "vote".
    const isEnabled = getFieldValue.call({data}, 'Enabled')
    const isDisregarded = getTagValue.call({data}, 'Disregarded')
    const rating = getFieldValue.call({data}, 'Rating')
    rating || unratedTracks.push(track)
    if (!isEditable) return
    editableTracks.push(track)
    editableDatas.push(data)
    removeTag.call({track, data}, proxyLabel)
    editableTrack || (editableTrack = track)
    if (!isEnabled) return
    enabledTrack || (enabledTrack = track)
    trackCount++
    if (!rating) return unratedCount++
    ratedCount++
    rating > highestTrackRating && (highestTrackRating = rating)
    if (isDisregarded) return
    const simplifiedRating = simplify(rating)
    const exponent = simplifiedRating - 1
    const points = 4 ** exponent
    const isHighest = simplifiedRating > highestRegardedTrackRating
    regardedRatedCount++
    pointTotal += points
    isHighest && (highestRegardedTrackRating = simplifiedRating)
    isHighest && (proxyTrack = track)
    simplifiedRating > 1 && (hasGoodTrack = true)
  }

  const simplify = rating =>
      rating === 10 ? 0
    : validRatings.includes(rating) ? rating / 20
    : 1

  // const getPoints = simplifiedRating => {
  //   const points = 4 ** (simplifiedRating - 1)
  //   return points === 1 ? 0.9999999999 : points
  // }

  const getArtistRating = artistPoints => {
    const artistRating = Math.log(artistPoints) / Math.log(3) + 1
    const roundedArtistRating = Math.round(artistRating * 1000) / 1000
    return Math.min(5.999, roundedArtistRating)
  }

  const getArtistStarRating = artistRating => {
    const isDismissed = artistRating <= 1
    if (isDismissed) return ''
    let count = Math.floor(artistRating)
    let stars = ''
    for (; count; count--) stars += '\u2605'
    return stars
  }

  const getStatus = () =>
      !isTrialing && hasGoodTrack && artistRating >= 1 ? followingStatus
    : !isTrialing && artistRating > 1 ? followingStatus
    : !isTrialing ? dismissedStatus
    : hasGoodTrack ? followingStatus
    : regardedRatedCount === 1 ? trialingStatus
    : artistRating < 0.5 ? dismissedStatus // #note: More than one rating is 0-stars.
    : artistRating === 0.5 && regardedRatedCount > 2 ? dismissedStatus // #note: More than one rating is 0-stars.
    : trialingStatus

  // const stringify = artistRating => {
  //   let string = artistRating.toString()
  //   const {length} = string
  //   if (length === 4) return string
  //   if (length === 1) string += '.'
  //   return string + getZeros(4 - string.length)
  // }

  // const getZeros = count => {
  //   let zeros = ''
  //   for (; count; count--) zeros += '0'
  //   return zeros
  // }

  const callCallExecuteCommand = (track, index) => {
    const data = editableDatas[index]
    const callExecuteCommandWithThis = callExecuteCommand.bind({track, data})
    callExecuteCommandWithThis('Artist Rating', artistRating)
    callExecuteCommandWithThis('Artist Star Rating', artistStarRating)
    callExecuteCommandWithThis('Songs', trackCount)
    callExecuteCommandWithThis('Rated Songs', ratedCount)
    callExecuteCommandWithThis('Unrated Songs', unratedCount)
    callExecuteCommandWithThis('Highest Rating', highestTrackRating)
    willChangeStatus && callExecuteCommandWithThis('Artist Status', artistStatus)
  }

  const callExecuteCommand = function (label, value) {
    const {track, data} = this
    executeCommand.call({...this, label, value, data}, track)
  }

  let trackCount = 0
  let ratedCount = 0
  let unratedCount = 0
  let highestTrackRating = 0
  let regardedRatedCount = 0
  let highestRegardedTrackRating = 0
  let pointTotal = 0
  let proxyTrack
  let enabledTrack
  let editableTrack
  let hasGoodTrack

  artistTracks.forEach(processTrack)

  const [hasEditableTrack] = editableTracks

  if (!hasEditableTrack) return

  const isTrialing = regardedRatedCount < 5
  const artistPoints = pointTotal / ratedCount
  const artistRating = getArtistRating(artistPoints)
  const artistStarRating = getArtistStarRating(artistRating)
  const proxyTrack_ = proxyTrack || enabledTrack || editableTrack
  const index = editableTracks.indexOf(proxyTrack_)
  const proxyData = editableDatas[index]
  const currentArtistStatus = getTagValue.call({data: proxyData}, 'Artist Status')
  const isImmutableStatus = immutableStatuses.includes(currentArtistStatus)
  const artistStatus = isImmutableStatus ? currentArtistStatus : getStatus()
  const willChangeStatus = artistStatus !== currentArtistStatus
  const didDismiss = willChangeStatus && artistStatus === dismissedStatus
  const didReject = didSetStatus && artistStatus === rejectedStatus
  const shouldPurgeUnrated = didDismiss || didReject

  editableTracks.forEach(callCallExecuteCommand)
  callExecuteCommand.call({track: proxyTrack_, data: proxyData}, proxyLabel)
  didSetRatingByArtist[artist] = true
  willChangeStatus && (didSetStatusByArtist[artist] = true)
  shouldPurgeUnrated && unratedTracks.forEach(track => track.delete())
}
