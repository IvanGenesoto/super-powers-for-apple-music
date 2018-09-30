const allTagKits = require('../../tag-kits')
const tag = require('../multi-use/tag')

module.exports = function validate(track) {
  const name = track.name().toLowerCase()
  const tagKits = allTagKits.filter(({validators}) => validators.find(
    validator => name.includes(validator)
  ))
  tagKits.forEach(tagKit => tag(track, tagKit))
}
