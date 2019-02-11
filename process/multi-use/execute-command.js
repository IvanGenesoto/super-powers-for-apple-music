const executeEffect = require('./execute-effect')

module.exports = function executeCommand(track) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {state, data, commandKit} = this
  const {getArtistTracks} = state
  const {artist} = data
  const {isArtistCommand, effects, valueByArtist, value = true} = commandKit
  const execute = track => effects.forEach(executeEffect, {...this, track})

  valueByArtist && (valueByArtist[artist] = value)
  isArtistCommand && getArtistTracks(artist).forEach(execute)
  isArtistCommand || execute(track)
}
