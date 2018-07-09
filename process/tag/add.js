module.exports = function addTag(track, {field, label}, value) {
  const fieldText = track[field]()
  const delimiter = fieldText ? ', ' : ''
  const newFieldText = `${fieldText}${delimiter}${label}: ${value}`
  track[field].set(newFieldText)
  return track
}
