import {app, _getPlaylist} from '.'

const {displayDialog} = app
const tracks = Array.from(_getPlaylist('Library').tracks())
const {length: initialCount} = tracks
const datas = tracks.map(track => ({...track.properties(), track}))

const setYear = ({year, rating, loved, track}) => {
  const validRatings = [0, 20, 40, 60, 80, 100]
  const isValid = validRatings.includes(rating)
  if (!isValid) return ++invalidCount
  const rating_ = loved && rating === 100 ? 6 : rating / 20
  if (year === rating_) return ++untouchedCount
  try {
    track.year.set(rating_)
    ++transferredCount
  }
  catch {
    ++failedCount
  }
}

let invalidCount = 0
let untouchedCount = 0
let transferredCount = 0
let failedCount = 0

datas.forEach(setYear)

displayDialog(
  `${initialCount} initial\n${transferredCount} transferred\n`
  + `${untouchedCount} untouched\n${invalidCount} invalid\n${failedCount} failed`,
)
