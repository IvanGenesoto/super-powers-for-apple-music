module.exports = function removeTag(track, tagKit) {
  const {label, antiLabel} = tagKit
  const labels = antiLabel ? [label, antiLabel] : [label]
  const removeWithThis = remove.bind(tagKit)
  return labels.reduce(removeWithThis, track)
}

function remove(track, label) {
  const {field} = this
  const fieldText = track[field]()
  const beginIndex = fieldText.indexOf(label + ':')
  if (beginIndex === -1) return track
  const delimiterIndex = fieldText.indexOf(', ', beginIndex)
  const endIndex = delimiterIndex === -1 ? fieldText.length : delimiterIndex + 2
  const newFieldText = fieldText.slice(0, beginIndex) + fieldText.slice(endIndex)
  track[field].set(newFieldText)
  return track
}
