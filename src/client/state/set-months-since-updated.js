import {getTagValue, getFieldValue, setField} from '..'

export const setMonthsSinceUpdated = function (song) {

  const {state} = this
  const {getArtistSongs, didUpdateByArtist} = state
  const label = 'Artist Updated'
  const {artist} = song
  const didUpdate = didUpdateByArtist[artist]
  const previousValue = getFieldValue(song, label)
  const dateString = getTagValue(song, label) || null
  const date = new Date(dateString)
  const milliseconds = new Date() - date
  const years = milliseconds / 1000 / 60 / 60 / 24 / 365
  const months = years * 12
  const value = Math.round(months)

  const callExecuteCommand = song => {
    try {
      setField(song, label, value)
    }
    catch {}
  }

  if (didUpdate || value === previousValue) return

  getArtistSongs(artist, state).forEach(callExecuteCommand)
}
