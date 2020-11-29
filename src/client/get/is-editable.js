/// export function getIsEditable(track, isParanoid) { // #mustPassData
export function getIsEditable(track) { // #mustPassData

  const {data} = this
  const {cloudStatus, enabled} = data
  const isUneditable = cloudStatus === 'error' || cloudStatus === 'no longer available'

  if (isUneditable) return false
  /// if (!isParanoid) return true

  try {
    track.enabled.set(enabled)
    return true
  }

  catch {
    return false
  }
}
