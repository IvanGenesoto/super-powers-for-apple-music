import {tagKitByLabel, validate} from '..'

export function initialize(song) {

  const {state} = this
  const {nil, shouldDeriveRatingByArtist, songsToAdoptValuesByArtist} = state
  const genreTagKit = tagKitByLabel['Song Genre']
  const {field: genreField} = genreTagKit
  const vocalsTagKit = tagKitByLabel['Song Vocals']
  const {field: vocalsField} = vocalsTagKit
  const isComprised = vocalsField === genreField
  const regardedTagKit = tagKitByLabel['Regarded']
  const {field: regardedField, fieldValue: regardedFieldValue} = regardedTagKit
  const {genre, rating, composer, artist, track} = song
  const composerText = composer ? `Composer: ${composer}` : ''
  const delimiter = composer ? ', ' : ''
  const songs_ = songsToAdoptValuesByArtist[artist]
  const songs = songsToAdoptValuesByArtist[artist] = songs_ || []

  try {
    track.episodeNumber.set(1)
    track.composer.set(`${composerText}${delimiter}Original Genre: ${genre}`)
    track[genreField].set(nil)
    isComprised || track[vocalsField].set(nil)
    track[regardedField].set(regardedFieldValue)
    rating && (shouldDeriveRatingByArtist[artist] = true)
    songs.push(song)
    validate.call(this, song)
  }

  catch {}
}
