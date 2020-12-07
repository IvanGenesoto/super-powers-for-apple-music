import {fieldKitEnum, validate, nil} from '..'

export const initialize = function (song) {

  const {state} = this
  const {shouldDeriveRatingByArtist, songsToAdoptValuesByArtist} = state
  const genreTagKit = fieldKitEnum['Song Genre']
  const {field: genreField} = genreTagKit
  const vocalsTagKit = fieldKitEnum['Song Vocals']
  const {field: vocalsField} = vocalsTagKit
  const isComprised = vocalsField === genreField
  const regardedTagKit = fieldKitEnum['Regarded']
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
