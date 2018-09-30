module.exports = function addTag(track, {field, label}, value) {
  const existingText = track[field]()
  const delimiter = existingText ? ', ' : ''
  const newFieldText = `${existingText}${delimiter}${label}: ${value}`
  track[field].set(newFieldText)
  return track
}
