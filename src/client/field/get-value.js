import {tagKitByLabel} from '..'

export function getFieldValue(song, label) { // #mustPassSong

  const tagKit = tagKitByLabel[label]
  const {field} = tagKit

  return song[field]
}
