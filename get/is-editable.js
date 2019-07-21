module.exports = function getIsEditable() { // #mustHaveData: true

  const {data, track} = this
  const {cloudStatus, enabled} = data
  const isUneditable = cloudStatus === 'error' || cloudStatus === 'no longer available'

  if (isUneditable) return false
  // if (!isParanoid) return true

  try {
    track.enabled.set(enabled)
    return true
  }

  catch (unused) { return false }
}
