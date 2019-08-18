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
    const this_ = {data}
    const isEditable = getIsEditable.call(this_) // #note: Could be set to "not paranoid" as an inaccurate value will only count as one "vote".
    const isEnabled = getFieldValue.call(this_, 'Enabled')
    const isDisregarded = getTagValue.call(this_, 'Disregarded')
    const rating = getFieldValue.call(this_, 'Rating')
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
    const rating_ = simplify(rating)
    rating_ > highestTrackRating && (highestTrackRating = rating)
    if (isDisregarded) return
    const exponent = rating_ - 1
    const points = exponent + 1 && 4 ** exponent
    const isHighest = rating_ > highestRegardedTrackRating
    regardedRatedCount++
    pointTotal += points
    isHighest && (highestRegardedTrackRating = rating_)
    isHighest && (proxyTrack = track)
    rating_ > 1 && (hasGoodTrack = true)
  }

  const simplify = rating =>
      rating === 10 ? 0
    : validRatings.includes(rating) ? rating / 20
    : 1

  const getArtistRating = artistPoints => {
    const artistRating = Math.log(artistPoints) / Math.log(3) + 1
    const roundedArtistRating = Math.round(artistRating * 1000) / 1000
    return Math.min(5.999, roundedArtistRating)
  }

  const getArtistStarRating = (artistRating, artistStatus) => {
    let stars = ''
    if (artistStatus === dismissedStatus) return stars
    let count = Math.floor(artistRating)
    for (; count; count--) stars += '\u2605'
    return stars
  }

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

  const getStatus = () =>
      !isTrialing && hasGoodTrack && artistRating >= 1 ? followingStatus
    : !isTrialing && artistRating > 1 ? followingStatus
    : !isTrialing ? dismissedStatus
    : hasGoodTrack ? followingStatus
    : regardedRatedCount === 1 ? trialingStatus
    : artistRating < 0.5 ? dismissedStatus // #note: More than one rating is 0-stars.
    : artistRating === 0.5 && regardedRatedCount > 2 ? dismissedStatus // #note: More than one rating is 0-stars.
    : trialingStatus

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
  let regardedRatedCount = 0
  let unratedCount = 0
  let highestTrackRating = 0
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
  const artistPoints = pointTotal / regardedRatedCount
  const artistRating = getArtistRating(artistPoints)
  const proxyTrack_ = proxyTrack || enabledTrack || editableTrack
  const index = editableTracks.indexOf(proxyTrack_)
  const proxyData = editableDatas[index]
  const currentArtistStatus = getTagValue.call({data: proxyData}, 'Artist Status')
  const isImmutableStatus = immutableStatuses.includes(currentArtistStatus)
  const artistStatus = isImmutableStatus ? currentArtistStatus : getStatus()
  const artistStarRating = getArtistStarRating(artistRating, artistStatus)
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
