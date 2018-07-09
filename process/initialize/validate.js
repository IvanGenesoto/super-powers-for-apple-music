const tagKits = require('../../tag-kits')
const tag = require('../tag')

module.exports = function validate(track) {
  const name = track.name().toLowerCase()
  const tagKit = tagKits.find(({validators}) => {
    return validators.find(validator => name.includes(validator))
  })
  return tagKit ? tag(track, tagKit) : track
}
