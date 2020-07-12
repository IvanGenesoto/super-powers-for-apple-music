const display = require('../dialogue/display')
const getPlaylist = require('../get/playlist')
const playlist = getPlaylist('test')

const concatenate = (text, [name, value], index) => {
  const delimiter = index ? '\u000a' : ''
  text += `${delimiter}${name}: ${value}`
  return text
}

const properties = playlist.properties()

const text = Object
  .entries(properties)
  .reduce(concatenate, '')

display(text)
