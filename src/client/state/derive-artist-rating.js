import {getIsEditable, getFieldValue, removeTag, executeCommand} from '..'

export const deriveArtistRating = function (artist) {

  const {state} = this

  const {
    getArtistSongs,
    didSetRatingByArtist,
    didSetStatusByArtist,
    artistStatusEnum,
  } = state

  const {
    'Trialing': trialing,
    'Following': following,
    'Dismissed': dismissed,
  } = artistStatusEnum

  const validRatings = [20, 40, 60, 80, 100]
  const proxyLabel = 'Proxy'
  const artistSongs = getArtistSongs(artist, state)
  const unratedSongs = []
  const editableSongs = []

  const processSong = song => {
    const {enabled: isEnabled, rating} = song
    const isEditable = getIsEditable(song) // #note: Does not pass true (i.e. isParanoid) as an inaccurate value will only count as one "vote".
    const isRegarded = getFieldValue(song, 'Regarded')
    rating || unratedSongs.push(song)
    if (!isEditable) return
    editableSongs.push(song)
    removeTag(song, proxyLabel)
    editableSong || (editableSong = song)
    if (!isEnabled) return
    enabledSong || (enabledSong = song)
    ++enabledCount
    if (!rating) return ++unratedCount
    ++ratedCount
    const rating_ = simplify(rating)
    rating_ > highestSongRating && (highestSongRating = rating)
    if (!isRegarded) return
    regardedSong || (regardedSong = song)
    ++regardedCount
    const exponent = rating_ - 1
    const points = exponent + 1 && 4 ** exponent
    const isHighest = rating_ > highestRegardedSongRating
    ++regardedRatedCount
    pointTotal += points
    isHighest && (highestRegardedSongRating = rating_)
    isHighest && (proxySong = song)
    rating_ > 1 && (hasGoodSong = true)
  }

  const simplify = rating =>
      rating === 10 ? 0
    : validRatings.includes(rating) ? rating / 20
    : 0

  /// const simplify = (rating, isLoved, isDisliked) =>
  ///     isDisliked && rating === 20 ? 0
  ///   : isLoved && rating === 100 ? 6
  ///   : validRatings.includes(rating) ? rating / 20
  ///   : 0

  const getArtistRating = artistPointTotal => {
    const artistRating = Math.log(artistPointTotal) / Math.log(3) + 1
    const integerArtistRating = Math.round(artistRating * 1000)
    /// const roundedArtistRating = Math.round(artistRating * 1000) / 1000
    return Math.min(5999, integerArtistRating)
  }

  /// const stringify = artistRating => {
  ///   let string = artistRating.toString()
  ///   const {length} = string
  ///   if (length === 5) return string
  ///   if (length === 1) string += '.'
  ///   return string + getZeros(5 - string.length)
  /// }

  /// const getZeros = count => {
  ///   let zeros = ''
  ///   for (; count; count--) zeros += '0'
  ///   return zeros
  /// }

  const deriveArtistStatus = () =>
      !isTrialing && artistRating > 1 ? following
    : !isTrialing && artistRating === 1 && hasGoodSong ? following
    : !isTrialing ? dismissed
    : hasGoodSong ? following
    : regardedRatedCount === 1 ? trialing
    : artistRating < 0.5 ? dismissed // #note: More than one rating is 0-stars.
    : artistRating === 0.5 && regardedRatedCount > 2 ? dismissed // #note: More than one rating is 0-stars.
    : trialing

  /// const getArtistStarRating = (artistRating, artistStatus) => {
  ///   const {isBad} = artistStatus
  ///   const isFavorite = artistRating >= 6
  ///   let stars = ''
  ///   if (isBad) return stars
  ///   let count = isFavorite ? 5 : Math.floor(artistRating)
  ///   for (; count; count--) stars += '\u2605'
  ///   isFavorite && (stars += ' \u2661')
  ///   return stars
  /// }

  const getArtistStarRating = (artistRating, artistStatus) => {
    const {isBad} = artistStatus
    let stars = ''
    if (isBad) return stars
    let count = Math.floor(artistRating)
    while (count) (stars += '\u2605') && --count
    return stars
  }

  const callExecuteCommand_ = song => {
    callExecuteCommand(song, 'Artist Rating', artistRating)
    callExecuteCommand(song, 'Artist Star Rating', artistStarRating)
    callExecuteCommand(song, 'Enabled Songs', enabledCount)
    callExecuteCommand(song, 'Regarded Songs', regardedCount)
    callExecuteCommand(song, 'Rated Songs', ratedCount)
    callExecuteCommand(song, 'Unrated Songs', unratedCount)
    callExecuteCommand(song, 'Highest Rating', highestSongRating)
    willChangeStatus && callExecuteCommand('Artist Status', artistStatus)
  }

  const callExecuteCommand = (song, label, value) => {
    try {
      executeCommand.call(this, song, label, value)
    }
    catch {}
  }

  let enabledCount = 0
  let regardedCount = 0
  let ratedCount = 0
  let regardedRatedCount = 0
  let unratedCount = 0
  let highestSongRating = 0
  let highestRegardedSongRating = 0
  let pointTotal = 0
  let proxySong
  let editableSong
  let enabledSong
  let regardedSong
  let hasGoodSong

  artistSongs.forEach(processSong)

  const [hasEditableSong] = editableSongs

  if (!hasEditableSong) return

  const isTrialing = regardedRatedCount < 5
  const artistPointTotal = pointTotal / regardedRatedCount
  const artistRating = getArtistRating(artistPointTotal)
  /// const artistRatingString = stringify(artistRating)
  const proxySong_ = proxySong || regardedSong || enabledSong || editableSong
  const previousArtistStatusKey = getFieldValue(proxySong, 'Artist Status')
  const isValid = Object.keys(artistStatusEnum).includes(previousArtistStatusKey)
  const previousArtistStatus = isValid && artistStatusEnum[previousArtistStatusKey]
  const {isImmutable} = previousArtistStatus
  const artistStatus = isImmutable ? previousArtistStatus : deriveArtistStatus()
  const artistStarRating = getArtistStarRating(artistRating, artistStatus)
  const willChangeStatus = artistStatus !== previousArtistStatus
  const {isBad} = artistStatus

  editableSongs.forEach(callExecuteCommand_)
  callExecuteCommand.call(proxySong_, proxyLabel)
  didSetRatingByArtist[artist] = true
  willChangeStatus && (didSetStatusByArtist[artist] = true)
  isBad && unratedSongs.forEach(({track}) => track.delete())
}
