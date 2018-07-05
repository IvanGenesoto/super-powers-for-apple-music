module.exports = function label(label, value, track) {
  try {
    label === 'Disabled' && track.enabled.set(false)
    const grouping = track.grouping()
    const delimiter = grouping ? ', ' : ''
    track.grouping.set(`${grouping}${delimiter}${label}: ${value}`)
  }
  catch (unused) { }
}
