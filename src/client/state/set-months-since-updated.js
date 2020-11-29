import {getTagValue, getFieldValue, setField} from '..'

export function setMonthsSinceUpdated(track) {

  const {state} = this
  const {getArtistTracks, didUpdateByArtist} = state
  const label = 'Artist Updated'
  const data = track.properties()
  const {artist} = data
  const didUpdate = didUpdateByArtist[artist]
  const previousValue = getFieldValue.call({data}, label)
  const dateString = getTagValue.call({data}, label) || null
  const date = new Date(dateString)
  const milliseconds = new Date() - date
  const years = milliseconds / 1000 / 60 / 60 / 24 / 365
  const months = years * 12
  const value = Math.round(months)

  const callExecuteCommand = track => {
    const data = track.properties()
    const this_ = {track, data}
    try {
      setField.call(this_, label, value)
    }
    catch { }
  }

  if (didUpdate || value === previousValue) return

  getArtistTracks(artist).forEach(callExecuteCommand)
}
