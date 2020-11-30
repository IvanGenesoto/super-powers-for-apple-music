/// export const getIsEditable = (song, isParanoid) => { // #mustPassSong
export const getIsEditable = song => { // #mustPassSong

  const {cloudStatus, enabled: isEnabled, track} = song
  const cloudStatuses = ['error', 'no longer available']
  const isUneditable = cloudStatuses.includes(cloudStatus)

  if (isUneditable) return false
  /// if (!isParanoid) return true

  try {
    track.enabled.set(isEnabled)
    return true
  }

  catch {}
}
