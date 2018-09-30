const removeTag = require('./remove')
const addTag = require('./add')

const setField = (track, [field, value]) => track[field].set(value)

module.exports = function tag(track, tagKit, value) {
  const {fieldEntry, validatedValue} = tagKit
  try {
    fieldEntry && setField(track, fieldEntry)
    track = removeTag(track, tagKit)
    return addTag(track, tagKit, value || validatedValue)
  }
  catch (unused) { }
}
